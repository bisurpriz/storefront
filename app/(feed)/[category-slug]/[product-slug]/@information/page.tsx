import ProductInformation from "../../components/Detail/ProductInformation";
import { getProductInformation } from "./actions";
import { FC } from "react";
import { getProductRatings } from "@/app/(feed)/actions";
import InformationLoadingPage from "./loading";
import { getDiscountRate } from "@/utils/price";
import { Product, WithContext } from "schema-dts";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { goToProductDetail } from "@/utils/linkClickEvent";
import { parseJson } from "@/utils/format";
import { PageProps } from "@/.next/types/app/page";

const ProductInformationPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const productId = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await getProductInformation(productId);

  if (!product) {
    return <InformationLoadingPage />;
  }

  const ratings = await getProductRatings({ pid: productId });

  const productData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description.replace(/<[^>]*>/g, ""),
    sku: product.id.toString(),
    brand: {
      "@type": "Brand",
      name: product.tenant.tenants[0].name,
    },
    image: product.image_url.map((url) => getImageUrlFromPath(url)),
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: product.discount_price || product.price,
      availability:
        product.delivery_type === "SAME_DAY"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${goToProductDetail({
        category: product.product_categories[0].category as any,
        slug: product.slug,
        id: product.id,
      })}`,
      priceValidUntil: product.last_order_time,
      seller: {
        "@type": "Organization",
        name: product.tenant.tenants[0].name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.reviews_aggregate.aggregate.avg.score,
      reviewCount: product.reviews_aggregate.aggregate.count,
    },
    additionalProperty: parseJson(product?.properties)?.map(
      (prop: { name: string; value: string }) => ({
        "@type": "PropertyValue",
        name: prop.name,
        value: prop.value,
      })
    ),
  };

  return (
    <>
      <ProductInformation
        name={product.name}
        price={product.price}
        rateCounts={
          (ratings?.reduce((acc, curr) => {
            acc[curr.score] = curr.comment_count;
            return acc;
          }, {}) as any) ?? {}
        }
        rating={product.score ?? 0}
        reviewCount={product.reviews_aggregate.aggregate.count}
        discountPrice={product.discount_price}
        discountRate={getDiscountRate(product.price, product.discount_price)}
        key={product.id}
        vendor={product.tenant.tenants?.[0]}
        freeShipping={product.is_service_free}
        shippingType={product.delivery_type}
        deliveryTimeRanges={product.delivery_time_ranges}
        isCustomizable={product.product_customizable_areas?.length > 0}
        lastOrderTime={product.last_order_time}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
    </>
  );
};

export default ProductInformationPage;
