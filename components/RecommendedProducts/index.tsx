"use client";

import { GetProductsWithPaginationQuery } from "@/graphql/generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
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
        {products.map((prod) => (
          <Link
            key={prod.id}
            className="border border-gray-100 rounded-lg p-4 flex min-w-[300px] relative flex-1 h-28"
            href={`/${prod.category.slug}/${prod.slug}?pid=${prod.id}`}
            prefetch={false}
          >
            <div className="absolute top-0 left-0 bg-primary text-white px-2 py-1 rounded-br-lg text-xs">
              5% indirim
            </div>
            <div className="aspect-w-1 aspect-h-1">
              <Image
                src={getImageUrlFromPath(prod.image_url?.[0])}
                alt={prod.name}
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col flex-1 items-end justify-end gap-2">
              <p className="text-sm font-bold text-right">{prod.price} TL</p>
              <h3 className="text-sm font-normal text-right max-w-[200px]">
                {prod.name}
              </h3>
            </div>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendedProducts;
