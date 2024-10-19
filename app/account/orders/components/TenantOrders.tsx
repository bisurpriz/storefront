import StatusBadge from "@/components/StatusBadge";
import { Link } from "@/components/Link";
import OrderItem from "./OrderItem";
import { OrderItemStatus } from "@/common/enums/Order/product";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import OrderItemHeader from "./OrderItemHeader";

const TenantOrders = ({
  tenants,
  order,
}: {
  tenants: GetUserOrdersQuery["order"][0]["tenant_orders"];
  order: GetUserOrdersQuery["order"][0];
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
              ({to.order_items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
              ürün)
            </span>
          </span>
          <StatusBadge status={OrderItemStatus[to.order_status.value]} />
        </div>
        <div className="flex items-center justify-start gap-4">
          <OrderItemHeader order={order} tenant_orders={to} />
        </div>
      </div>

      <OrderItem order_items={to.order_items} />
    </div>
  ));
};

export default TenantOrders;
