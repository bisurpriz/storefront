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

const fetchProductsById = async (
  productIds: string[],
): Promise<ITypesenseProduct[]> => {
  if (!productIds.length) return [];

  try {
    const productsResponse = (await typesenseClient.multiSearch.perform({
      searches: productIds.map((id) => ({
        collection: "products",
        q: "*",
        filter_by: `id:=${id}`,
        query_by: "name",
      })),
    })) as MultiSearchResponse;

    // Extract products from the response
    return productsResponse.results
      .map((result) => result.hits?.[0]?.document)
      .filter(Boolean) as ITypesenseProduct[];
  } catch (error) {
    console.error("Error fetching products by ID:", error);
    return [];
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

    if (!similarProducts.ids || similarProducts.ids.length === 0) {
      return null;
    }

    const products = await fetchProductsById(similarProducts.ids);

    if (products.length === 0) {
      return null;
    }

    return (
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Benzer Ürünler</h2>
        <div className="relative w-full">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {products.map((product) => (
              <Link
                href={getProductDetailUrl(product.slug, product.id)}
                key={product.id}
                className="group w-[160px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md md:w-[200px]"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={getImageUrlFromPath(product.image_url[0])}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 200px"
                    priority={false}
                  />
                </div>
                <div className="p-3">
                  <h3 className="group-hover:text-primary-600 line-clamp-2 text-sm font-medium transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary-600 mt-2 text-sm font-semibold">
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
