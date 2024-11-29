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
      <div className="max-sm:flex max-sm:min-h-[44px] max-sm:items-end">
        <span
          className={clsx([
            "block whitespace-nowrap text-xl font-semibold text-slate-500 max-md:text-base",
            discount > 0 ? "" : "font-normal",
          ])}
        >
          {getPriceTR(discount)}
        </span>
      </div>
    );

  return (
    <div className="flex min-h-[28px] items-end gap-2 max-md:gap-1 max-sm:w-full max-sm:justify-between max-sm:px-2">
      {price && discountRate > 0 && (
        <span className="rounded-md bg-red-500 p-1.5 py-1 text-sm font-normal text-white max-md:text-xs max-sm:w-full max-sm:text-center">
          %{discountRate}
        </span>
      )}
      <div className="flex items-end gap-1 max-sm:mb-0 max-sm:flex-col-reverse max-sm:space-y-0">
        {discount > 0 && (
          <span
            className={clsx([
              "whitespace-nowrap text-xl font-semibold leading-none text-green-500 max-md:text-base",
              discount > 0 ? "" : "font-normal",
            ])}
          >
            {getPriceTR(discount)}
          </span>
        )}
        {price && (
          <span
            className={clsx([
              "mb-0.5 self-end whitespace-nowrap leading-none decoration-slate-500 max-md:text-xs",
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
