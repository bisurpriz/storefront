import { cn } from "@/lib/utils";
import Chip from "../Chip";

function PriceTagv2({
  originalPrice,
  discountedPrice,
  className,
}: {
  originalPrice: number;
  discountedPrice: number;
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
    <div className={cn("flex space-x-2 whitespace-nowrap w-full", className)}>
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
        <span className="text-lg font-bold text-primary leading-none">
          {discountedPrice.toFixed(2)} TL
        </span>
        {discountPercentage > 0 && (
          <span className="text-sm text-muted-foreground line-through leading-none">
            {originalPrice.toFixed(2)} TL
          </span>
        )}
      </div>
    </div>
  );
}

export default PriceTagv2;
