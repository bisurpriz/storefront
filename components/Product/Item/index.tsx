"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductItemSkeleton from "./ProductItemSkeleton";

export const IMAGE_URL = "https://bisurprizdev.s3.eu-north-1.amazonaws.com";

const ProductItem = ({
  name,
  description,
  image,
  price,
  id,
  loading = false,
}: ProductItemProps) => {
  const maxXsClasses = {
    container: "max-xs:flex max-xs:items-start max-xs:justify-start gap-3",
    image: "max-xs:w-32 max-xs:h-32 flex-1 grow ",
  };

  return loading ? (
    <ProductItemSkeleton />
  ) : (
    <div
      className={`bg-white rounded-lg hover:shadow-lg p-4  border hover:border-primary transition-all duration-300 ${maxXsClasses.container}`}
    >
      <Link href={`/products/${id}`} className="min-w-fit">
        <Image
          src={`${IMAGE_URL}/${image}`}
          alt={name}
          className={`w-full object-cover aspect-square cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300 ${maxXsClasses.image}`}
          width={315}
          height={315}
          loading="lazy"
        />
      </Link>
      <div className="max-xs:flex max-xs:flex-col max-xs:items-start max-xs:justify-start max-xs:gap-1">
        <h2 className="text-lg font-semibold mt-2">{name}</h2>
        <p className="text-gray-600 text-sm mt-1 truncate">{description}</p>
        <div className="xs:mt-4 flex justify-between items-center max-xs:flex-col max-xs:items-start max-xs:justify-start">
          <span className="text-lg font-bold text-gray-800">{price} TL</span>
          <Button size="small" label="Sepete Ekle" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
