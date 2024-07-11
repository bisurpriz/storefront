import { GetUserOrdersQuery } from "@/graphql/generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({
  order_items,
}: {
  order_items: GetUserOrdersQuery["order"][0]["tenant_orders"][0]["order_items"];
}) => {
  return (
    <div className="flex items-center justify-start gap-4 max-xs:flex-wrap max-xs:items-center max-xs:w-full">
      {order_items.map((oi) => (
        <div key={oi.id} className="py-2 capitalize">
          <Image
            src={getImageUrlFromPath(oi.product.image_url?.[0])}
            alt="image"
            className={`object-contain rounded-md aspect-square w-32 h-32 max-sm:h-24 max-sm:w-24 max-sm:self-center border px-0.5`}
            width={200}
            height={200}
          />
          <Link
            href={`/${oi?.product?.category?.slug}/${oi?.product?.slug}?pid=${oi.product_id}`}
            className="text-sm mt-1 block"
          >
            {oi.product.name}{" "}
            {oi.product.quantity > 1 ? `(${oi.product.quantity} adet)` : ""}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
