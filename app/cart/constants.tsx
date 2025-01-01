import { Banknote, Check, Info, ShoppingBasket } from "lucide-react";

export enum CartStepPaths {
  CART = "/cart",
  ORDER_DETAIL = "/cart/order-detail",
  CHECKOUT = "/cart/checkout",
  CUSTOMIZE = "/cart/customize",
  COMPLETE = "/cart/complete",
}

export const cartStepperPaths = [
  {
    path: CartStepPaths.CART,
    label: "Sepet",
    icon: <ShoppingBasket />,
  },
  {
    path: CartStepPaths.ORDER_DETAIL,
    label: "Teslimat Bilgileri",
    icon: <Info />,
  },
  {
    path: CartStepPaths.CHECKOUT,
    label: "Ödeme",
    icon: <Banknote />,
  },

  {
    path: CartStepPaths.COMPLETE,
    label: "Onay",
    icon: <Check />,
  },
];

export const CUSTOMIZE_COUNTDOWN = 900;
