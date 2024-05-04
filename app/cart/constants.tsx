import { FaCartPlus } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineConfirmationNumber, MdPayments } from "react-icons/md";

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
    icon: <FaCartPlus />,
  },
  {
    path: CartStepPaths.ORDER_DETAIL,
    label: "Teslimat Bilgileri",
    icon: <IoInformationCircle />,
  },
  {
    path: CartStepPaths.CHECKOUT,
    label: "Ödeme",
    icon: <MdPayments />,
  },
  {
    path: CartStepPaths.COMPLETE,
    label: "Onay",
    icon: <MdOutlineConfirmationNumber />,
  },
];
