import { OrderCustomizableModalProvider } from "@/contexts/OrderCustomizableModal";
import { getUserOrders } from "./actions";
import NewOrderDesign from "./components/NewOrderDesign";

const OrdersPage = async () => {
  const { order } = await getUserOrders();

  return (
    <OrderCustomizableModalProvider>
      <NewOrderDesign order={order} />
    </OrderCustomizableModalProvider>
  );
};

export default OrdersPage;
