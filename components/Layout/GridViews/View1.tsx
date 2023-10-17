import ProductItem from "@/components/Product/Item";
import { getClient } from "@/graphql/lib/client";
import { GET_ALL_PRODUCTS } from "@/graphql/queries/products/getAllProducts";
import React from "react";

interface View1Props {
  data: ProductItemProps[];
}

const View1: React.FC<View1Props> = async ({ data }) => {
  const { data: products } = await getClient().query({
    query: GET_ALL_PRODUCTS,
  });

  console.log(products);

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
        />
      ))}
    </div>
  );
};

export default View1;
