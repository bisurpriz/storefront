import { TypesenseSearchResponse } from "@/types/product";
import { typesenseClient } from "@/typesense/client";
import { NextResponse } from "next/server";

const sanitizeXMLContent = (text: string) => {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .trim();
};

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

    // First get total number of products
    const initialSearch = (await typesenseClient
      .collections("products")
      .documents()
      .search({
        q: "*",
        per_page: 0, // We only need the total count
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
        const discountPrice = product.discount_price
          ? `${product.discount_price.toFixed(2)} TRY`
          : undefined;

        // Get additional images if available
        const additionalImages =
          product.image_url && product.image_url.length > 1
            ? product.image_url
                .slice(1, 10)
                .map((img) => `${baseUrl}${img}`)
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

        return {
          "g:id": sanitizeXMLContent(product.id.toString()),
          "g:title": sanitizeXMLContent(product.name),
          "g:description": sanitizeXMLContent(product.description || ""),
          "g:link": sanitizeXMLContent(
            `${baseUrl}/${product.slug}?pid=${product.id}`,
          ),
          "g:image_link": sanitizeXMLContent(
            product.image_url?.[0] ? `${baseUrl}${product.image_url[0]}` : "",
          ),
          ...(additionalImages && {
            "g:additional_image_link": sanitizeXMLContent(additionalImages),
          }),
          "g:condition": "new",
          "g:availability": availability,
          "g:price": productPrice,
          ...(discountPrice && {
            "g:sale_price": discountPrice,
          }),
          "g:brand": sanitizeXMLContent(
            product.tenant?.tenants?.[0]?.name || "Bonnmarse",
          ),
          "g:google_product_category": "Food, Beverages & Tobacco > Food Items",
          ...(categories && {
            "g:product_type": sanitizeXMLContent(categories),
          }),
          "g:identifier_exists": "FALSE",
          "g:mpn": sanitizeXMLContent(
            product.product_no || product.id.toString(),
          ),
          "g:shipping_country": "TR",
          "g:shipping_service": "Standart",
          "g:shipping_price": "0.00 TRY",
        };
      });

      allProducts = [...allProducts, ...products];
    }

    // Generate XML feed exactly matching Google's format
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE rss [
<!ELEMENT rss (channel)>
<!ATTLIST rss version CDATA #REQUIRED>
<!ATTLIST rss xmlns:g CDATA #REQUIRED>
<!ELEMENT channel (title, link, description, item*)>
<!ELEMENT item (g:id, g:title, g:description, g:link, g:image_link, g:condition, g:availability, g:price, g:brand, g:google_product_category, g:shipping)>
]>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Bonnmarse</title>
<link>${sanitizeXMLContent(baseUrl)}</link>
<description>Bonnmarse ürün listesi</description>
${allProducts
  .map((product) => {
    const elements = Object.entries(product)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (
          key === "g:shipping_country" ||
          key === "g:shipping_service" ||
          key === "g:shipping_price"
        ) {
          return null; // These will be handled separately
        }
        return `<${key}>${value}</${key}>`;
      })
      .filter(Boolean)
      .join("\n");

    return `<item>
${elements}
<g:shipping>
<g:country>${product["g:shipping_country"]}</g:country>
<g:service>${product["g:shipping_service"]}</g:service>
<g:price>${product["g:shipping_price"]}</g:price>
</g:shipping>
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
