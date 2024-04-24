import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import ReceiverForm from "../components/OrderDetail/ReceiverForm";
import { getCities } from "@/app/account/actions";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Detayı"),
    description: "Sipariş detayı sayfası",
  };
};

const OrderDetail = async () => {
  const { cities } = await getCities();

  return (
    <div className="w-full relative">
      <section
        aria-labelledby="order-detail"
        aria-describedby="order-detail-description"
        aria-label="Sipariş Detayı"
      >
        <ReceiverForm cities={cities} />
      </section>
    </div>
  );
};

export default OrderDetail;
