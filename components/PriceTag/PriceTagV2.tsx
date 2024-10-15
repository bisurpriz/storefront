import { cn } from "@/lib/utils";
import Chip from "../Chip";

function PriceTagv2({
  originalPrice,
  discountedPrice,
  quantity,
  className,
}: {
  originalPrice: number;
  discountedPrice: number;
  quantity?: number;
  className?: string;
}) {
  const calculateDiscountPercentage = (
    original: number,
    discounted: number
  ) => {
    const discount = ((original - discounted) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscountPercentage(
    originalPrice,
    discountedPrice
  );

  return (
    <div
      className={cn(
        "flex space-x-2 whitespace-nowrap w-full font-manrope h-6",
        className
      )}
    >
      {discountPercentage > 0 && (
        <Chip
          variant="filled"
          color="error"
          label={`%${discountPercentage}`}
          className="!py-1 !px-2 text-xs"
          rounded="low"
        />
      )}
      <div className="flex space-x-2 items-end">
        <span className="text-lg font-bold text-primary leading-none max-sm:text-sm">
          ₺{discountedPrice.toFixed(2)}
        </span>
        {discountPercentage > 0 && (
          <span className="text-sm text-muted-foreground line-through leading-none max-sm:text-xs">
            ₺{originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

export default PriceTagv2;
