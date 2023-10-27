import { getPaginatedProducts } from "@/app/products/actions";
import InfinityScroll from "@/components/InfinityScroll";
import React from "react";

const View1: React.FC = async () => {
  const { products, totalCount } = await getPaginatedProducts<ProductData>({
    offset: 0,
  });

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={products}
      dataKey="products"
      query={getPaginatedProducts}
    />
  );
};

export default View1;
