"use client";

import { cartStepperPaths } from "@/app/cart/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from ".";
import toast from "react-hot-toast";

type CartStepContextType = {
  handleChangeStep: (pathname: string) => void;
};

const CartStepContext = createContext<CartStepContextType>({
  handleChangeStep: () => {},
});

export const CartStepProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const { push } = useRouter();
  const { cartItems } = useCart();

  const forward = (current: number) => {
    setStep((prev) => prev + 1);
    push(cartStepperPaths[current + 1].path);
  };

  const checkCustomAreas = () => {
    // map every item and check customizable area values
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
        area.customizable_area?.values &&
          console.log(Object.values(area.customizable_area?.values));
        return false;
      });
    });

    if (!isDone) {
      toast.error(
        "Lütfen tüm ürünlerin özelleştirilebilir alanlarını doldurun."
      );
      return;
    }

    forward(step);
  };

  const checkOrderDetail = () => {
    // Burada ki işlemler order detail sayfasında form submitte yapılıyor !
  };

  const checkoutCheck = () => {
    console.log("Ödeme işlemi kontrol ediliyor...");
    forward(step);
  };

  const checkComplete = () => {
    console.log("Sipariş tamamlandı...");
    forward(step);
  };

  const handleChangeStep = (pathname) => {
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
      case 3:
        checkComplete();
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
