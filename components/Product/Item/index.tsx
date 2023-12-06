"use client";

import Link from "next/link";
import React, { useState } from "react";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { Product } from "@/common/types/Product/product";
import clsx from "clsx";
import ProductItemImage from "../ProductItemImage/ProductItemImage";
import Rating from "@/components/Rating/Rating";
import AddCartButton from "./components/AddCartButton";
import AddToFavorite from "./components/AddToFavorite";

export interface ProductItemProps extends Partial<Product> {
  loading?: boolean;
}

const ProductItem = ({
  name,
  description,
  image_url: image,
  price,
  id,
  loading = false,
  reviews,
  delivery_type,
}: ProductItemProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const maxXsClasses = {
    container: "overflow-hidden rounded-lg border relative flex flex-col",
    image: "flex-1 grow",
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
    <div className={clsx([maxXsClasses.container])}>
      <ProductItemImage
        src={`${image}`}
        alt={name}
        height={500}
        width={500}
        className={maxXsClasses.image}
        id={id}
      />
      <div className="w-full flex flex-col items-start justify-start gap-2 py-4 px-6 max-xs:gap-1 flex-1 max-xs:p-2">
        <div className="w-full flex items-center gap-2 font-sans mt-2 max-xs:flex-col max-xs:items-start max-xs:gap-0">
          <span className="text-start text-2xl font-semibold text-primary-light max-xs:text-lg">
            {/* {formatCurrency(price)} */} ₺{price.toFixed(2)}
          </span>
          <span className="text-sm text-error-light line-through decoration-black">
            {/* {formatCurrency(price * 1.2)} */} ₺{(price * 1.2).toFixed(2)}
          </span>
        </div>
        <div className="w-full max-sm:h-full max-sm:flex max-sm:flex-col max-sm:justify-between">
          <Link href={`/products/${id}`}>
            <h3
              className="text-base font-semibold text-gray-700 font-mono line-clamp-2 capitalize"
              title={name}
            >
              {name}
            </h3>
          </Link>
          <p
            className="text-sm text-gray-500 line-clamp-1 max-sm:hidden"
            title={description}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto w-full">
          <span className="flex items-center gap-2 text-xs text-gray-500 my-1 max-sm:mt-auto mb-4">
            <Rating value={4} readOnly showReviewCount={false} />
            {`(${4})`}
          </span>
          <AddCartButton id={id} loading={loading} />
        </div>
        <AddToFavorite
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
          key={id}
        />
      </div>
    </div>
  );
};

export default ProductItem;
