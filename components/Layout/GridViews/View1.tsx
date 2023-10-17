import ProductItem from "@/components/Product/Item";
import React from "react";

interface View1Props {
  data: ProductItemProps[];
}

const View1: React.FC<View1Props> = async ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((item, index) => (
        <ProductItem
          key={index}
          name={item.name}
          description={item.description}
          image={item.image}
          price={item.price}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default View1;
