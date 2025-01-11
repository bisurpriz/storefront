"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import { Link } from "@/components/Link";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { useOrderCustomizableModal } from "@/contexts/OrderCustomizableModal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { useOrderFilters } from "@/hooks/useOrderFilters";
import { getTenantUrl } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createReview } from "../../reviews/actions";
import CreateReview from "../../reviews/components/CreateReview/CreateReview";
import { OrderFiltersComponent } from "./OrderFilters";
import OrderMessage from "./OrderMessage";
import { ShowDetailModal } from "./ShowDetailModal";

interface OrderItemProps {
  readonly item: any;
  readonly order: any;
  readonly tenantOrder: any;
  readonly onShowDetail: (item: any) => void;
  readonly onOpenCustomization: (order: any) => void;
  readonly onOpenMessage: (tenantOrder: any) => void;
  readonly onOpenReview: (item: any) => void;
}

interface TenantOrderProps {
  readonly tenantOrder: any;
  readonly order: any;
  readonly handlers: {
    readonly onShowDetail: (item: any) => void;
    readonly onOpenCustomization: (order: any) => void;
    readonly onOpenMessage: (tenantOrder: any) => void;
    readonly onOpenReview: (item: any) => void;
  };
}

interface NewOrderDesignProps {
  readonly order: GetUserOrdersQuery["order"];
}

const OrderItem = ({
  item,
  order,
  tenantOrder,
  onShowDetail,
  onOpenCustomization,
  onOpenMessage,
  onOpenReview,
}: OrderItemProps) => {
  const renderCustomizationButton = (item: any, order: any) => {
    const hasCustomizableAreas =
      item.product.product_customizable_areas.length > 0;
    const completedCustomizations =
      item.order_item_special_images.length +
      item.order_item_special_texts.length;
    const requiredCustomizations =
      item.product.product_customizable_areas.reduce(
        (acc: number, area: any) => acc + area.count,
        0,
      );

    if (!hasCustomizableAreas) return null;

    if (completedCustomizations < requiredCustomizations) {
      return (
        <Button
          variant="link"
          size="sm"
          onClick={() => onOpenCustomization(order)}
          className="h-8"
        >
          Özelleştirmeyi Tamamla
        </Button>
      );
    }

    return (
      <Button variant="link" size="sm" disabled className="h-8">
        Özelleştirme Tamamlandı
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <StatusBadge status={OrderItemStatus[item.status || "Processing"]} />
      <div className="relative flex flex-col gap-4 rounded-lg bg-muted/5 sm:flex-row">
        <div className="shrink-0 overflow-hidden rounded-md">
          {item.product.image_url && item.product.image_url.length > 0 && (
            <Image
              src={getImageUrlFromPath(item.product.image_url[0])}
              alt={item.product.name}
              width={120}
              height={120}
              className="aspect-square rounded-md bg-background object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex-1">
            <h4 className="font-medium">{item.product.name}</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <Link
                href={getTenantUrl(
                  tenantOrder.tenant.tenants[0].name,
                  tenantOrder.tenant.tenants[0].id.toString(),
                )}
                className="text-tertiary"
              >
                {tenantOrder.tenant.tenants[0].name}
              </Link>
              <p>Adet: {item.quantity}</p>
              <p>
                Kategori:{" "}
                {item.product.product_categories[0]?.category.name ||
                  "Belirtilmemiş"}
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(item)}
                className="h-8"
              >
                Detayları Görüntüle
              </Button>
              {renderCustomizationButton(item, order)}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onOpenMessage(tenantOrder)}
                className="h-8"
              >
                Satıcıya Mesaj
              </Button>
              {tenantOrder.order_status?.value ===
                OrderItemStatus.Delivered && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onOpenReview(item)}
                  className="h-8"
                >
                  Değerlendir
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantOrder = ({ tenantOrder, order, handlers }: TenantOrderProps) => {
  return (
    <div key={tenantOrder.id}>
      <div className="grid gap-4">
        {tenantOrder.order_items.map((item: any) => (
          <OrderItem
            key={item.id}
            item={item}
            order={order}
            tenantOrder={tenantOrder}
            {...handlers}
          />
        ))}
      </div>
    </div>
  );
};

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
      toast.success("Değerlendirme başarıyla eklendi.");
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
