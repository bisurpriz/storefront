import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const ProductImageGalleryLoading = () => {
  return (
    <div className="mx-auto flex flex-col gap-2 xl:flex-row">
      {/* Thumbnails */}
      <div className="order-2 w-full xl:order-1 xl:w-[100px]">
        <div className="flex h-[100px] w-full gap-1 overflow-hidden xl:h-[500px] xl:flex-col">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square h-[90px] w-[90px] shrink-0 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="order-1 w-full xl:order-2 xl:w-4/5">
        <div className="mx-auto h-full max-h-[500px] w-full max-w-[500px]">
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductImageGalleryLoading);
