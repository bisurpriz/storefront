import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface ProductItemSkeletonProps {
  ref?: React.RefObject<HTMLDivElement>;
}

const ProductItemSkeleton = memo(({ ref }: ProductItemSkeletonProps) => {
  return (
    <Card ref={ref} className="relative flex h-auto flex-col overflow-hidden">
      <CardContent className="flex flex-grow flex-col p-0">
        <Skeleton className="aspect-square w-full bg-gray-200 object-cover" />

        <div className="flex flex-grow flex-col space-y-3 p-4">
          <Skeleton className="h-4 w-1/3 bg-gray-200" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-2/3 bg-gray-200" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 bg-gray-200" />
              ))}
            </div>
            <Skeleton className="h-4 w-8 bg-gray-200" />
          </div>

          <div className="mt-auto flex items-end gap-2">
            <Skeleton className="h-6 w-24 bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-200" />
          </div>
        </div>
      </CardContent>
      <Skeleton className="absolute right-2 top-2 h-8 w-8 rounded-full bg-gray-200" />

      <div className="absolute left-2 top-2 flex gap-1">
        <Skeleton className="h-5 w-5 rounded-md bg-gray-200" />
        <Skeleton className="h-5 w-5 rounded-md bg-gray-200" />
      </div>
    </Card>
  );
});

ProductItemSkeleton.displayName = "ProductItemSkeleton";

export default ProductItemSkeleton;
