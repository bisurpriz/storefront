import PaymentOutline from "@/components/Icons/PaymentOutline";
import Customize from "@/components/Icons/Customize";
import StepCart from "@/components/Icons/StepCart";
import StepInfoOutline from "@/components/Icons/StepInfoOutline";
import StepYesOutlined from "@/components/Icons/StepYesOutlined";

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
    icon: <StepCart />,
  },
  {
    path: CartStepPaths.ORDER_DETAIL,
    label: "Teslimat Bilgileri",
    icon: <StepInfoOutline />,
  },
  {
    path: CartStepPaths.CHECKOUT,
    label: "Ödeme",
    icon: <PaymentOutline />,
  },
  {
    path: CartStepPaths.CUSTOMIZE,
    label: "Özelleştirme",
    icon: <Customize />,
  },
  {
    path: CartStepPaths.COMPLETE,
    label: "Onay",
    icon: <StepYesOutlined />,
  },
];

export const CUSTOMIZE_COUNTDOWN = 900;
