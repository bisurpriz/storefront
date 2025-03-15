import { Skeleton } from "@/components/ui/skeleton";
import ProductVariantSkeleton from "../ProductVariantSelector/ProductVariantSkeleton";

const InformationLoadingPage = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 rounded-md max-md:w-full max-md:rounded-none max-md:p-2 max-md:shadow-none">
      <div className="flex flex-col items-start justify-start w-full rounded-lg">
        <Skeleton className="w-full mb-2 h-14" />
        <Skeleton className="h-4 w-96 max-md:mb-2" />

        <div className="flex items-end justify-start w-full gap-2 mb-4 md:mt-4">
          <Skeleton className="w-20 h-20" />
          <Skeleton className="w-32 h-20" />
          <Skeleton className="w-1/2 h-4 ml-auto" />
        </div>
        <div className="flex items-center gap-4 mb-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="w-32 h-6" />
          ))}
        </div>
        <ProductVariantSkeleton />
        <Skeleton className="w-full h-12 mt-4" />
        <div className="flex items-center justify-between w-full gap-6 my-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-20" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationLoadingPage;
