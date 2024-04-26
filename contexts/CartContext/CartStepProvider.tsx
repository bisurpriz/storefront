// Create context for cart steps

import { createContext, useContext, useState } from "react";

type CartStepContextType = {
  step: number;
  setStep: (step: number) => void;
};

const CartStepContext = createContext<CartStepContextType>({
  step: 0,
  setStep: () => {},
});

export const CartStepProvider = ({ children }) => {
  const [step, setStep] = useState(0);

  const value = {
    step,
    setStep,
  };

  return (
    <CartStepContext.Provider value={value}>
      {children}
    </CartStepContext.Provider>
  );
};

export const useCartStep = () => useContext(CartStepContext);
