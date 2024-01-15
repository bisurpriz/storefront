import clsx from "clsx";
import { memo, useMemo } from "react";

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

  if (!discount)
    <span
      className={clsx([
        "font-semibold leading-none text-xl text-green-500",
        discount > 0 ? "" : "font-semibold",
      ])}
    >
      {discount?.toFixed(2)} &#8378;
    </span>;

  return (
    <div className="flex items-end justify-start gap-2 whitespace-nowrap w-full max-sm:justify-between">
      {discount > 0 && price && discountRate > 0 && (
        <span className="text-sm text-white font-semibold p-1.5 bg-red-500 rounded-lg">
          %{discountRate}
        </span>
      )}
      <div className="flex gap-2 mb-1 items-center max-sm:items-start max-sm:mb-0 max-xs:flex-wrap-reverse">
        {discount > 0 && (
          <span
            className={clsx([
              "font-semibold leading-none text-xl text-green-500",
              discount > 0 ? "" : "font-semibold",
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
                : "text-xl font-semibold text-green-500",
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
