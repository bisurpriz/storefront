import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface ProductItemSkeletonProps {
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const ProductItemSkeleton = memo(
  ({ ref, className }: ProductItemSkeletonProps) => {
    return (
      <Card ref={ref} className={className}>
        <CardContent className="flex flex-col p-0">
          <Skeleton className="aspect-square h-52 w-full bg-gray-100/80 lg:h-56 2xl:h-60" />

          <div className="flex flex-col p-2 sm:p-4">
            <div className="mb-2">
              <div className="flex h-10 flex-col gap-1">
                <Skeleton className="h-4 w-16 bg-gray-100/80" />
                <Skeleton className="h-4 w-full bg-gray-100/80" />
              </div>
            </div>

            <div className="flex h-4 items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-3 bg-gray-100/80" />
                ))}
              </div>
              <Skeleton className="h-3 w-8 bg-gray-100/80" />
            </div>

            <div className="mt-auto flex h-9 items-end gap-2">
              <Skeleton className="h-5 w-20 bg-gray-100/80" />
              <Skeleton className="h-3.5 w-14 bg-gray-100/80" />
            </div>
          </div>
        </CardContent>

        <div className="absolute right-2 top-2">
          <Skeleton className="h-7 w-7 rounded-full bg-gray-100/80" />
        </div>

        <div className="absolute left-2 top-2 flex gap-1">
          <Skeleton className="h-5 w-5 rounded-md bg-gray-100/80" />
          <Skeleton className="h-5 w-5 rounded-md bg-gray-100/80" />
        </div>
      </Card>
    );
  },
);

ProductItemSkeleton.displayName = "ProductItemSkeleton";

export default ProductItemSkeleton;
