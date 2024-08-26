import Promotions from "@/app/(feed)/[category-slug]/components/Detail/Promotions";
import { ProductForCart } from "@/common/types/Cart/cart";
import PriceTag from "@/components/PriceTag";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import CartProductGroupListQuantityInput from "./CartProductGroupListQuantityInput";
import ProductGroupListItemInfo from "./ProductGroupListItemInfo";
import { DesignPalette } from "@/components/Icons/DesignPalette";
import { DeliveryType } from "@/common/enums/Product/product";
import Alarm from "@/components/Icons/Alarm";
import FreeCargo from "@/components/Icons/FreeCargo";

const CartProductGroupListItem = (product: ProductForCart) => {
  const {
    id,
    name,
    price,
    quantity,
    product_customizable_areas: customize,
    image_url,
    discount_price,
    category,
    is_service_free,
    delivery_type,
  } = product;

  const image = getImageUrlFromPath(image_url?.[0]);

  return (
    <li className="py-4" key={id}>
      <div className="rounded-lg px-8 py-4 relative max-sm:px-4">
        <div className="flex items-start justify-start gap-8 mt-2 max-xl:gap-2 max-xs:flex-col mb-4">
          <Image
            src={image}
            alt="image"
            className={`object-contain aspect-square w-32 h-32 max-sm:h-24 max-sm:w-24 max-sm:self-start`}
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-4">
            <Link
              className="text-base font-semibold text-gray-800 uppercase max-md:text-xs"
              href={`/${category.slug}/${name}?pid=${id}`}
            >
              <h3 title={name}>{name}</h3>
            </Link>
            <div className="flex flex-col gap-4">
              <PriceTag price={price} discount={discount_price} />
              <CartProductGroupListQuantityInput id={id} quantity={quantity} />
            </div>
          </div>

          <ProductGroupListItemInfo customize={customize} id={id} />
        </div>
        <Promotions
          promotions={[
            {
              description: "Tasarlanabilir",
              icon: <DesignPalette />,
              filterKey: "CUSTOMIZABLE",
              show: customize?.length > 0,
            },
            {
              description: DeliveryType.SAME_DAY,
              icon: <Alarm />,
              filterKey: "SAME_DAY",
              show:
                delivery_type === (DeliveryType.SAME_DAY as string) ||
                delivery_type === (DeliveryType.SAME_DAY_CARGO as string),
            },
            {
              description: "Ücretsiz kargo",
              icon: <FreeCargo />,
              filterKey: "FREE_SHIPPING",
              show: is_service_free,
            },
          ]}
        />
      </div>
    </li>
  );
};

export default CartProductGroupListItem;
