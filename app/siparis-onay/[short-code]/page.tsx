import NotFound from "../../not-found";
import { getOrderApproveImages } from "../actions";
import ImagePreview from "../components/ImagePreview";

const OrderApprove = async ({
  params,
}: {
  params: Promise<{ "short-code": string }>;
}) => {
  const p = await params;
  const shortCode = p["short-code"];

  if (!shortCode) {
    return <NotFound />;
  }

  const orderItem = await getOrderApproveImages({
    shortCode,
  });

  if (!orderItem) {
    return <NotFound />;
  }

  const images = orderItem.order_item[0].images_to_approve;
  const isApproved = orderItem.order_item[0].is_images_approved;
  const expiryDate = orderItem.order_item[0].image_approve_expiry;

  if (expiryDate && new Date(expiryDate) < new Date()) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Onay Süresi Dolmuş
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Bu siparişin onay süresi sona ermiştir.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isApproved) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Sipariş Onaylanmış
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Bu sipariş için fotoğraflar zaten onaylanmıştır. Başka bir işlem
              yapmanıza gerek yoktur.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ImagePreview initialImages={images} shortCode={shortCode} />;
};

export default OrderApprove;
