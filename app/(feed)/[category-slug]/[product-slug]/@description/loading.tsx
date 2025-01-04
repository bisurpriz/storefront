import { Skeleton } from "@/components/ui/skeleton";

const ProductDescriptionLoadingPage = () => {
  return (
    <Skeleton className="h-72 w-full animate-pulse rounded-lg bg-primary/20" />
  );
};

export default ProductDescriptionLoadingPage;
