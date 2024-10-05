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
      <div className="relative gap-3 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-opacity hover:opacity-90">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="siparis-no">Sipariş No</label>
            <input
              value={orderNo ?? ""}
              onChange={(e) => setOrderNo(Number(e.target.value))}
              id="siparis-no"
              type="text"
              placeholder="Sipariş numarasını giriniz"
              className="p-3 border border-gray-300 rounded-md"
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
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-2">
          <div className="flex items-center justify-between mb-4">
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
                <li key={to.id} className="py-3 sm:py-4 w-fit">
                  <StatusBadge status={OrderItemStatus[to.status]} />
                  {to.order_items.map((oi) => (
                    <div className="flex items-center mt-2">
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                          {oi.product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
