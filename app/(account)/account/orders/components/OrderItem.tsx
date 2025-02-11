import { OrderItemStatus } from "@/common/enums/Order/product";
import { Link } from "@/components/Link";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { getImageUrlFromPath, getTenantUrl } from "@/lib/utils";
import Image from "next/image";

interface OrderItemProps {
  readonly item: any;
  readonly order: any;
  readonly tenantOrder: any;
  readonly onShowDetail: (item: any) => void;
  readonly onOpenCustomization: (order: any) => void;
  readonly onOpenMessage: (tenantOrder: any) => void;
  readonly onOpenReview: (item: any) => void;
}

export const OrderItem = ({
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
