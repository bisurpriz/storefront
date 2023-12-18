"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "./actions";
import Image from "next/image";
import Button from "@/components/Button";
import { OrderResponse } from "@/common/types/Order/order";
import { IMAGE_URL } from "@/contants/urls";
import StatusBadge from "./components/statusBadge";
import { OrderItemStatus } from "@/common/enums/Order/product";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const getAllOrders = async () => {
    const response = await getUserOrders();
    setOrders(response?.orders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <ul>
      {orders?.map((order) => {
        const isAllDelivered = order?.tenant_orders.every(
          (to) => to.order_status.value === OrderItemStatus.Delivered
        );
        const totalProducts = order?.tenant_orders.reduce(
          (acc, to) => acc + to.order_items.length,
          0
        );

        return (
          <li className="py-4" key={order.id}>
            <div className="rounded-lg px-8 py-4 border relative max-sm:px-4">
              <div className="flex justify-between">
                <div>
                  <p aria-label="Kampanya açıklaması" className="text-sm">
                    {new Date(order?.created_at).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-sm">
                    Toplam:{" "}
                    <span className="text-sm font-bold font-sans text-primary">
                      {order?.total_amount?.toFixed(2)} ₺
                    </span>
                  </p>
                </div>

                <Button
                  type="button"
                  size="small"
                  color="primary"
                  className="xl:mt-0 xl:ml-3"
                  label="Detaylar"
                />
              </div>

              <div className="h-px border my-3"></div>

              <StatusBadge
                status={
                  isAllDelivered
                    ? OrderItemStatus.Delivered
                    : OrderItemStatus.Processing
                }
              />

              <div className="grid grid-cols-4 gap-4 my-3">
                {order?.tenant_orders.map((to) => {
                  return to.order_items.map((oi) => {
                    return (
                      <Link
                        key={oi.id}
                        href={`/${oi?.product?.category?.slug}/${oi?.product?.slug}?pid=${oi.product_id}`}
                      >
                        <Image
                          src={`${IMAGE_URL}/${oi.product.image_url[0]}`}
                          alt="image"
                          className={`object-contain aspect-square w-48 h-48 max-sm:h-32 max-sm:w-32 max-sm:self-center border px-0.5`}
                          width={200}
                          height={200}
                          loading="lazy"
                        />
                      </Link>
                    );
                  });
                })}
              </div>

              <p className="text-ms">
                Toplam <span className="font-bold">{totalProducts}</span> ürün
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default OrdersPage;
