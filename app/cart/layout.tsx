"use client";

import React, { useEffect, useState } from "react";
import CartSummary from "./components/Cart/CartSummary";
import { usePathname } from "next/navigation";
import Stepper from "@/components/Stepper";
import { cartStepperPaths } from "./constants";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [activeStep, setActiveStep] = useState(
    cartStepperPaths.findIndex((step) => step.path === pathname)
  );

  useEffect(() => {
    setActiveStep(cartStepperPaths.findIndex((step) => step.path === pathname));
  }, [pathname]);

  return (
    <div>
      <span className="block text-3xl mb-3">
        <Stepper
          activeStep={activeStep}
          steps={cartStepperPaths.map((step, i) => ({
            ...step,
            value: i,
          }))}
          key={activeStep}
        />
      </span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 md:col-span-2 flex flex-col gap-3">
          {children}
        </div>
        <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
