import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import ReceiverForm from "../components/OrderDetail/ReceiverForm";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Detayı"),
    description: "Sipariş detayı sayfası",
  };
};

const OrderDetail = async () => {
  return (
    <div className="relative w-full">
      <section
        aria-labelledby="order-detail"
        aria-describedby="order-detail-description"
        aria-label="Sipariş Detayı"
      >
        <ReceiverForm />
      </section>
    </div>
  );
};

export default OrderDetail;
