import type { OrderResponse } from "@/common/types/Order/order";
import Link from "next/link";
import React from "react";
import OrderItem from "./OrderItem";
import StatusBadge from "./StatusBadge";

const TenantOrders = ({
  tenants,
}: {
  tenants: OrderResponse["tenant_orders"];
}) => {
  return tenants?.map((to) => (
    <div key={to.id} className="flex items-start flex-col justify-start">
      <div className="flex items-start justify-start mr-4 gap-4">
        <span className="my-1">
          <Link
            href={`/vendor/${to.tenant.id}`}
            aria-label="Satıcıya git"
            className="text-sm text-secondary"
          >
            {to.tenant.nickname}
          </Link>{" "}
          <span className="text-sm text-gray-500">satıcısından</span>{" "}
          <span className="text-sm text-gray-500">
            ({to.order_items.length} ürün)
          </span>
        </span>
        <StatusBadge status={to.order_status.value} />
      </div>

      <OrderItem order_items={to.order_items} />
    </div>
  ));
};

export default TenantOrders;
