import { OrderCustomizableModalProvider } from "@/contexts/OrderCustomizableModal";
import { getUserOrders } from "./actions";
import GuncellenmisSiparislerimSayfasi from "./components/NewOrderDesign";

const OrdersPage = async () => {
  const { data } = await getUserOrders();

  return (
    <OrderCustomizableModalProvider>
      <GuncellenmisSiparislerimSayfasi orderData={data} />
    </OrderCustomizableModalProvider>
  );
};

export default OrdersPage;
