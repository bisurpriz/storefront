"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";
import BasketButton from "./BasketButton";
import AltTextWithData from "./AltTextWithData";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Account from "@/components/Icons/Account";
import Truck from "@/components/Icons/Truck";

export type HeaderButtonData = {
  icon: ReactNode;
  title: string;
  href?: string;
  type: "order" | "account" | "cart";
};

const headerButtonData: HeaderButtonData[] = [
  {
    icon: <Truck />,
    title: "Siparişlerim",
    href: "/account/orders",
    type: "order",
  },
  {
    icon: <Account />,
    title: "Hesabım",
    href: "/account",
    type: "account",
  },
  {
    icon: <BasketButton />,
    title: "Sepetim",
    href: "/cart",
    type: "cart",
  },
];

const HeaderButtons = () => {
  const { user } = useUser();
  const {
    cartState: { cost },
  } = useCart();

  const getAltTextData = (type: HeaderButtonData["type"]) => {
    switch (type) {
      case "cart":
        return cost;
      case "account":
        return user;
      default:
        return null;
    }
  };

  return (
    <div className={clsx("flex items-center gap-4 font-mono")}>
      {headerButtonData.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={clsx(
            "h-full flex items-center gap-2 text-gray-600 group transition-all duration-300 ease-in-out hover:text-primary"
          )}
        >
          <span className={clsx("text-3xl")}>{item.icon}</span>
          <div
            className={clsx(
              "flex flex-col items-start justify-start",
              "max-lg:hidden"
            )}
          >
            <span className="mb-auto">{item.title}</span>
            <AltTextWithData
              type={item.type}
              data={getAltTextData(item.type)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeaderButtons;
