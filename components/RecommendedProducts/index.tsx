"use client";

import { GetProductsWithPaginationQuery } from "@/graphql/queries/products/getProductsWithPagination.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getPriceTR } from "@/utils/getPriceTR";
import { getDiscountRate } from "@/utils/price";
import { AnimatePresence, useScroll, motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/components/Link";
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
        className="sticky left-0 top-0 origin-left bg-secondary"
        style={{
          scaleX: scrollXProgress,
          height: 2,
        }}
      />
      <motion.div
        key={"products"}
        className="relative z-0 mt-2 flex snap-x snap-mandatory flex-nowrap items-start justify-start gap-4 overflow-x-auto"
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
              className="relative flex h-28 min-w-[300px] flex-1 rounded-lg border border-gray-100 p-4"
              href={`/${prod.product_categories[0].category.slug}/${prod.slug}?pid=${prod.id}`}
              prefetch={false}
            >
              {discount > 0 && (
                <div className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-2 py-1 text-xs text-white">
                  {discount}%
                </div>
              )}
              <div className="aspect-square overflow-hidden rounded-lg">
                <Image
                  src={`${getImageUrlFromPath(
                    prod.image_url?.[0],
                  )}?width=80&height=80&format=webp&quality=70`}
                  className="h-full w-full"
                  alt={prod.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex flex-1 flex-col items-end justify-start gap-2">
                <span className="flex items-end gap-2 text-right font-semibold">
                  {prod.discount_price < prod.price && (
                    <span className="text-sm leading-none text-gray-400 line-through">
                      {getPriceTR(prod.discount_price)}
                    </span>
                  )}
                  <span className="text-lg leading-none text-primary">
                    {getPriceTR(prod.price)}
                  </span>
                </span>
                <h3
                  className="line-clamp-2 max-w-[200px] text-right text-sm font-normal"
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
