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
import PriceTag from "@/components/PriceTag";

export interface ProductItemProps extends Partial<Product> {
  loading?: boolean;
  isFavorite?: boolean;
  handleToggleFavorite?: (productId: number) => void;
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
  discount_price,
  isFavorite,
  product_customizable_areas,
}: ProductItemProps) => {
  const maxXsClasses = {
    container: "overflow-hidden rounded-lg border relative flex flex-col",
    image: "flex-1 grow",
  };

  return loading ? (
    <ProductItemSkeleton />
  ) : (
    <div className={clsx([maxXsClasses.container])}>
      <ProductItemImage src={`${image}`} alt={name} height={500} width={500} className={maxXsClasses.image} id={id} />
      <div className="w-full flex flex-col items-start justify-start gap-2 py-4 px-6 max-xs:gap-1 flex-1 max-xs:p-2">
        <PriceTag discount={discount_price} price={price} />
        <div className="w-full max-sm:h-full max-sm:flex max-sm:flex-col max-sm:justify-between">
          <Link href={`/products/${id}`}>
            <h3 className="text-base font-semibold text-gray-700 font-mono line-clamp-2 capitalize" title={name}>
              {name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-1 max-sm:hidden" title={description}>
            {description}
          </p>
        </div>

        <div className="mt-auto w-full">
          <span className="flex items-center gap-2 text-xs text-gray-500 my-1 max-sm:mt-auto mb-4">
            <Rating value={4} readOnly showReviewCount={false} />
            {`(${4})`}
          </span>
          <AddCartButton id={id} loading={loading} product_customizable_areas={product_customizable_areas} />
        </div>
        <AddToFavorite isFavorite={isFavorite} productId={id} key={id} />
      </div>
    </div>
  );
};

export default ProductItem;
