import ProductInformation from "../../components/Detail/ProductInformation";
import { getDiscountRate } from "@/components/PriceTag";
import { getProductInformation } from "./actions";
import { FC } from "react";
import { createJSONLd } from "@/utils/createJSONLd";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Script from "next/script";
import { DeliveryType } from "@/common/enums/Product/product";

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
        reviewCount: product.reviews_aggregate.aggregate.count,
        ratingValue: product.reviews_aggregate.aggregate.avg.score ?? 5,
      },
    },
  });

  return (
    <>
      <ProductInformation
        name={product.name}
        price={product.price}
        rateCounts={{
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
        }}
        rating={product.reviews_aggregate.aggregate.count}
        reviewCount={product.reviews_aggregate.aggregate.count}
        promotion="Kargo Bedava"
        discountPrice={product.discount_price}
        discountRate={getDiscountRate(product.price, product.discount_price)}
        key={product.id}
        vendor={product.tenant.tenants?.[0]}
        freeShipping={true}
        shippingType={product.delivery_type}
        deliveryTimeRanges={product.delivery_time_ranges}
      />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
    </>
  );
};

export default ProductInformationPage;
