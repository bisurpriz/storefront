import { Skeleton } from "@/components/ui/skeleton";
import ProductVariantSkeleton from "../../components/ProductVariantSelector/ProductVariantSkeleton";

const InformationLoadingPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-md max-md:w-full max-md:rounded-none max-md:p-2 max-md:shadow-none">
      <div className="flex w-full flex-col items-start justify-start rounded-lg">
        <Skeleton className="mb-2 h-14 w-full" />
        <Skeleton className="h-4 w-96 max-md:mb-2" />

        <div className="mb-4 flex w-full items-end justify-start gap-2 md:mt-4">
          <Skeleton className="h-20 w-20" />
          <Skeleton className="h-20 w-32" />
          <Skeleton className="ml-auto h-4 w-1/2" />
        </div>
        <div className="mb-2 flex items-center gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-32" />
          ))}
        </div>
        <ProductVariantSkeleton />
        <Skeleton className="mt-4 h-12 w-full" />
        <div className="my-4 flex w-full items-center justify-between gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationLoadingPage;
