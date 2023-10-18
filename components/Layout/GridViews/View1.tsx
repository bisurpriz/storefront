import ProductItem from "@/components/Product/Item";
import { getClient } from "@/graphql/lib/client";
import { GET_ALL_PRODUCTS } from "@/graphql/queries/products/getAllProducts";
import React from "react";

interface View1Props {
  data: ProductItemProps[];
}

const View1: React.FC<View1Props> = async () => {
  const { data: products, loading } = await getClient().query({
    query: GET_ALL_PRODUCTS,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.product?.map((item: any, index: Number) => (
        <ProductItem
          key={item.id}
          name={item.name}
          description={item.description}
          image={item.image_url[0]}
          price={item.price}
          id={item.id}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default View1;
