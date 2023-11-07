"use client";

import AccordionItem from "@/components/Accordion/AccordionItem";
import React from "react";
import amex from "@/public/payment/amex.png";
import mastercard from "@/public/payment/mastercard.png";
import visa from "@/public/payment/visa.png";
import safepay from "@/public/payment/safepay.png";
import Image from "next/image";

const paymentMethods = [
  {
    name: "Mastercard",
    image: mastercard,
  },
  {
    name: "Visa",
    image: visa,
  },
  {
    name: "Amex",
    image: amex,
  },
  {
    name: "Safepay",
    image: safepay,
  },
];

const PaymentMethods = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <AccordionItem
      isOpen={open}
      onToggle={() => setOpen(!open)}
      title="Ödeme Yöntemleri"
      bordered
      content={
        <div className="grid grid-cols-4 max-md:grid-cols-2 grid-flow-dense gap-4 p-4 bg-white rounded-lg shadow-md">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="flex flex-col justify-between items-center gap-2"
            >
              <Image
                src={method.image}
                alt={method.name}
                width={500}
                height={500}
                className="w-16 h-12 bg-transparent max-lg:w-16 max-sm:w-12 max-sm:h-8 max-lg:h-12"
              ></Image>
              <span className="text-sm font-semibold text-gray-700 uppercase">
                {method.name}
              </span>
            </div>
          ))}
        </div>
      }
      className="rounded-lg"
    />
  );
};

export default PaymentMethods;
