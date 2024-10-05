import Promotions from "@/app/(feed)/[category-slug]/components/Detail/Promotions";
import { ProductForCart } from "@/common/types/Cart/cart";
import PriceTag from "@/components/PriceTag";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import { Link } from "@/components/Link";
import CartProductGroupListQuantityInput from "./CartProductGroupListQuantityInput";
import ProductGroupListItemInfo from "./ProductGroupListItemInfo";
import { DeliveryType } from "@/common/enums/Product/product";
import GiftCardNote from "./GiftCardNote";
import SevenOclock from "@/components/Icons/SevenOclock";
import Palette from "@/components/Icons/Palette";
import FreeTruck from "@/components/Icons/FreeTruck";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import { localeFormat } from "@/utils/format";
import Chip from "@/components/Chip";

const CartProductGroupListItem = (product: ProductForCart) => {
  const {
    id,
    name,
    price,
    quantity,
    product_customizable_areas: customize,
    image_url,
    discount_price,
    product_categories,
    is_service_free,
    delivery_type,
  } = product;

  const image = getImageUrlFromPath(image_url?.[0]);

  const specialTextCount = customize?.filter(
    (area) => area.customizable_area?.type === CustomizableAreaType.TEXT
  ).length;
  const specialImageCount = customize?.filter(
    (area) => area.customizable_area?.type === CustomizableAreaType.IMAGE
  ).length;

  const getEstimatedDeliveryDateText = () => {
    return `Tahmini teslimat tarihi: ${localeFormat(
      new Date(product.deliveryDate),
      "dd MMMM yyyy"
    )}${product.deliveryTime ? ` - ${product.deliveryTime}` : ""}`;
  };

  return (
    <li className="p-0 pt-4" key={id}>
      <div className="rounded-lg px-8 py-4 relative max-sm:px-4">
        <div className="flex items-start justify-start gap-8 mt-2 max-xl:gap-2 mb-4">
          <Image
            src={image}
            alt="image"
            className={`object-contain aspect-square w-32 h-32 max-sm:h-24 max-sm:w-24 max-sm:self-start`}
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-2">
            <Link
              className="text-base font-semibold text-gray-800 uppercase max-md:text-xs"
              href={`/${product_categories?.[0]?.category.slug}/${name}?pid=${id}`}
            >
              <h3 title={name}>{name}</h3>
            </Link>
            <div className="flex flex-col gap-2">
              <PriceTag price={price} discount={discount_price} />
              <CartProductGroupListQuantityInput id={id} quantity={quantity} />
            </div>
          </div>

          <ProductGroupListItemInfo customize={customize} id={id} />
        </div>
        <div className="flex gap-2 items-start flex-wrap mb-4">
          {delivery_type === "SAME_DAY" && product.deliveryDate && (
            <Chip
              rounded="low"
              label={getEstimatedDeliveryDateText()}
              size="small"
              color="primary"
              variant="soft"
              className="font-sans max-sm:w-full"
            />
          )}
          {(specialImageCount > 0 || specialTextCount > 0) && (
            <Chip
              rounded="semi"
              label={
                "Siparişi tamamladıktan sonra, tasarlanabilir alanları doldurabilirsiniz."
              }
              size="small"
              color="purple"
              variant="soft"
              className="font-sans whitespace-break-spaces"
            />
          )}
        </div>
        <Promotions
          promotions={[
            {
              description: "Tasarlanabilir",
              icon: <Palette />,
              filterKey: "CUSTOMIZABLE",
              show: customize?.length > 0,
              color: "secondary",
            },
            {
              description: DeliveryType.SAME_DAY,
              icon: <SevenOclock />,
              filterKey: "SAME_DAY",
              show:
                delivery_type === (DeliveryType.SAME_DAY as string) ||
                delivery_type === (DeliveryType.SAME_DAY_CARGO as string),
              color: "info",
            },
            {
              description: "Ücretsiz kargo",
              icon: <FreeTruck />,
              filterKey: "FREE_SHIPPING",
              show: is_service_free,
              color: "warning",
            },
          ]}
        />

        <GiftCardNote id={id} quantity={quantity} />
      </div>
    </li>
  );
};

export default CartProductGroupListItem;
