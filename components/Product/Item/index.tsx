"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const ProductItem = ({
  name,
  description,
  image,
  price,
  id,
  loading = false,
}: ProductItemProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const maxXsClasses = {
    container: "max-xs:flex max-xs:items-start max-xs:justify-start gap-3",
    image: "max-xs:w-32 max-xs:h-32 flex-1 grow ",
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        /* await deleteProductFromFavorites({
          variables: {
            id: selectedProductId,
          },
        }); */
      } else {
        /*  await updateProductStatus({
          variables: {
            id: selectedProductId,
            is_favorite: true,
          },
        }); */
      }

      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return loading ? (
    <ProductItemSkeleton />
  ) : (
    <div
      className={`bg-white relative rounded-lg hover:shadow-lg p-4  border hover:border-primary transition-all duration-300 ${maxXsClasses.container}`}
    >
      <div
        onClick={handleToggleFavorite}
        className={`flex items-center justify-center bg-white w-10 h-10 text-2xl shadow-lg text-primary rounded-full cursor-pointer absolute top-2 right-2 z-10`}
      >
        {isFavorite ? (
          <MdFavorite />
        ) : (
          <MdOutlineFavoriteBorder className="text-black hover:text-primary" />
        )}
      </div>
      <Link href={`/products/${id}`} className="min-w-fit">
        <Image
          src={`${image}`}
          alt={name}
          className={`w-full object-cover aspect-square cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300 ${maxXsClasses.image}`}
          width={315}
          height={315}
          loading="lazy"
        />
      </Link>
      <div className="max-xs:flex max-xs:flex-col max-xs:items-start max-xs:justify-start max-xs:gap-1">
        <h2 className="text-lg font-semibold mt-2" title={name}>
          {name}
        </h2>
        <p
          title={description}
          className="text-gray-600 text-sm mt-1 truncate max-w-[200px]"
        >
          {description}
        </p>
        <div className="xs:mt-4 flex justify-between items-center max-xs:flex-col max-xs:items-start max-xs:justify-start">
          <span className="text-lg font-bold text-gray-800">{price} TL</span>
          <Button size="small" label="Sepete Ekle" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
