import ProductInformation from "../../components/Detail/ProductInformation";
import { getDiscountRate } from "@/components/PriceTag";
import { getProductInformation } from "./actions";
import { FC } from "react";
import { createJSONLd } from "@/utils/createJSONLd";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Script from "next/script";
import { getProductRatings } from "@/app/(feed)/actions";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductInformationPage: FC<Props> = async ({ searchParams }) => {
  const productId = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await getProductInformation(productId);

  const ratings = await getProductRatings({ pid: productId });

  const jsonLdString = createJSONLd({
    context: "https://schema.org",
    type: "Product",
    data: {
      name: product.name,
      image: product.image_url
        .map((url) => getImageUrlFromPath(url))
        .filter(Boolean),
      description: product.description,
      sku: product.id,
      brand: product.tenant.tenants?.[0].name,
      offers: {
        shippingDetails: {
          type: "OfferShippingDetails",
          shippingDestination: {
            type: "DefinedRegion",
            addressCountry: "TR",
          },
          shippingRate: {
            type: "MonetaryAmount",
            currency: "TRY",
            value: 0,
          },
        },
        type: "Offer",
        price: product.price,
        priceCurrency: "TRY",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          type: "Organization",
          name: product.tenant.tenants?.[0].name,
        },
      },
      aggregateRating: {
        type: "AggregateRating",
        reviewCount: `${product.reviews_aggregate.aggregate.count}`,
        ratingValue: `${product.reviews_aggregate.aggregate.avg.score}`,
      },
    },
  });

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
        promotion="Kargo Bedava"
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
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
    </>
  );
};

export default ProductInformationPage;
