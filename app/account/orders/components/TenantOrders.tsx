import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import OrderItem from "./OrderItem";
import OrderMessage from "./OrderMessage";
import { GetUserOrdersQuery } from "@/graphql/generated";
import { OrderItemStatus } from "@/common/enums/Order/product";

const TenantOrders = ({
  tenants,
}: {
  tenants: GetUserOrdersQuery["order"][0]["tenant_orders"];
}) => {
  return tenants?.map((to) => (
    <div key={to.id} className="flex items-start flex-col justify-start">
      <div className="flex justify-between w-full  max-sm:items-baseline">
        <div className="flex items-start justify-start gap-4 max-sm:flex-col max-sm:gap-2">
          <span className="my-1">
            <Link
              href={`/vendor/${to.tenant.tenants?.[0]?.id}`}
              aria-label="Satıcıya git"
              className="text-sm text-secondary"
            >
              {to.tenant.tenants?.[0]?.name}
            </Link>{" "}
            <span className="text-sm text-gray-500">satıcısından</span>{" "}
            <span className="text-sm text-gray-500">
              ({to.order_items.length} ürün)
            </span>
          </span>
          <StatusBadge status={OrderItemStatus[to.order_status.value]} />
        </div>

        <OrderMessage tenant={to.tenant} orderTenantId={to.id} />
      </div>

      <OrderItem order_items={to.order_items} />
    </div>
  ));
};

export default TenantOrders;
