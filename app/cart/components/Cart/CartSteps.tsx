"use client";

import Stepper from "@/components/Stepper";
import { useCart } from "@/contexts/CartContext";
import { Gem } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartStepPaths, cartStepperPaths } from "../../constants";

const customize = {
  path: CartStepPaths.CUSTOMIZE,
  label: "Özelleştirme",
  icon: <Gem />,
};

const CartSteps = () => {
  const pathname = usePathname();
  const [steps, setSteps] = useState(cartStepperPaths);

  const [activeStep, setActiveStep] = useState(
    steps.findIndex((step) => step.path === pathname),
  );
  const { hasCustomizableProduct } = useCart();

  useEffect(() => {
    if (hasCustomizableProduct) {
      setSteps((prev) => {
        if (prev.find((step) => step.path === CartStepPaths.CUSTOMIZE))
          return prev;
        const newSteps = [...prev];
        newSteps.splice(newSteps.length - 1, 0, customize);
        return newSteps;
      });
    } else {
      setSteps((prev) =>
        prev.filter((step) => step.path !== CartStepPaths.CUSTOMIZE),
      );
    }
  }, [hasCustomizableProduct]);

  useEffect(() => {
    const customizePath = pathname.split("/").slice(0, 3).join("/");
    setActiveStep(steps.findIndex((step) => step.path === customizePath));
  }, [pathname, steps]);

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
