"use client";

import { OrderItemStatus } from "@/common/enums/Order/product";
import { Link } from "@/components/Link";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";
import { getImageUrlFromPath, getTenantUrl } from "@/lib/utils";
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
    className="flex items-center justify-center py-12"
  >
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </motion.div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="rounded-xl bg-red-50 p-6 text-center"
  >
    <div className="mb-4 flex justify-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
    </div>
    <h3 className="mb-2 text-lg font-medium text-red-800">
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
    transition={{ duration: 0.1, ease: "easeInOut" }}
    className="space-y-6"
  >
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Sipariş #{orderNo}
        </h2>
        <p className="text-sm text-gray-500">
          Oluşturulma: {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      {order.tenant_orders.map((to) => (
        <div key={to.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">
              {to.tenant?.tenants?.[0]?.name || "Satıcı"}
            </h3>
          </div>

          <div className="relative mb-8 pt-4">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 max-sm:left-4"></div>
            {to.order_items.map((oi) => (
              <div
                key={oi.product.id}
                className="relative mb-6 flex items-start gap-4 pl-16 max-sm:pl-12"
              >
                <div className="absolute -left-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-blue-50 sm:h-16 sm:w-16">
                  {oi.product.image_url ? (
                    <Image
                      src={getImageUrlFromPath(oi.product.image_url[0])}
                      alt={oi.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package2 className="h-6 w-6 text-blue-500 sm:h-8 sm:w-8" />
                  )}
                </div>
                <div className="flex-1 rounded-lg border bg-white p-3 shadow-sm sm:p-4">
                  <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-4">
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-gray-800 sm:text-base">
                        {oi.product.name}
                      </h4>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        <span>Satıcı:</span>{" "}
                        <Link
                          href={getTenantUrl(
                            to.tenant?.tenants?.[0]?.name,
                            to.tenant?.tenants?.[0]?.id,
                          )}
                          className="text-blue-500 hover:underline"
                        >
                          {to.tenant?.tenants?.[0]?.name || ""}
                        </Link>
                      </div>
                    </div>
                    <StatusBadge
                      status={OrderItemStatus[oi.status || "Processing"]}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
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
      console.log(response);
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

  return (
    <div className="mx-auto max-w-4xl p-4 max-sm:p-0">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Sipariş Takip</h1>
        {!initialOrderNo && (
          <p className="text-gray-600">
            Siparişinizin durumunu öğrenmek için sipariş numaranızı giriniz
          </p>
        )}
      </div>

      {!initialOrderNo && (
        <div className="relative mb-8 overflow-hidden rounded-xl bg-white p-6 shadow-lg">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={orderNo?.toString() ?? ""}
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
