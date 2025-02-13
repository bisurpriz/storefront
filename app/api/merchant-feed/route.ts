import { IPlace } from "@/common/types/Product/product";
import { IMAGE_URL } from "@/contants/urls";
import { TypesenseSearchResponse } from "@/types/product";
import { typesenseClient } from "@/typesense/client";
import { createTypesenseQueryMapper } from "@/utils/createTypesenseQueryMapper";
import { NextResponse } from "next/server";

const sanitizeXMLContent = (text: string) => {
  if (!text) return "";

  // Önce HTML etiketlerini ve HTML entityleri temizle
  const withoutHtml = text
    .replace(/<[^>]*>/g, "") // HTML etiketlerini temizle
    .replace(/&nbsp;/g, " ") // &nbsp; karakterini boşluk ile değiştir
    .replace(/&amp;nbsp;/g, " ") // Önceden escape edilmiş &nbsp; karakterini temizle
    .replace(/&#160;/g, " ") // Numeric equivalent of &nbsp;
    .replace(/&[a-zA-Z]{1,10};/g, " "); // Diğer HTML entityleri temizle

  // Sonra XML özel karakterlerini escape et
  return withoutHtml
    .replace(/&/g, "&amp;") // Tüm & karakterlerini escape et
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\s+/g, " ") // Birden fazla boşluğu tek boşluğa indir
    .trim();
};

export function getImageUrlFromPath(
  path?: string,
  width?: number,
  quality?: number,
): string {
  if (!path) return `https://via.placeholder.com/300`;
  if (path.startsWith("http") || path.startsWith("https")) return path;

  const imageUrl = `${IMAGE_URL}/${path}`;

  return `${imageUrl}`;
}

interface ProductFeedItem {
  "g:id": string;
  "g:title": string;
  "g:description": string;
  "g:link": string;
  "g:image_link": string;
  "g:additional_image_link"?: string;
  "g:condition": string;
  "g:availability": string;
  "g:price": string;
  "g:sale_price"?: string;
  "g:brand": string;
  "g:google_product_category": string;
  "g:product_type"?: string;
  "g:identifier_exists": string;
  "g:mpn": string;
  "g:shipping_country": string;
  "g:shipping_service": string;
  "g:shipping_price": string;
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_HOST || "https://bonnmarse.com";

    const filterBy = await createTypesenseQueryMapper({}, {} as IPlace);

    // First get total number of products
    const initialSearch = (await typesenseClient
      .collections("products")
      .documents()
      .search({
        q: "*",
        per_page: 0,
        filter_by: filterBy.filter_by,
      })) as TypesenseSearchResponse & { out_of: number };

    const totalProducts = initialSearch.out_of;
    const PAGE_SIZE = 250;
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    let allProducts: ProductFeedItem[] = [];

    // Fetch products page by page
    for (let page = 1; page <= totalPages; page++) {
      const searchParameters = {
        q: "*",
        per_page: PAGE_SIZE,
        page,
      };

      const productsResponse = (await typesenseClient
        .collections("products")
        .documents()
        .search(searchParameters)) as TypesenseSearchResponse;

      if (!productsResponse.hits?.length) {
        break;
      }

      const products = productsResponse.hits.map((hit) => {
        const product = hit.document;
        const productPrice = `${product.price?.toFixed(2) || "0.00"} TRY`;
        const discountPrice = product.price
          ? `${product.price.toFixed(2)} TRY`
          : undefined;

        // Get main image URL
        const mainImageUrl = product.image_url?.[0]
          ? getImageUrlFromPath(product.image_url[0])
          : "";

        // Get additional images if available (max 10 additional images)
        const additionalImages =
          product.image_url && product.image_url.length > 1
            ? product.image_url
                .slice(1, 10)
                .map((img) => getImageUrlFromPath(img))
                .filter((url) => url !== "")
                .join(",")
            : undefined;

        // Determine availability based on stock
        const availability =
          !product.stock_track || (product.stock && product.stock > 0)
            ? "in_stock"
            : "out_of_stock";

        // Get product categories
        const categories = product.product_categories
          ?.map((pc) => pc.category?.name)
          .filter(Boolean)
          .join(" > ");

        // Validate and create product data
        const productData: ProductFeedItem = {
          "g:id": sanitizeXMLContent(product.id.toString()),
          "g:title": sanitizeXMLContent(product.name),
          "g:description": sanitizeXMLContent(product.description || ""),
          "g:link": sanitizeXMLContent(
            `${baseUrl}/${product.slug}?pid=${product.id}`,
          ),
          "g:image_link": sanitizeXMLContent(mainImageUrl),
          "g:condition": "yeni",
          "g:availability": availability,
          "g:price": productPrice,
          "g:brand": sanitizeXMLContent(
            product.tenant?.tenants?.[0]?.name || "Bonnmarse",
          ),
          "g:google_product_category": "984",
          "g:identifier_exists": "FALSE",
          "g:mpn": sanitizeXMLContent(
            product.product_no || product.id.toString(),
          ),
          "g:shipping_country": "TR",
          "g:shipping_service": "Standart",
          "g:shipping_price": "0.00 TRY",
        };

        // Add optional fields only if they exist
        if (additionalImages) {
          productData["g:additional_image_link"] =
            sanitizeXMLContent(additionalImages);
        }
        if (discountPrice) {
          productData["g:sale_price"] = discountPrice;
        }
        if (categories) {
          productData["g:product_type"] = sanitizeXMLContent(categories);
        }

        return productData;
      });

      allProducts = [...allProducts, ...products];
    }

    // Generate XML feed exactly matching Google's format
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>${sanitizeXMLContent("Bonnmarse")}</title>
<link>${sanitizeXMLContent(baseUrl)}</link>
<description>${sanitizeXMLContent("Bonnmarse ürün listesi")}</description>
${allProducts
  .map((product) => {
    const elements = Object.entries(product)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        // Skip shipping elements as they'll be handled separately
        if (
          key === "g:shipping_country" ||
          key === "g:shipping_service" ||
          key === "g:shipping_price"
        ) {
          return null;
        }
        // Ensure the value is sanitized
        const sanitizedValue = sanitizeXMLContent(value.toString());
        return `<${key}>${sanitizedValue}</${key}>`;
      })
      .filter(Boolean)
      .join("\n");

    // Create shipping section with sanitized values
    const shipping = `<g:shipping>
<g:country>${sanitizeXMLContent(product["g:shipping_country"])}</g:country>
<g:service>${sanitizeXMLContent(product["g:shipping_service"])}</g:service>
<g:price>${sanitizeXMLContent(product["g:shipping_price"])}</g:price>
</g:shipping>`;

    return `<item>
${elements}
${shipping}
</item>`;
  })
  .join("\n")}
</channel>
</rss>`;

    return new NextResponse(xmlContent, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating merchant feed:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
