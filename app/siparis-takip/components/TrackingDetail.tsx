"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";
import { AnimatePresence, motion } from "framer-motion";
import { Package2, Search } from "lucide-react";
import { useState } from "react";
import { getOrderTrackingInformation } from "../actions";

const TrackingDetail = () => {
  const [orderNo, setOrderNo] = useState<number | null>(null);
  const [order, setOrder] = useState<
    GetOrderForTrackingQuery["order"][0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await getOrderTrackingInformation({ orderNo });
      setOrder(response);
    } catch (error) {
      console.error("Sipariş bilgisi alınamadı:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Sipariş Takip</h1>
        <p className="text-gray-600">
          Siparişinizin durumunu öğrenmek için sipariş numaranızı giriniz
        </p>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-xl bg-white p-6 shadow-lg">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={orderNo ?? ""}
              onChange={(e) => setOrderNo(Number(e.target.value))}
              type="text"
              placeholder="Sipariş numaranızı giriniz"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pl-12 text-lg transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            disabled={!orderNo || isLoading}
            onClick={onSubmit}
            className="h-12 min-w-[120px] bg-blue-600 text-base hover:bg-blue-700"
          >
            {isLoading ? "Aranıyor..." : "Sorgula"}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Sipariş #{orderNo}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Oluşturulma:{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge
                  status={
                    OrderItemStatus[order.tenant_orders[0]?.status] ||
                    OrderItemStatus.Processing
                  }
                />
              </div>

              {order.tenant_orders.map((to) => (
                <div key={to.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      Sipariş Detayları
                    </h3>
                  </div>

                  <div className="relative mb-8 pt-4">
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>
                    {to.order_items.map((oi, index) => (
                      <div
                        key={oi.product.id}
                        className="relative mb-6 flex items-start gap-4 pl-12"
                      >
                        <div className="absolute -left-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                          <Package2 className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="flex-1 rounded-lg border bg-white p-4 shadow-sm">
                          <h4 className="mb-1 font-medium text-gray-800">
                            {oi.product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Miktar: {oi.quantity} Adet
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackingDetail;
