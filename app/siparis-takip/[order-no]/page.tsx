import { notFound } from "next/navigation";
import TrackingDetail from "../components/TrackingDetail";

interface Props {
  params: Promise<{
    "order-no": string;
  }>;
}

const OrderTrackingDetail = async ({ params }: Props) => {
  const p = await params;
  const orderNo = parseInt(p["order-no"], 10);

  if (isNaN(orderNo)) {
    notFound();
  }

  return <TrackingDetail initialOrderNo={orderNo} />;
};

export default OrderTrackingDetail;
