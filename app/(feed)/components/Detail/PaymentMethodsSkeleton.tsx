import { Skeleton } from "@/components/ui/skeleton";

const PaymentMethodsSkeleton = () => {
  return (
    <div className="rounded-lg border border-border">
      {/* Accordion Header */}
      <div className="flex items-center gap-2 p-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Accordion Content */}
      <div className="space-y-4 px-4 pb-4">
        {/* Info Box */}
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
          <div className="flex items-start gap-2">
            <Skeleton className="mt-0.5 h-4 w-4" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>

        {/* iyzico Logo Placeholder */}
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white">
          <Skeleton className="h-[120px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSkeleton;
