"use client";

import Stepper from "@/components/Stepper";
import { useCart } from "@/contexts/CartContext";
import { Gem } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { CartStepPaths, cartStepperPaths } from "../../constants";

const customize = {
  path: CartStepPaths.CUSTOMIZE,
  label: "Özelleştirme",
  icon: <Gem />,
};

const CartSteps = () => {
  const pathname = usePathname();
  const { hasCustomizableProduct } = useCart();

  const { steps, activeStep } = useMemo(() => {
    let currentSteps = [...cartStepperPaths];

    if (hasCustomizableProduct) {
      if (!currentSteps.find((step) => step.path === CartStepPaths.CUSTOMIZE)) {
        currentSteps.splice(currentSteps.length - 1, 0, customize);
      }
    } else {
      currentSteps = currentSteps.filter(
        (step) => step.path !== CartStepPaths.CUSTOMIZE,
      );
    }

    const customizePath = pathname.split("/").slice(0, 3).join("/");
    const currentActiveStep = currentSteps.findIndex(
      (step) => step.path === customizePath,
    );

    return {
      steps: currentSteps,
      activeStep: currentActiveStep,
    };
  }, [pathname, hasCustomizableProduct]);

  return (
    <Stepper
      activeStep={activeStep}
      steps={steps.map((step, i) => ({
        ...step,
        value: i,
      }))}
      key={activeStep}
    />
  );
};

export default CartSteps;
