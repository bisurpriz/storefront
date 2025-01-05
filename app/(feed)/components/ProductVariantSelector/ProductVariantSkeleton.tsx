import { Skeleton } from "@/components/ui/skeleton";

function ProductVariantSkeleton() {
  return (
    <div className="relative w-full space-y-3 rounded-lg bg-white">
      <Skeleton className="h-5 w-64" />

      <div className="flex gap-3 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex w-[calc(20%-12px)] min-w-[150px] flex-col space-y-2 rounded-lg border bg-white p-2"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <Skeleton className="h-full w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="flex items-baseline gap-1.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductVariantSkeleton;
