"use client";

import { Button } from "@/components/ui/button";
import { useOrderCustomizableModal } from "@/contexts/OrderCustomizableModal";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import React, { FC } from "react";
import OrderMessage from "./OrderMessage";

type OrderItemHeaderProps = {
  tenant_orders: GetUserOrdersQuery["order"][0]["tenant_orders"][0];
  order: GetUserOrdersQuery["order"][0];
};

const OrderItemHeader: FC<OrderItemHeaderProps> = ({
  tenant_orders,
  order,
}) => {
  const { onOpen } = useOrderCustomizableModal();

  const wasCustomized = tenant_orders.order_items.some(
    (oi) =>
      oi.order_item_special_images.length > 0 ||
      oi.order_item_special_texts.length > 0
  );

  const hasCustomizableProducts = tenant_orders.order_items.some(
    (oi) => oi?.product?.product_customizable_areas.length > 0
  );

  const showUploadButton = hasCustomizableProducts && !wasCustomized;

  // toplam custom alan sayısı
  const customAreaTotalCount = tenant_orders.order_items.reduce(
    (acc, oi) =>
      acc +
      oi?.product?.product_customizable_areas.reduce(
        (acc, cca) => acc + cca.count,
        0
      ),
    0
  );
  // doldurulan custom alan sayısı
  const customAreaFilledCount = tenant_orders.order_items.reduce(
    (acc, oi) =>
      acc +
      oi.order_item_special_images.length +
      oi.order_item_special_texts.length,
    0
  );

  const haveAnyCustomizeEmpty = customAreaTotalCount > customAreaFilledCount;

  return (
    <div className="flex items-center justify-end gap-4 flex-wrap">
      {showUploadButton && (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            onOpen(order);
          }}
        >
          Yükle
        </Button>
      )}
      {wasCustomized && haveAnyCustomizeEmpty && (
        <Button
          type="button"
          size="sm"
          variant="default"
          onClick={() => {
            onOpen(order);
          }}
        >
          Tamamla
        </Button>
      )}
      <Button type="button" size="sm" variant="outline">
        Detaylar
      </Button>
      <OrderMessage
        tenant={tenant_orders.tenant}
        orderTenantId={tenant_orders.id}
        tenantId={tenant_orders.id}
      />
    </div>
  );
};

export default OrderItemHeader;
