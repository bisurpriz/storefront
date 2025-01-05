import { CustomizableAreaType } from "@/common/enums/Order/product";
import { DeliveryType } from "@/common/enums/Product/product";
import { ProductForCart } from "@/common/types/Cart/cart";
import { Link } from "@/components/Link";
import NumberInput from "@/components/QuantityInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/contexts/CartContext";
import { getProductDetailUrl } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { Gift, Truck, TruckIcon, X } from "lucide-react";
import Image from "next/image";
import GiftCardNote from "./GiftCardNote";

export default function CartItem({
  delivery_type,
  discount_price,
  id,
  image_url,
  is_service_free,
  slug,
  name,
  price,
  product_categories,
  product_customizable_areas: customize,
  quantity,
  tenant,
  card_note,
  deliveryDate,
  deliveryLocation,
  deliveryTime,
}: ProductForCart) {
  const {
    loading,
    addToCart,
    cartState: { cartItems },
    removeFromCart,
  } = useCart();

  const specialTextCount = customize?.filter(
    (area) => area.customizable_area?.type === CustomizableAreaType.TEXT,
  ).length;

  const specialImageCount = customize?.filter(
    (area) => area.customizable_area?.type === CustomizableAreaType.IMAGE,
  ).length;

  const getEstimatedDeliveryDateText = () => {
    return `Tahmini teslimat tarihi: ${localeFormat(
      new Date(deliveryDate),
      "dd MMMM yyyy",
    )}${deliveryTime ? ` - ${deliveryTime}` : ""}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-start space-x-4 max-sm:space-x-2">
        <div className="flex-shrink-0">
          <Image
            src={getImageUrlFromPath(image_url[0])}
            alt={name}
            width={120}
            height={120}
            className="h-32 w-32 rounded-md object-cover max-sm:h-20 max-sm:w-20"
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-start justify-between">
            <Link href={getProductDetailUrl(slug!, id)}>
              <h2 className="line-clamp-2 w-full text-lg font-semibold text-gray-800 max-sm:text-base">
                {name}
              </h2>
            </Link>

            <button className="text-gray-400 hover:text-gray-600">
              <X
                size={20}
                onClick={() => {
                  if (loading) return;
                  removeFromCart(id);
                }}
              />
            </button>
          </div>

          <div className="mt-2 flex w-full items-center justify-between border-b pb-2">
            <NumberInput
              defaultValue={quantity}
              onChange={(quantity) => {
                const item = cartItems.find((item) => item.id === id);
                if (item) {
                  addToCart({
                    id: item.id,
                    type: "updateq",
                    quantity,
                    deliveryLocation: item.deliveryLocation,
                  });
                }
              }}
            />

            <div className="flex w-fit flex-nowrap items-center gap-1 self-end text-sm font-bold leading-none text-gray-500 text-primary">
              <span className="text-slate-500">{quantity} x</span>
              <span className="text-base">₺{price.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-2 flex w-full items-center space-x-2 overflow-hidden overflow-x-auto text-sm">
            {(specialImageCount > 0 || specialTextCount > 0) && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className="whitespace-nowrap">
                  <span className="flex h-7 cursor-pointer select-none items-center rounded-md bg-primary-foreground px-2 text-xs text-primary">
                    <Gift size={14} className="mr-1" />
                    Tasarlanabilir
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Siparişi tamamladıktan sonra, tasarlanabilir alanları
                    doldurabilirsiniz.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {is_service_free && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className="whitespace-nowrap">
                  <span className="flex h-7 cursor-pointer select-none items-center rounded-md bg-primary-foreground px-2 text-xs text-primary">
                    <TruckIcon size={14} className="mr-1" />
                    Ücretsiz Gönderim
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bu ürün ücretsiz olarak gönderilecektir.</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {delivery_type && deliveryDate && (
          <Alert variant="informative">
            <Truck size={16} className="mr-2" />
            <AlertTitle>{getEstimatedDeliveryDateText()}</AlertTitle>
            <AlertDescription>{DeliveryType[delivery_type]}</AlertDescription>
          </Alert>
        )}
        <GiftCardNote id={id} quantity={quantity} />
      </div>
    </div>
  );
}
