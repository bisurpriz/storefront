import CartPlus from "@/components/Icons/CartPlus";
import InformationCircleFill from "@/components/Icons/InformationCircleFill";
import PaymentOutline from "@/components/Icons/PaymentOutline";
import Confirm from "@/components/Icons/Confirm";

export enum CartStepPaths {
  CART = "/cart",
  ORDER_DETAIL = "/cart/order-detail",
  CHECKOUT = "/cart/checkout",
  COMPLETE = "/cart/complete",
}

export const cartStepperPaths = [
  {
    path: CartStepPaths.CART,
    label: "Sepet",
    icon: <CartPlus />,
  },
  {
    path: CartStepPaths.ORDER_DETAIL,
    label: "Teslimat Bilgileri",
    icon: <InformationCircleFill />,
  },
  {
    path: CartStepPaths.CHECKOUT,
    label: "Ödeme",
    icon: <PaymentOutline />,
  },
  {
    path: CartStepPaths.COMPLETE,
    label: "Onay",
    icon: <Confirm />,
  },
];
