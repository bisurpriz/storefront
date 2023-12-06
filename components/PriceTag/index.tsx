import clsx from "clsx";
import React, { memo, useMemo } from "react";

interface PriceTagProps {
  price: number;
  discount?: number;
}

const getDiscountRate = (price: number, discount: number) => {
  return discount ? Math.floor((discount / price) * 100) : 0;
};

const PriceTag = ({ price, discount }: PriceTagProps) => {
  const discountRate = useMemo(
    () => getDiscountRate(price, discount),
    [price, discount]
  );

  return (
    <div className="flex items-end justify-start flex-wrap gap-2 whitespace-nowrap w-full max-sm:justify-between">
      {discount > 0 && price && discountRate > 0 && (
        <span className="text-sm text-white font-semibold p-1.5 bg-secondary-light rounded-lg">
          %{discountRate}
        </span>
      )}
      <div className="flex gap-2 mb-1 items-center max-sm:items-start max-sm:mb-0 ">
        {discount > 0 && (
          <span
            className={clsx([
              "font-semibold leading-none",
              discount > 0
                ? "text-xl text-primary-light"
                : "text-xl font-semibold text-primary-light",
            ])}
          >
            {discount?.toFixed(2)} &#8378;
          </span>
        )}
        {price && (
          <span
            className={clsx([
              "decoration-slate-500 self-end leading-none",
              discount > 0
                ? "text-sm line-through"
                : "text-xl font-semibold text-primary-light",
            ])}
          >
            {price?.toFixed(2)} &#8378;
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(PriceTag);
