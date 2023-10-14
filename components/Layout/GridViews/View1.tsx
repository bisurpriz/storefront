import ProductItem from "@/components/Product/Item";
import Image from "next/image";
import React from "react";

interface Item {
  name: string;
  description: string;
  image: string;
  price: number;
}

interface View1Props {
  data: Item[];
}

const View1: React.FC<View1Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((item, index) => (
        <ProductItem
          key={index}
          name={item.name}
          description={item.description}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default View1;
