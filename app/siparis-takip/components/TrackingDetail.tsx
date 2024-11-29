"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getOrderTrackingInformation } from "../actions";
import StatusBadge from "@/components/StatusBadge";
import { OrderItemStatus } from "@/common/enums/Order/product";
import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";

const TrackingDetail = () => {
  const [orderNo, setOrderNo] = useState<number | null>(null);
  const [order, setOrder] = useState<
    GetOrderForTrackingQuery["order"][0] | null
  >(null);

  const onSubmit = async () => {
    const response = await getOrderTrackingInformation({ orderNo });
    setOrder(response);
  };

  return (
    <div>
      <div className="relative flex h-full w-full cursor-pointer flex-col gap-3 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="siparis-no">Sipariş No</label>
            <input
              value={orderNo ?? ""}
              onChange={(e) => setOrderNo(Number(e.target.value))}
              id="siparis-no"
              type="text"
              placeholder="Sipariş numarasını giriniz"
              className="rounded-md border border-gray-300 p-3"
            />
          </div>
          <Button
            disabled={!orderNo}
            className="justify-center"
            onClick={onSubmit}
          >
            Sipariş Detayını Getir
          </Button>
        </div>
      </div>

      {order && (
        <div className="mt-2 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold leading-none text-gray-900">
              Oluşturulma Tarihi: {new Date(order.created_at).toDateString()}
            </h3>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {order.tenant_orders.map((to) => (
                <li key={to.id} className="w-fit py-3 sm:py-4">
                  <StatusBadge status={OrderItemStatus[to.status]} />
                  {to.order_items.map((oi) => (
                    <div className="mt-2 flex items-center">
                      <div className="ms-4 min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {oi.product.name}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {oi.quantity} Adet
                        </p>
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingDetail;
