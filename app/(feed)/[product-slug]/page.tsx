import { CookieTokens } from "@/app/@auth/contants";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import DetailImageGallerySuspense from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { ProductCarousel } from "@/components/Product/DetailImageGallery/NewDesign";
import { IPlace } from "@/components/QuarterSelector/types";
import ProductSetter from "@/contexts/ProductContext/ProductSetter";
import JsonLd from "@/lib/JsonLd";
import { getImageUrlFromPath } from "@/lib/utils";
import { typesenseClient } from "@/typesense/client";
import { ITypesenseProduct } from "@/typesense/typesense.type";
import { parseJson } from "@/utils/format";
import { getDiscountRate } from "@/utils/price";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";
import { Product, WithContext } from "schema-dts";
import { getProductRatings } from "../actions";
import ActionPageLoading from "../components/Detail/ActionPageLoading";
import InformationLoadingPage from "../components/Detail/InformationLoadingPage";
import PaymentMethods from "../components/Detail/PaymentMethods";
import ProductActions from "../components/Detail/ProductActions";
import ProductComments from "../components/Detail/ProductComments";
import ProductCommentsLoadingPage from "../components/Detail/ProductCommentsLoadingPage";
import ProductDescription from "../components/Detail/ProductDescription";
import ProductDescriptionLoadingPage from "../components/Detail/ProductDescriptionLoadingPage";
import ProductInformation from "../components/Detail/ProductInformation";
import SimilarProducts from "../components/Detail/SimilarProducts";
import SimilarProductsLoadingPage from "../components/Detail/SimilarProductsLoadingPage";

// Set revalidation time for ISR (in seconds)
export const revalidate = 300; // Revalidate 5 minutes

export const dynamic = "auto";

// Define the page props interface
interface ProductPageProps {
  params: Promise<{ "product-slug": string }>;
  searchParams: Promise<{ pid: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const allProducts = [];
    let page = 0;
    const perPage = 100; // Typesense'in izin verdiği maksimum sayfa boyutu

    while (true) {
      const response = await typesenseClient
        .collections("products")
        .documents()
        .search({
          q: "*",
          per_page: perPage,
          page: page,
        });

      if (!response.hits || response.hits.length === 0) {
        break;
      }

      const products = response.hits.map((product) => {
        const doc = product.document as ITypesenseProduct;
        return {
          "product-slug": doc.slug || doc.id.toString(),
        };
      });

      allProducts.push(...products);

      // Eğer daha fazla sayfa yoksa döngüyü sonlandır
      if (response.hits.length < perPage) {
        break;
      }

      page++;
    }

    console.log(`Generated static params for ${allProducts.length} products`);
    return allProducts;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for the product page
export async function generateMetadata({
  params,
  searchParams,
}: ProductPageProps) {
  const { pid } = await searchParams;
  const id = Number(pid);

  if (!id) {
    return {
      title: "Product Not Found",
    };
  }

  try {
    const productData = (await typesenseClient
      .collections("products")
      .documents(id.toString())
      .retrieve()) as ITypesenseProduct;

    return {
      title: productData.name || "Product Details",
      description: productData.description || "View product details",
      openGraph: {
        images: [getImageUrlFromPath(productData.image_url?.[0] || "")],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
    };
  }
}

const ProductImageCarouselPage: FC<ProductPageProps> = async ({
  searchParams,
}) => {
  const { pid } = await searchParams;
  const id = Number(pid);

  if (!id) {
    console.error("Product ID not found");
    return null;
  }

  try {
    const product = (await typesenseClient
      .collections("products")
      .documents(id.toString())
      .retrieve()) as ITypesenseProduct;

    if (!product) {
      notFound();
    }

    const ratings = await getProductRatings({ pid: product.id });

    const productData: WithContext<Product> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: getImageUrlFromPath(product.image_url[0]),
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
      },
    };

    const isFavorite = product?.user_favorites?.some(
      (fav) => fav.product_id === product.id,
    );
    const favoriteCount = product.user_favorites_aggregate?.aggregate.count;

    const handleCookie = async () => {
      const { get } = await cookies();
      try {
        const locationCookie = get(CookieTokens.LOCATION_ID)?.value
          ? parseJson(get(CookieTokens.LOCATION_ID)?.value)
          : null;
        return locationCookie;
      } catch (error) {
        console.error("Error while parsing location cookie", error);
        return null;
      }
    };
    const selectedLocation = (await handleCookie()) as IPlace;
    const places = parseJson(product.places);

    return (
      <>
        <ProductSetter initialData={product} />
        <Breadcrumb />
        <section
          className="flex items-start justify-start gap-6 flex-nowrap max-md:flex-col max-sm:gap-2"
          id="detail"
          aria-labelledby="detail"
          aria-describedby="Ürün detayları"
        >
          <div className="z-0 w-1/2 max-md:w-full">
            <Suspense fallback={<DetailImageGallerySuspense />}>
              <ProductCarousel images={product.image_url} />
            </Suspense>
          </div>
          <div className="z-0 w-1/2 max-md:w-full">
            <Suspense fallback={<InformationLoadingPage />}>
              <ProductInformation
                productId={product.id}
                name={product.name}
                price={product.price}
                rateCounts={
                  (ratings?.reduce((acc, curr) => {
                    acc[curr.score] = curr.comment_count;
                    return acc;
                  }, {}) as Record<number, number>) ?? {}
                }
                rating={product.score ?? 0}
                reviewCount={product.review_count}
                discountPrice={product.discount_price}
                discountRate={getDiscountRate(
                  product.price,
                  product.discount_price,
                )}
                key={product.id}
                vendor={product.tenant.tenants?.[0]}
                freeShipping={product.is_service_free}
                shippingType={product.delivery_type}
                deliveryTimeRanges={product.delivery_time_ranges}
                isCustomizable={product.product_customizable_areas?.length > 0}
                lastOrderTime={product.last_order_time}
                variants={product?.variants || []}
              />
            </Suspense>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(productData),
              }}
            />
            <Suspense fallback={<ActionPageLoading />}>
              <ProductActions
                productId={product.id}
                isFavorite={isFavorite}
                favoriteCount={favoriteCount}
                selectedLocation={selectedLocation}
                places={places}
                delivery_type={product.delivery_type}
                delivery_time_ranges={product.delivery_time_ranges}
              />
            </Suspense>
          </div>
        </section>
        <section
          className="mt-6 max-md:mt-2"
          aria-labelledby="product-detail"
          aria-describedby="Ürün Detayları"
          id="product-detail"
        >
          <Suspense fallback={<ProductDescriptionLoadingPage />}>
            <ProductDescription
              description={product.description}
              notes={[]}
              specifications={parseJson(product.properties)}
            />
          </Suspense>
        </section>
        <section
          className="mt-6"
          id="payment-methods"
          aria-labelledby="payment-methods"
          aria-describedby="Ödeme yöntemleri"
        >
          <PaymentMethods />
        </section>
        <section
          className="mt-6"
          id="yorumlar"
          aria-labelledby="yorumlar"
          aria-describedby="Kullanıcı Yorumları"
        >
          <Suspense fallback={<ProductCommentsLoadingPage />}>
            <ProductComments
              comments={product.reviews?.map((rw, index) => ({
                comment: rw.comment,
                createdAt: rw.created_at,
                firstName: rw.user.firstname.slice(0, 1) + "***",
                lastName: rw.user.lastname.slice(0, 1) + "***",
                user_id: 0,
                rate: rw.score,
                user_image_url:
                  rw.user.picture || "https://via.placeholder.com/150",
                comment_id: rw.id,
              }))}
            />
          </Suspense>
        </section>
        <section
          className="mt-6"
          id="benzer-urunler"
          aria-labelledby="benzer-urunler"
          aria-describedby="Benzer Ürünler"
        >
          <Suspense fallback={<SimilarProductsLoadingPage />}>
            <SimilarProducts productId={product.id} />
          </Suspense>
        </section>
        <JsonLd data={productData} />
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
};

export default ProductImageCarouselPage;
