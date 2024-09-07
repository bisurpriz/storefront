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
    const customizePath = pathname.split("/").slice(0, 3).join("/");
    setActiveStep(
      cartStepperPaths.findIndex((step) => step.path === customizePath)
    );
  }, [pathname]);

  return (
    <Stepper
      activeStep={activeStep}
      steps={cartStepperPaths.map((step, i) => ({
        ...step,
        value: i,
      }))}
      key={activeStep}
    />
  );
};

export default CartSteps;
