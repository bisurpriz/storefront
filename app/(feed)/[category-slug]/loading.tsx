import { Skeleton } from "@/components/ui/skeleton";

const CategoryLoading = () => {
  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
      <div className="lg:col-span-1">
        {/* Filter Loading */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[150px] w-full" />
        </div>
      </div>
      <div className="lg:col-span-4">
        {/* Products Grid Loading */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLoading;
