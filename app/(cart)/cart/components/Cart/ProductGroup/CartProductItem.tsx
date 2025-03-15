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
import { getImageUrlFromPath, getProductDetailUrl } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { Gift, Truck, TruckIcon, X } from "lucide-react";
import Image from "next/image";
import { GiftCardNote } from "./GiftCardNote";

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
  description,
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
    const formattedDate = localeFormat(new Date(deliveryDate), "dd MMMM yyyy");
    const timeText = deliveryTime ? ` - ${deliveryTime}` : "";
    return `Planlanan teslimat: ${formattedDate}${timeText}`;
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
            className="object-cover w-32 h-32 rounded-md max-sm:h-20 max-sm:w-20"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex items-start justify-between w-full">
            <Link href={getProductDetailUrl(slug, id)}>
              <h2 className="w-full text-lg font-semibold text-gray-800 line-clamp-2 max-sm:text-base">
                {name}
              </h2>
            </Link>

            <button
              className="text-gray-400 hover:text-gray-600"
              aria-label="Ürünü sepetten kaldır"
            >
              <X
                size={20}
                onClick={() => {
                  if (loading) return;
                  removeFromCart(id);
                }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between w-full pb-2 mt-2 border-b">
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

            <div className="flex items-center self-end gap-1 text-lg font-bold leading-none text-gray-500 w-fit flex-nowrap text-primary">
              ₺{price.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center w-full mt-2 space-x-2 overflow-hidden overflow-x-auto text-sm">
            {(specialImageCount > 0 || specialTextCount > 0) && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className="whitespace-nowrap">
                  <span className="flex items-center px-2 text-xs rounded-md cursor-pointer select-none h-7 bg-primary-foreground text-primary">
                    <Gift size={14} className="mr-1" />
                    Kişiselleştirilebilir Ürün
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Siparişinizi onayladıktan sonra ürün özelleştirme
                    seçeneklerine erişebilirsiniz.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {is_service_free && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className="whitespace-nowrap">
                  <span className="flex items-center px-2 text-xs rounded-md cursor-pointer select-none h-7 bg-primary-foreground text-primary">
                    <TruckIcon size={14} className="mr-1" />
                    Ücretsiz Kargo
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bu ürün için kargo bedeli tarafımızca karşılanacaktır.</p>
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
        {Array.from({ length: quantity }).map((_, index) => {
          // data = [note1][note2][note3]
          const notes = card_note?.match(/\[.*?\]/g);
          const noteText =
            notes?.[index]?.replaceAll("[", "").replaceAll("]", "") || "";

          return (
            <GiftCardNote
              key={index}
              id={id}
              product_description={description}
              product_name={name}
              card_note={noteText}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
