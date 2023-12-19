import React from "react";
import OrderItem from "./OrderItem";
import type { OrderResponse } from "@/common/types/Order/order";

const TenantOrders = ({
  tenants,
}: {
  tenants: OrderResponse["tenant_orders"];
}) => {
  return tenants?.map((to) => (
    <div key={to.id} className="flex items-start flex-col justify-start">
      <span className="my-1">
        {to.tenant.nickname}{" "}
        <span className="text-sm text-gray-600">satıcısından</span>{" "}
        <span className="text-sm text-gray-600">
          ({to.order_items.length} ürün)
        </span>
      </span>
      <OrderItem order_items={to.order_items} />
    </div>
  ));
};

export default TenantOrders;
