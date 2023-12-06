"use client";

import React, { useEffect, useState } from "react";
import CartSummary from "./components/Cart/CartSummary";
import { usePathname } from "next/navigation";
import Stepper from "@/components/Stepper";
import { FaCartPlus } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineConfirmationNumber, MdPayments } from "react-icons/md";

const steps = [
  {
    label: "Sepet",
    value: 1,
    icon: <FaCartPlus />,
    path: "/cart",
  },
  {
    label: "Teslimat Bilgileri",
    value: 2,
    icon: <IoInformationCircle />,
    path: "/cart/order-detail",
  },
  {
    label: "Ödeme",
    value: 3,
    icon: <MdPayments />,
    path: "/cart/checkout",
  },
  {
    label: "Onay",
    value: 4,
    icon: <MdOutlineConfirmationNumber />,
    path: "/cart/confirmation",
  },
];

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [activeStep, setActiveStep] = useState(
    steps.findIndex((step) => step.path === pathname)
  );

  useEffect(() => {
    setActiveStep(steps.findIndex((step) => step.path === pathname));
  }, [pathname]);

  return (
    <div>
      <span className="block text-3xl mb-3">
        <Stepper activeStep={activeStep} steps={steps} key={activeStep} />
      </span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 md:col-span-2 flex flex-col gap-3">
          {children}
        </div>
        <div className="sticky bottom-0 col-span-1 md:relative">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
