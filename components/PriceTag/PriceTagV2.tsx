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
    discounted: number,
  ) => {
    const discount = ((original - discounted) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscountPercentage(
    originalPrice,
    discountedPrice,
  );

  return (
    <div
      className={cn(
        "flex h-6 w-full space-x-2 whitespace-nowrap font-manrope",
        className,
      )}
    >
      {discountPercentage > 0 && (
        <Chip
          variant="filled"
          color="error"
          label={`%${discountPercentage}`}
          className="!px-2 !py-1 text-xs"
          rounded="low"
        />
      )}
      <div className="flex items-end space-x-2">
        <span className="text-lg font-bold leading-none text-primary max-sm:text-sm">
          ₺{discountedPrice.toFixed(2)}
        </span>
        {discountPercentage > 0 && (
          <span className="text-sm leading-none text-muted-foreground line-through max-sm:text-xs">
            ₺{originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

export default PriceTagv2;
