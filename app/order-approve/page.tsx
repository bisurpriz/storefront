import NotFound from "../not-found";
import { getOrderApproveImages } from "./actions";
import ImagePreview from "./components/ImagePreview";

const OrderApprove = async (props: {
  searchParams: Promise<{ [key: string]: string | number }>;
}) => {
  const searchParams = await props.searchParams;
  const orderItemId = Number(searchParams["oid"]);
  const date = (searchParams["date"] as string)?.replaceAll(" ", "+");
  const salt = searchParams["salt"];

  const isSaltValidTimestamp = !isNaN(Date.parse(date as string));

  if (!orderItemId || !date || !isSaltValidTimestamp) {
    return <NotFound />;
  }

  const orderItem = await getOrderApproveImages({
    token: salt as string,
  });

  const images = orderItem.images_to_approve;
  const isApproved = orderItem.is_images_approved;
  const expiryDate = orderItem.image_approve_expiry;

  if (expiryDate && new Date(expiryDate) < new Date()) {
    return <div>Onay süresi dolmuş.</div>;
  }

  if (isApproved) {
    return <div>Bu sipariş zaten onaylanmış.</div>;
  }

  return <ImagePreview initialImages={images} salt={salt as string} />;
};

export default OrderApprove;
