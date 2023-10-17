import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = async ({
  name,
  description,
  image,
  price,
  id,
}: ProductItemProps) => {
  const url = "https://bisurprizdev.s3.eu-north-1.amazonaws.com";
  return (
    <div className="bg-white rounded-lg hover:shadow-lg p-4  border hover:border-primary transition-all duration-300">
      <Link href={`/products/${id}`}>
        <Image
          src={`${url}/${image}`}
          alt={name}
          className="w-full h-48 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300"
          width={220}
          height={220}
        />
      </Link>
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800">{price} TL</span>
        <Button size="small" label="Sepete Ekle" color="primary" />
      </div>
    </div>
  );
};

export default ProductItem;
