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
      name={product[0].name}
      price={product[0].price}
      rateCounts={{
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
      }}
      rating={product[0].reviews_aggregate.aggregate.count}
      reviewCount={product[0].reviews_aggregate.aggregate.count}
      promotion="Kargo Bedava"
      discountPrice={product[0].discount_price}
      discountRate={getDiscountRate(
        product[0].price,
        product[0].discount_price
      )}
      key={product[0].id}
      vendor={product[0].tenant.tenants?.[0]}
      freeShipping={true}
      shippingType={"Selamlar"}
      deliveryTimeRanges={product[0].delivery_time_ranges}
    />
  );
};

export default ProductInformationPage;
