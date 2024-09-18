"use client";

import { GetProductsWithPaginationQuery } from "@/graphql/queries/products/getProductsWithPagination.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getPriceTR } from "@/utils/getPriceTR";
import { getDiscountRate } from "@/utils/price";
import { AnimatePresence, useScroll, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type RecommendedProductsProps = {
  products: GetProductsWithPaginationQuery["product"];
};

const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: ref,
  });

  return (
    <AnimatePresence key={"recommended-products"}>
      <motion.div
        key={"scaler"}
        className="sticky top-0 left-0 bg-secondary origin-left"
        style={{
          scaleX: scrollXProgress,
          height: 2,
        }}
      />
      <motion.div
        key={"products"}
        className="flex items-start justify-start gap-4 overflow-x-auto flex-nowrap relative snap-x snap-mandatory mt-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "auto",
        }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        initial={{ x: 100 }}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        {products.map((prod) => {
          const discount = getDiscountRate(prod.price, prod.discount_price);
          return (
            <Link
              key={prod.id}
              className="border border-gray-100 rounded-lg p-4 flex min-w-[300px] relative flex-1 h-28"
              href={`/${prod.product_categories[0].category.slug}/${prod.slug}?pid=${prod.id}`}
              prefetch={false}
            >
              {discount > 0 && (
                <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg text-xs">
                  {discount}%
                </div>
              )}
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`${getImageUrlFromPath(
                    prod.image_url?.[0]
                  )}?width=80&height=80&format=webp&quality=70`}
                  className="w-full h-full"
                  alt={prod.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex flex-col flex-1 items-end justify-start gap-2">
                <span className="font-semibold text-right flex gap-2 items-end">
                  <span className="text-primary text-lg leading-none">
                    {getPriceTR(
                      prod.discount_price ? prod.discount_price : prod.price
                    )}
                  </span>
                  {prod.discount_price ? (
                    <span className="line-through text-gray-400 text-sm leading-none">
                      {getPriceTR(prod.price)}
                    </span>
                  ) : null}
                </span>
                <h3
                  className="text-sm font-normal text-right max-w-[200px] line-clamp-2"
                  title={prod.name}
                >
                  {prod.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendedProducts;
