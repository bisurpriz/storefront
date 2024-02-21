"use client";

import { AnimatePresence, useScroll, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const RecommendedProducts = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: ref,
  });

  return (
    <AnimatePresence>
      <motion.div
        className="sticky top-0 left-0 bg-secondary origin-left"
        style={{
          scaleX: scrollXProgress,
          height: 2,
        }}
      />
      <motion.div
        className="flex items-center justify-start gap-4 overflow-x-auto flex-nowrap relative snap-x snap-mandatory"
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
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-4 flex min-w-[300px]"
          >
            <div className="aspect-w-1 aspect-h-1">
              <Image
                // source.unsplash.com
                src={`https://source.unsplash.com/150x150/?product,${index}`}
                alt="product"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col flex-1 items-end justify-end">
              <div className="h-4 bg-gray-100 w-2/3 mt-2" />
              <div className="h-4 bg-gray-100 w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendedProducts;
