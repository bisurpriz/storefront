import { getUserOrders } from "./actions";
import Button from "@/components/Button";
import TenantOrders from "./components/TenantOrders";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Suspense } from "react";

const OrdersPage = async () => {
  const { orders } = await getUserOrders();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {orders?.map((order) => {
          const totalProducts = order?.tenant_orders.reduce(
            (acc, to) => acc + to.order_items.length,
            0
          );

          return (
            <li className='py-4' key={order.id}>
              <div className='rounded-lg px-2 py-2 relative max-sm:px-4'>
                <div className='flex justify-between'>
                  <div>
                    <p aria-label='Kampanya açıklaması' className='text-sm'>
                      {new Date(order?.created_at).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <p className='text-sm'>
                      Toplam:{" "}
                      <span className='text-sm font-bold font-sans text-primary'>
                        {order?.total_amount?.toFixed(2)} ₺
                      </span>
                    </p>
                  </div>

                  <div className='flex'>
                    <Button
                      type='button'
                      size='small'
                      color='primary'
                      className='xl:mt-0 xl:ml-3'
                      label='Detaylar'
                    />
                  </div>
                </div>

                <div className='h-px border my-3'></div>

                <TenantOrders tenants={order?.tenant_orders} />

                <p className='text-sm text-right'>
                  Siparişinizde toplam{" "}
                  <span className='text-base font-bold font-sans text-primary'>
                    {totalProducts}
                  </span>{" "}
                  ürün bulunmaktadır.
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Suspense>
  );
};

export default withPageAuthRequired(OrdersPage);
