"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Package2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrderTrackingInformation } from "../actions";

interface TrackingDetailProps {
  initialOrderNo?: number;
}

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex min-h-[300px] items-center justify-center"
  >
    <div className="relative">
      <div className="w-16 h-16 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <Loader2 className="absolute w-8 h-8 text-blue-500 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
    </div>
  </motion.div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="p-8 overflow-hidden text-center shadow-lg rounded-xl"
  >
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-red-100 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
    </div>
    <h3 className="mb-3 text-xl font-semibold text-red-800">
      Sipariş Bulunamadı
    </h3>
    <p className="text-red-600">{message}</p>
  </motion.div>
);

const OrderDetails = ({
  order,
  orderNo,
}: {
  order: GetOrderForTrackingQuery["order"][0];
  orderNo: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="space-y-6"
  >
    <div className="overflow-hidden shadow-xl rounded-xl bg-gradient-to-br from-white to-gray-50">
      <div className="px-8 py-6 bg-white border-b">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Sipariş #{orderNo}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {new Date(order.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {order.tenant_orders.map((to) => (
        <div key={to.id} className="p-8">
          <div className="flex items-center justify-between px-4 py-3 mb-6 rounded-lg bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-900">
              {to.tenant?.tenants?.[0]?.name || "Satıcı"}
            </h3>
          </div>

          <div className="relative pt-4">
            <div className="absolute top-0 w-1 h-full rounded-full left-8 bg-gradient-to-b from-blue-200 to-blue-50"></div>
            {to.order_items.map((oi) => (
              <div
                key={oi.product.id}
                className="relative flex items-start gap-6 pl-20 mb-8"
              >
                <div className="absolute flex items-center justify-center w-20 h-20 p-2 overflow-hidden bg-white shadow-lg -left-2 rounded-xl">
                  {oi.product.image_url ? (
                    <Image
                      src={getImageUrlFromPath(oi.product.image_url[0])}
                      alt={oi.product.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <Package2 className="w-10 h-10 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 p-6 transition-all bg-white border shadow-md rounded-xl hover:shadow-lg">
                  <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center">
                    <h4 className="mb-2 text-lg font-medium text-gray-800">
                      {oi.product.name}
                    </h4>
                    <StatusBadge
                      status={OrderItemStatus[to.status || "Processing"]}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="px-3 py-1 rounded-full bg-blue-50">
                      Miktar: {oi.quantity} Adet
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const TrackingDetail = ({ initialOrderNo }: TrackingDetailProps) => {
  const [orderNo, setOrderNo] = useState<number | null>(initialOrderNo ?? null);
  const [order, setOrder] = useState<
    GetOrderForTrackingQuery["order"][0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getOrderTrackingInformation({ orderNo });
      if (!response?.order?.length) {
        setError("Girdiğiniz sipariş numarasına ait bir sipariş bulunamadı.");
        setOrder(null);
        return;
      }

      setOrder(response.order[0]);
    } catch (error) {
      console.error("Sipariş bilgisi alınamadı:", error);
      setError(
        "Sipariş bilgisi alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      );
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNo) {
      onSubmit();
    }
  }, [initialOrderNo]);

  const handleOrderNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      setOrderNo(Number(value));
    }
  };

  return (
    <div className="w-full max-w-4xl p-4 mx-auto mb-16 space-y-8 max-sm:p-2 md:mb-0">
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800">Sipariş Takip</h1>
        {!initialOrderNo && (
          <p className="text-gray-600">
            Siparişinizin durumunu öğrenmek için sipariş numaranızı giriniz
          </p>
        )}
      </div>

      {!initialOrderNo && (
        <div className="p-6 overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="relative flex flex-col items-center gap-3 md:flex-row">
            <div className="relative flex-1 w-full md:basis-1/2">
              <input
                value={orderNo?.toString() ?? ""}
                onChange={handleOrderNo}
                type="text"
                placeholder="Sipariş numaranızı giriniz"
                className="w-full px-5 py-4 pl-12 text-lg transition-all border-2 border-gray-200 rounded-xl bg-gray-50 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
            </div>
            <Button
              disabled={!orderNo || isLoading}
              onClick={onSubmit}
              className="w-full text-base font-medium transition-all bg-blue-600 shadow-lg h-14 rounded-xl hover:bg-blue-700 hover:shadow-blue-200 disabled:opacity-50 md:basis-1/2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Aranıyor...
                </span>
              ) : (
                "Sorgula"
              )}
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : order ? (
          <OrderDetails order={order} orderNo={orderNo} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default TrackingDetail;
