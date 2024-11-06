import { getUserOrders } from "./actions";
import TenantOrders from "./components/TenantOrders";
import { localeFormat } from "@/utils/format";
import { OrderCustomizableModalProvider } from "@/contexts/OrderCustomizableModal";
import GuncellenmisSiparislerimSayfasi from "./components/NewOrderDesign";

export const dynamic = "force-dynamic";

const OrdersPage = async () => {
  const { data } = await getUserOrders();

  return (
    <OrderCustomizableModalProvider>
      <GuncellenmisSiparislerimSayfasi orderData={data} />
    </OrderCustomizableModalProvider>
  );
};

export default OrdersPage;
