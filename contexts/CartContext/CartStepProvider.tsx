"use client";

import { cartStepperPaths } from "@/app/cart/constants";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { useCart } from ".";
import toast from "react-hot-toast";

type CartStepContextType = {
  handleChangeStep: () => void;
};

const CartStepContext = createContext<CartStepContextType>({
  handleChangeStep: () => {},
});

export const CartStepProvider = ({ children }) => {
  const { replace } = useRouter();
  const {
    cartState: { cartItems },
  } = useCart();
  const pathname = usePathname();

  const forward = () => {
    const index = cartStepperPaths.findIndex((item) => item.path === pathname);
    if (index < cartStepperPaths.length - 1) {
      const nextPath = cartStepperPaths[index + 1].path;
      replace(nextPath);
      return;
    }

    return;
  };

  const checkCustomAreas = () => {
    const isDone = cartItems.every((item) => {
      return item.product_customizable_areas?.every((area) => {
        if (
          area.customizable_area?.values &&
          Object.values(area.customizable_area?.values)?.length ===
            area.count * item.quantity &&
          Object.values(area.customizable_area?.values)?.every(
            (value) => !!value && !!value.length
          )
        ) {
          return true;
        }

        return false;
      });
    });

    if (!isDone) {
      toast.error(
        "Lütfen tüm ürünlerin özelleştirilebilir alanlarını doldurun."
      );
      return;
    }

    forward();
  };

  const checkOrderDetail = () => {
    forward();
  };

  const checkoutCheck = () => {
    // forward();
  };

  const handleChangeStep = () => {
    const index = cartStepperPaths.findIndex((item) => item.path === pathname);
    switch (index) {
      case 0:
        checkCustomAreas();
        break;
      case 1:
        checkOrderDetail();
        break;
      case 2:
        checkoutCheck();
        break;
      default:
        break;
    }
  };

  const value = {
    handleChangeStep,
  };

  return (
    <CartStepContext.Provider value={value}>
      {children}
    </CartStepContext.Provider>
  );
};

export const useCartStep = () => useContext(CartStepContext);
