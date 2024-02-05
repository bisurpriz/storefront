import { getPriceTR } from "@/utils/getPriceTR";
import clsx from "clsx";
import { memo, useMemo } from "react";

interface PriceTagProps {
  price: number;
  discount?: number;
}

const getDiscountRate = (price: number, discount: number) => {
  // indirim oranı hesaplanır
  const dif = price - discount;

  return Math.round((dif * 100) / price);
};

const PriceTag = ({ price, discount }: PriceTagProps) => {
  const discountRate = useMemo(
    () => getDiscountRate(price, discount),
    [price, discount]
  );

  if (!discount)
    <span
      className={clsx([
        "font-normal leading-none text-lg text-green-500",
        discount > 0 ? "" : "font-normal",
      ])}
    >
      {discount?.toFixed(2)} &#8378;
    </span>;

  return (
    <div className='flex items-end gap-1'>
      {discount > 0 && price && discountRate > 0 && (
        <span className='text-sm text-white font-normal p-1.5 py-1 bg-red-500 rounded-lg max-md:text-xs'>
          %{discountRate}
        </span>
      )}
      <div className='flex gap-1 items-end max-sm:mb-0 max-md:text-xs'>
        {discount > 0 && (
          <span
            className={clsx([
              "font-normal leading-none text-lg text-green-500 max-md:text-xs whitespace-nowrap",
              discount > 0 ? "" : "font-normal",
            ])}
          >
            {getPriceTR(discount)}
          </span>
        )}
        {price && (
          <span
            className={clsx([
              "decoration-slate-500 self-end leading-none max-md:text-xs whitespace-nowrap",
              discount > 0
                ? "text-xs line-through"
                : "text-lg font-normal text-green-500",
            ])}
          >
            {getPriceTR(price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(PriceTag);
