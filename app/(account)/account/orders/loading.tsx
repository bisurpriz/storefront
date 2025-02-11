import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OrdersLoadingPage = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="grid gap-6">
        {[1, 2].map((index) => (
          <Card key={index}>
            <CardHeader className="bg-muted/5 px-4 pb-0">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[150px]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-[120px]" />
              </div>
            </CardHeader>

            <CardContent className="grid gap-6 p-4">
              {[1, 2].map((itemIndex) => (
                <div key={itemIndex}>
                  <div className="mb-2 flex items-center gap-3">
                    <Skeleton className="h-6 w-[120px]" />
                  </div>

                  <div className="grid gap-4">
                    <div className="relative flex flex-col gap-4 rounded-lg bg-muted/5 sm:flex-row">
                      <Skeleton className="h-[120px] w-[120px] rounded-md" />

                      <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex-1 space-y-2">
                          <Skeleton className="h-6 w-[200px]" />
                          <Skeleton className="h-4 w-[150px]" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2">
                          <Skeleton className="h-8 w-[120px]" />
                          <Skeleton className="h-8 w-[120px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersLoadingPage;
