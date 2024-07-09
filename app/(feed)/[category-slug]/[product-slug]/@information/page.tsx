import ProductInformation from "../../components/Detail/ProductInformation";
import { getDiscountRate } from "@/components/PriceTag";
import { getProductInformation } from "./actions";
import { FC } from "react";

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

  return (
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
      shippingType={"Selamlar"}
      deliveryTimeRanges={product.delivery_time_ranges}
    />
  );
};

export default ProductInformationPage;
