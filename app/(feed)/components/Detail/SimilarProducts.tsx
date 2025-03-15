import { CookieTokens } from "@/app/@auth/contants";
import { AI_API_URL } from "@/app/constants";
import { getImageUrlFromPath, getProductDetailUrl } from "@/lib/utils";
import { typesenseClient } from "@/typesense/client";
import { ITypesenseProduct } from "@/typesense/typesense.type";
import { parseJson } from "@/utils/format";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

// Define types for Typesense response
interface TypesenseHit {
  document: ITypesenseProduct;
}

interface TypesenseSearchResult {
  hits?: TypesenseHit[];
}

interface MultiSearchResponse {
  results: TypesenseSearchResult[];
}

interface SimilarProductsResponse {
  ids: string[];
}
const getSimilarProducts = async (
  productId: string,
  place_id: string,
): Promise<SimilarProductsResponse> => {
  try {
    const response = await fetch(
      `${AI_API_URL}/similar_products?product_id=${productId}&place_id=${place_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    console.log(JSON.stringify(response, null, 2), "response");
    if (!response.ok) {
      console.error(`Error fetching similar products: ${response.status}`);
      return { ids: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getSimilarProducts:", error);
    return { ids: [] };
  }
};

const SimilarProducts = async ({ productId }: { productId: number }) => {
  try {
    const awaitedCookie = await cookies();

    const location = parseJson(
      awaitedCookie.get(CookieTokens.LOCATION_ID)?.value,
    );

    if (!location || !location.placeId) {
      return null;
    }

    const similarProducts = await getSimilarProducts(
      productId.toString(),
      location.placeId,
    );
    console.log(similarProducts.ids, "similarProducts");
    if (!similarProducts.ids || similarProducts.ids.length === 0) {
      return null;
    }

    const productsResponse = (await typesenseClient.multiSearch.perform({
      searches: similarProducts.ids.map((id) => ({
        collection: "products",
        q: "*",
        filter_by: `id:=${id}`,
        query_by: "name",
      })),
    })) as MultiSearchResponse;

    console.log(productsResponse.results);
    // Extract products from the response
    const products = productsResponse.results
      .map((result) => result.hits?.[0]?.document)
      .filter(Boolean);
    if (products.length === 0) {
      return null;
    }

    return (
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Benzer Ürünler</h2>
        <div className="relative w-full">
          <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {products.map((product) => (
              <Link
                href={getProductDetailUrl(product.slug, product.id)}
                key={product.id}
                className="group w-[160px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md md:w-[200px]"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={getImageUrlFromPath(product.image_url[0])}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium transition-colors group-hover:text-primary-600 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-primary-600">
                    {product.price} TL
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in SimilarProducts component:", error);
    return null;
  }
};

export default SimilarProducts;
