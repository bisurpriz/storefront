import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-2 h-8 w-48" />
        <Skeleton className="mx-auto h-4 w-96" />
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-36" />

          <div className="relative pt-4">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200" />
            {[1, 2].map((index) => (
              <div
                key={index}
                className="relative mb-6 flex items-start gap-4 pl-12"
              >
                <Skeleton className="absolute -left-2 h-16 w-16 rounded-full" />
                <div className="flex-1 rounded-lg border p-4">
                  <Skeleton className="mb-2 h-5 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
