import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({
  order_items,
}: {
  order_items: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"];
}) => {
  const wasCustomized = order_items.some(
    (oi) =>
      oi.order_item_special_images.length > 0 ||
      oi.order_item_special_texts.length > 0
  );

  return (
    <div className="flex items-center justify-start gap-4 max-xs:flex-wrap max-xs:items-center max-xs:w-full">
      {order_items.map((oi, order_index) => (
        <div key={oi.id}>
          <div className="py-2 capitalize ">
            <div className="flex items-start justify-start gap-4">
              <Image
                src={getImageUrlFromPath(oi.product.image_url?.[0])}
                alt="image"
                className={`object-contain rounded-md aspect-square w-32 h-32 max-sm:h-24 max-sm:w-24 max-sm:self-center border px-0.5`}
                width={200}
                height={200}
              />
              {wasCustomized ? (
                <div>
                  <h3 className="text-base text-slate-600 underline mb-4">
                    Özelleştirme{" "}
                    {oi.order_item_special_texts.length > 0 ||
                    oi.order_item_special_images.length > 0
                      ? "Detayları"
                      : ""}
                  </h3>
                  {(oi.order_item_special_texts.length ||
                    oi.order_item_special_images.length) && (
                    <ul className="flex-1 max-2xl:w-full min-w-[300px] mb-4">
                      {oi.order_item_special_texts?.map((text, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-center justify-start gap-2 my-1"
                        >
                          <span className="p-1 bg-slate-100 rounded-md border border-slate-200">
                            {order_index + 1}. ürünün {i + 1}. özel metni:
                          </span>
                          {text.content}
                        </li>
                      ))}
                      {oi.order_item_special_images.length > 0 && (
                        <li className="text-xs text-slate-400 flex items-center justify-start gap-2 my-1 max-md:flex-col max-md:items-start max-md:justify-center">
                          <span className="p-1 bg-slate-100 rounded-md border border-slate-200 my-1">
                            {order_index + 1}. ürünün özel görselleri:
                          </span>
                          <div className="flex items-center justify-start gap-4 my-2 overflow-hidden overflow-x-auto">
                            {oi.order_item_special_images.map((image, i) => (
                              <Image
                                key={i}
                                src={getImageUrlFromPath(image.image_url)}
                                alt="image"
                                className="object-contain w-10 h-10 rounded-lg my-2"
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
              href={`/${oi?.product?.product_categories[0].category?.slug}/${oi?.product?.slug}?pid=${oi.product_id}`}
              className="text-sm mt-1 block"
            >
              {oi.product.name}{" "}
              {oi.product.quantity > 1 ? `(${oi.product.quantity} adet)` : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
