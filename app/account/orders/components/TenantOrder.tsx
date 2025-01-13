import { OrderItem } from "./OrderItem";

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

export const TenantOrder = ({
  tenantOrder,
  order,
  handlers,
}: TenantOrderProps) => {
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
