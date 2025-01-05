import { Link } from "@/components/Link";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { getProductDetailUrl } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";

const OrderItem = ({
  order_items,
}: {
  order_items: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"];
}) => {
  const wasCustomized = order_items.some(
    (oi) =>
      oi?.order_item_special_images.length > 0 ||
      oi?.order_item_special_texts.length > 0,
  );

  return (
    <div className="flex items-center justify-start gap-4 max-sm:flex-col max-sm:items-start">
      {order_items.map((oi, order_index) => (
        <div key={oi?.id} className="w-full">
          <div className="py-2 capitalize">
            <div className="flex items-start justify-start gap-4 max-sm:flex-col">
              <div className="shrink-0">
                <Image
                  src={getImageUrlFromPath(oi?.product?.image_url?.[0])}
                  alt="image"
                  className="aspect-square h-32 w-32 rounded-md border object-contain px-0.5 max-sm:mx-auto"
                  width={200}
                  height={200}
                />
              </div>
              {wasCustomized ? (
                <div className="w-full">
                  <h3 className="mb-4 text-base text-slate-600 underline">
                    Özelleştirme{" "}
                    {oi?.order_item_special_texts.length > 0 ||
                    oi?.order_item_special_images.length > 0
                      ? "Detayları"
                      : ""}
                  </h3>
                  {(oi?.order_item_special_texts.length ||
                    oi?.order_item_special_images.length) && (
                    <ul className="mb-4 w-full">
                      {oi?.order_item_special_texts?.map((text, i) => (
                        <li
                          key={i}
                          className="my-1 flex items-center justify-start gap-2 text-xs text-slate-400 max-sm:flex-wrap"
                        >
                          <span className="rounded-md border border-slate-200 bg-slate-100 p-1">
                            {order_index + 1}. ürünün {i + 1}. özel metni:
                          </span>
                          {text.content}
                        </li>
                      ))}
                      {oi?.order_item_special_images.length > 0 && (
                        <li className="my-1 flex items-center justify-start gap-2 text-xs text-slate-400 max-sm:flex-col max-sm:items-start">
                          <span className="rounded-md border border-slate-200 bg-slate-100 p-1">
                            {order_index + 1}. ürünün özel görselleri:
                          </span>
                          <div className="scrollbar-hide my-2 flex items-center justify-start gap-4 overflow-x-auto">
                            {oi?.order_item_special_images.map((image, i) => (
                              <Image
                                key={i}
                                src={getImageUrlFromPath(image.image_url)}
                                alt="image"
                                className="h-16 w-16 rounded-lg object-contain max-sm:h-12 max-sm:w-12"
                                width={100}
                                height={100}
                              />
                            ))}
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
            <Link
              href={getProductDetailUrl(oi?.product?.slug!, oi?.product_id)}
              className="mt-2 block text-sm font-medium hover:underline"
            >
              {oi?.product?.name}{" "}
              {oi?.product?.quantity > 1
                ? `(${oi?.product?.quantity} adet)`
                : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
