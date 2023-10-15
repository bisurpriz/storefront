"use client";

import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface ProductItemProps {
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductItem = ({ name, description, image, price }: ProductItemProps) => {
  return (
    <div className="bg-white rounded-lg hover:shadow-lg p-4 rounded-t border hover:border-primary transition-all duration-300">
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300"
        width={220}
        height={220}
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800">{price} TL</span>
        <Button
          size="small"
          onClick={() => {}}
          label="Sepete Ekle"
          color="primary"
        />
      </div>
    </div>
  );
};

export default ProductItem;
