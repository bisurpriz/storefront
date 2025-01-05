"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PriceTagProps {
  price: number;
  discountPrice?: number | null;
  className?: string;
}

export const PriceTag = ({
  price,
  discountPrice,
  className,
}: PriceTagProps) => {
  /* discount price highest price in last 30 days */
  const hasDiscount = discountPrice && price < discountPrice;
  const discountRate = hasDiscount
    ? Math.max(1, Math.floor(((discountPrice - price) / discountPrice) * 100))
    : 0;

  return (
    <div
      className={cn(
        "relative flex flex-row-reverse justify-between gap-1 whitespace-nowrap",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-md bg-red-50 px-1.5 py-0.5"
          >
            <span className="text-xs font-semibold text-red-500">
              %{discountRate} İndirim
            </span>
          </motion.div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-primary md:text-xl">
          {price.toLocaleString("tr-TR")}₺
        </span>

        {hasDiscount && discountPrice &&   (
          <span className="text-sm text-gray-400 line-through">
            {discountPrice.toLocaleString("tr-TR")}₺
          </span>
        )}
      </div>
    </div>
  );
};
