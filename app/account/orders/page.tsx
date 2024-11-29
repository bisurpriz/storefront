import { OrderCustomizableModalProvider } from "@/contexts/OrderCustomizableModal";
import { getUserOrders } from "./actions";
import GuncellenmisSiparislerimSayfasi from "./components/NewOrderDesign";

const OrdersPage = async () => {
  const { order } = await getUserOrders();

  return (
    <OrderCustomizableModalProvider>
      <GuncellenmisSiparislerimSayfasi order={order} />
    </OrderCustomizableModalProvider>
  );
};

export default OrdersPage;
