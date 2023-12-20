"use client";

import Stepper from "@/components/Stepper";
import { useEffect, useState } from "react";
import { cartStepperPaths } from "../../constants";
import { usePathname } from "next/navigation";

const CartSteps = () => {
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState(
    cartStepperPaths.findIndex((step) => step.path === pathname)
  );

  useEffect(() => {
    setActiveStep(cartStepperPaths.findIndex((step) => step.path === pathname));
  }, [pathname]);

  return (
    <div className="block text-3xl mb-3">
      <Stepper
        activeStep={activeStep}
        steps={cartStepperPaths.map((step, i) => ({
          ...step,
          value: i,
        }))}
        key={activeStep}
      />
    </div>
  );
};

export default CartSteps;
