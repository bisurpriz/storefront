import NotFound from "../not-found";
import { getOrderApproveImages } from "./actions";
import ImagePreview from "./components/ImagePreview";

const OrderApprove = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | number };
}) => {
  const orderItemId = Number(searchParams["oid"]);
  const salt = (searchParams["salt"] as string)?.replaceAll(" ", "+");

  const isSaltValidTimestamp = !isNaN(Date.parse(salt as string));

  if (!orderItemId || !salt || !isSaltValidTimestamp) {
    return <NotFound />;
  }

  const orderItem = await getOrderApproveImages({
    orderItemId,
    salt: salt as string,
  });

  const images = orderItem.images_to_approve;
  const isApproved = orderItem.is_images_approved;

  if (isApproved) {
    return <div>Bu sipariş zaten onaylanmış.</div>;
  }

  return (
    <ImagePreview
      initialImages={images}
      orderItemId={orderItemId}
      salt={salt}
    />
  );
};

export default OrderApprove;
