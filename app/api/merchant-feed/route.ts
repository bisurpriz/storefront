import { TypesenseSearchResponse } from "@/types/product";
import { typesenseClient } from "@/typesense/client";
import { NextResponse } from "next/server";

const sanitizeHtml = (html: string) => {
  return html.replace(/<[^>]*>?/g, "");
};

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "https://bonnmarse.com";

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
    let allProducts: Array<Record<string, string>> = [];

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
        return {
          "g:id": product.id,
          "g:title": product.name,
          "g:description": sanitizeHtml(product.description),
          "g:link": `${baseUrl}/${product.slug}?pid=${product.id}`,
          "g:image_link": product.image_url?.[0]
            ? `${baseUrl}${product.image_url[0]}`
            : "",
          "g:price": `${product.price} TRY`,
          "g:availability": "in stock",
          "g:condition": "new",
          "g:brand": product.brand || "Bonnmarse",
          "g:google_product_category": "Food, Beverages & Tobacco > Food Items",
        };
      });

      allProducts = [...allProducts, ...products];
    }

    // Generate XML feed
    const xmlContent = `<?xml version="1.0"?>
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
      <channel>
        <title>Bonnmarse Product Feed</title>
        <link>${baseUrl}</link>
        <description>Bonnmarse ürünleri</description>
        ${allProducts
          .map(
            (product) => `
          <item>
            ${Object.entries(product)
              .map(([key, value]) => `<${key}>${value}</${key}>`)
              .join("\n            ")}
          </item>
        `,
          )
          .join("\n")}
      </channel>
    </rss>`;

    return new NextResponse(xmlContent, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating merchant feed:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour
