import { getOrderById } from "@/app/account/orders/actions";
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

  const hasNoCustomizableItems = tenant_orders.every((tenant_order) =>
    tenant_order.order_items.every(
      (order_item) => order_item.product.product_customizable_areas.length === 0
    )
  );

  if (hasNoCustomizableItems) {
    redirect(CartStepPaths.CART);
  }

  const wasCustomized = tenant_orders.every((tenant_order) =>
    tenant_order.order_items.every(
      (order_item) =>
        order_item.product.product_customizable_areas.length ===
          order_item.order_item_special_images.length ||
        order_item.product.product_customizable_areas.length ===
          order_item.order_item_special_texts.length
    )
  );

  if (wasCustomized) {
    redirect(CartStepPaths.COMPLETE);
  }

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
        <div className="flex flex-col gap-8">
          <CustomizePageCoutdown countdown={countdown} />
          {tenant_orders.map((tenant_order, index) => (
            <Customizer key={index} tenant_order={tenant_order} />
          ))}
        </div>
      )}
    </div>
  );
}
