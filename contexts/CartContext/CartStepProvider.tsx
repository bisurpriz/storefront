"use client";

import { cartStepperPaths } from "@/app/cart/constants";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from ".";

type CartStepContextType = {
  handleChangeStep: (pathname: string) => void;
};

const CartStepContext = createContext<CartStepContextType>({
  handleChangeStep: () => {},
});

export const CartStepProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const { replace } = useRouter();

  const forward = (current: number) => {
    setStep((prev) => prev + 1);
    replace(cartStepperPaths[current + 1].path);
  };

  const checkCustomAreas = () => {
    console.log("Özelleştirme alanları kontrol ediliyor...");
    forward(step);
  };

  const checkOrderDetail = () => {
    console.log("Sipariş detayları kontrol ediliyor...");
    forward(step);
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
    console.log(index);
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
