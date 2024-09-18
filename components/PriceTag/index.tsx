import { getPriceTR } from "@/utils/getPriceTR";
import { getDiscountRate } from "@/utils/price";
import clsx from "clsx";

interface PriceTagProps {
  price: number;
  discount?: number;
}

const PriceTag = ({ price, discount }: PriceTagProps) => {
  const discountRate = getDiscountRate(price, discount);

  if (discountRate <= 0 || !discount)
    return (
      <span
        className={clsx([
          "font-semibold leading-none text-xl text-slate-500 max-md:text-xs whitespace-nowrap",
          discount > 0 ? "" : "font-normal",
        ])}
      >
        {getPriceTR(price)}
      </span>
    );

  return (
    <div className="flex items-end gap-2 min-h-[28px]">
      {price && discountRate > 0 && (
        <span className="text-sm text-white font-normal p-1.5 py-1 bg-red-500 rounded-md max-md:text-xs">
          %{discountRate}
        </span>
      )}
      <div className="flex gap-1 items-end max-sm:mb-0 max-md:text-xs">
        {discount > 0 && (
          <span
            className={clsx([
              "font-semibold leading-none text-xl text-green-500 max-md:text-xs whitespace-nowrap",
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
                : "text-xl font-normal text-green-500",
            ])}
          >
            {getPriceTR(price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceTag;
