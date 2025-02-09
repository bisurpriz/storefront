"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { useOrderCustomizableModal } from "@/contexts/OrderCustomizableModal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { toast } from "@/hooks/use-toast";
import { useOrderFilters } from "@/hooks/useOrderFilters";
import { localeFormat } from "@/utils/format";
import { useRouter } from "next/navigation";
import { createReview } from "../../reviews/actions";
import CreateReview from "../../reviews/components/CreateReview/CreateReview";
import { OrderFiltersComponent } from "./OrderFilters";
import OrderMessage from "./OrderMessage";
import { ShowDetailModal } from "./ShowDetailModal";
import { TenantOrder } from "./TenantOrder";

interface NewOrderDesignProps {
  readonly order: GetUserOrdersQuery["order"];
}

export default function NewOrderDesign({ order }: NewOrderDesignProps) {
  const { onOpen } = useOrderCustomizableModal();
  const { openDialog, closeDialog } = useResponsiveDialog();
  const { push } = useRouter();

  const {
    filters,
    setFilters,
    filteredOrders,
    hasActiveFilters,
    clearFilters,
  } = useOrderFilters(order);

  const handleCreateReview = async ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => {
    const response = await createReview({
      product_id,
      score,
      comment,
    });
    if (response?.created_at) {
      closeDialog();
      toast({
        title: "Değerlendirme başarıyla eklendi.",
      });
    }
    push("/account/reviews");
  };

  const handlers = {
    onShowDetail: (item: any) => {
      openDialog(<ShowDetailModal selectedOrder={item} />);
    },
    onOpenCustomization: (order: any) => {
      onOpen(order);
    },
    onOpenMessage: (tenantOrder: any) => {
      openDialog(
        <OrderMessage
          orderTenantId={tenantOrder.id}
          tenant={tenantOrder.tenant}
          tenantId={tenantOrder.tenant.tenants[0].id}
        />,
      );
    },
    onOpenReview: (item: any) => {
      openDialog(
        <CreateReview
          handleCreateReview={handleCreateReview}
          selectedProduct={item.product}
        />,
      );
    },
  };

  return (
    <div className="container mx-auto space-y-6">
      <OrderFiltersComponent
        filters={filters}
        setFilters={setFilters}
        hasActiveFilters={!!hasActiveFilters}
        clearFilters={clearFilters}
      />

      <div className="grid gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="bg-muted/5 px-4 pb-0">
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                        #{order.order_no}
                      </span>
                      <time className="text-sm font-normal text-muted-foreground">
                        {localeFormat(
                          new Date(order.created_at),
                          "dd MMMM yyyy HH:mm",
                        )}
                      </time>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">
                      Toplam:{" "}
                      <span className="text-base font-bold">
                        {order.total_amount} ₺
                      </span>
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-6 p-4">
                {order.tenant_orders.map((tenantOrder) => (
                  <TenantOrder
                    key={tenantOrder.id}
                    tenantOrder={tenantOrder}
                    order={order}
                    handlers={handlers}
                  />
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
            <div className="text-muted-foreground">
              {hasActiveFilters
                ? "Filtrelere uygun sipariş bulunamadı"
                : "Henüz sipariş bulunmuyor, siparişinizin ödemesi tamamlandığında siparişiniz görüntülenecektir."}
            </div>
            {hasActiveFilters && (
              <Button
                variant="link"
                size="sm"
                onClick={clearFilters}
                className="mt-2"
              >
                Filtreleri Temizle
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
