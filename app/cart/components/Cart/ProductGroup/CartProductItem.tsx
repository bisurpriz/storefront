import { useState } from "react";
import { Minus, Plus, X, Truck, Gift, TruckIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { ProductForCart } from "@/common/types/Cart/cart";
import NumberInput from "@/components/QuantityInput";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useCart } from "@/contexts/CartContext";
import PriceTagv2 from "@/components/PriceTag/PriceTagV2";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import { localeFormat } from "@/utils/format";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DeliveryType } from "@/common/enums/Product/product";
import GiftCardNote from "./GiftCardNote";

export default function CartItem({
  delivery_type,
  discount_price,
  id,
  image_url,
  is_service_free,
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
    (area) => area.customizable_area?.type === CustomizableAreaType.TEXT
  ).length;
  const specialImageCount = customize?.filter(
    (area) => area.customizable_area?.type === CustomizableAreaType.IMAGE
  ).length;

  const getEstimatedDeliveryDateText = () => {
    return `Tahmini teslimat tarihi: ${localeFormat(
      new Date(deliveryDate),
      "dd MMMM yyyy"
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
            className="w-32 h-32 max-sm:w-20 max-sm:h-20 object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex justify-between items-start w-full">
            <h2 className="w-full max-sm:text-base text-lg line-clamp-2 font-semibold text-gray-800">
              {name}
            </h2>
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

          <div className="mt-2 flex items-center justify-between pb-2 border-b w-full">
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

            <div className="w-fit self-end flex items-center gap-1 text-primary flex-nowrap text-sm font-bold leading-none text-gray-500">
              <span className="text-slate-500">{quantity} x</span>
              <span className="text-base">₺{discount_price.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center space-x-2 text-sm overflow-hidden overflow-x-auto w-full">
            {(specialImageCount > 0 || specialTextCount > 0) && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild className="whitespace-nowrap">
                  <span className="cursor-pointer select-none h-7 px-2 text-xs flex items-center bg-primary-foreground text-primary rounded-md">
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
                  <span className="cursor-pointer select-none h-7 px-2 text-xs flex items-center bg-primary-foreground text-primary rounded-md">
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
