"use client";

import React from "react";
import CartSummary from "./components/Cart/CartSummary";
import { usePathname } from "next/navigation";

const getTitle = (pathname: string) => {
  const cartTitle = {
    "/cart": "Sepetim",
    "/cart/order-detail": "Sipariş Bilgileri",
    "/cart/checkout": "Ödeme",
  }[pathname];

  return cartTitle;
};

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <div>
      <span className="block text-3xl mb-3">{title}</span>
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
