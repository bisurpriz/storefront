import { getOrderById, getUserOrders } from "@/app/account/orders/actions";
import CustomizePageCoutdown from "../components/CustomizePageCoutdown";
import Customizer from "../components/Customizer";
import Chip from "@/components/Chip";
import { redirect } from "next/navigation";
import { CartStepPaths } from "../../constants";

export const dynamic = "force-dynamic";

export default async function CartCustomizePage({ params: { oId } }) {
  if (!oId) return null;
  const {
    data: {
      order_by_pk: { created_at, tenant_orders },
    },
  } = await getOrderById(oId);

  const isExpired =
    new Date(created_at).getTime() + 3 * 60 * 60 * 1000 < new Date().getTime();

  const countdown = isExpired
    ? 0
    : Math.floor(
        (new Date(created_at).getTime() +
          3 * 60 * 60 * 1000 -
          new Date().getTime()) /
          1000
      );

  if (
    !tenant_orders.some((to) =>
      to.order_items.some(
        (oi) => oi.product.product_customizable_areas.length > 0
      )
    )
  ) {
    return redirect(CartStepPaths.CART);
  }

  return (
    <div className="pb-12">
      {isExpired ? (
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold">Özelleştirme Süresi Doldu</h1>
          <p className="text-slate-500 text-sm">
            Özelleştirme süresi dolduğu için siparişinizi tamamlayamıyoruz.
          </p>
        </div>
      ) : (
        <>
          <CustomizePageCoutdown countdown={countdown} />
          {tenant_orders.map((tenant_order, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-4 relative rounded-lg ring ring-2 p-4"
              >
                <div className="absolute left-0 top-0 -translate-y-1/2 translate-x-1/3">
                  <Chip
                    label={tenant_order.tenant.tenants[0].name}
                    variant="filled"
                    color="primary"
                  />
                </div>
                <Customizer key={index} tenant_order={tenant_order} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
