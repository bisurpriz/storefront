import { getUserOrders } from "./actions";
import TenantOrders from "./components/TenantOrders";
import { localeFormat } from "@/utils/format";
import { OrderCustomizableModalProvider } from "@/contexts/OrderCustomizableModal";

export const dynamic = "force-dynamic";

const OrdersPage = async () => {
  const {
    data: { order: orders },
  } = await getUserOrders();

  return (
    <OrderCustomizableModalProvider>
      <ul>
        {orders
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          ?.map((order) => {
            const totalProducts = order?.tenant_orders.reduce(
              (acc, to) => acc + to.order_items.length,
              0
            );
            return (
              <li className="py-4" key={order.id}>
                <div className="rounded-lg px-2 py-2 relative max-sm:px-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p aria-label="Sipariş Tarihi" className="text-sm">
                        {localeFormat(new Date(order?.created_at), "PPP")}
                      </p>

                      <p className="text-sm">
                        Toplam:{" "}
                        <span className="text-sm font-bold font-sans text-secondary whitespace-nowrap">
                          {order?.total_amount?.toFixed(2)} ₺
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-right">
                      Siparişinizde toplam{" "}
                      <span className="text-base font-bold font-sans text-secondary">
                        {totalProducts}
                      </span>{" "}
                      ürün bulunmaktadır.
                    </p>
                  </div>
                  <div className="h-px bg-2 my-3"></div>
                  <TenantOrders tenants={order.tenant_orders} order={order} />
                </div>
              </li>
            );
          })}
      </ul>
    </OrderCustomizableModalProvider>
  );
};

export default OrdersPage;
