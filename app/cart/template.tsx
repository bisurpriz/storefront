"use client";

import CartSteps from "./components/Cart/CartSteps";
import EmptyCart from "./components/Cart/EmptyCart";
import { useCart } from "@/contexts/CartContext";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { CartStepPaths } from "./constants";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicSummary = dynamic(
  () => import("./components/Cart/Summary/CartSummary")
);
const renderSuspense = () => {
  return (
    <div className="w-full p-4 bg-slate-600 animate-pulse rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="w-full h-8 bg-slate-700 rounded-lg mt-4" />
    </div>
  );
};

const CartTemplate = ({ children }: { children: React.ReactNode }) => {
  const {
    cartState: { count },
  } = useCart();
  const pathname = usePathname();
  const customizePath = pathname.split("/").slice(0, 3).join("/");
  if (
    !count &&
    pathname !== CartStepPaths.COMPLETE &&
    customizePath !== CartStepPaths.CUSTOMIZE
  ) {
    return <EmptyCart />;
  }

  return (
    <section id="cart" className="flex flex-col max-md:mb-[60px]">
      <CartSteps />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div
          className={clsx(
            `col-span-1 md:col-span-2 flex flex-col gap-3`,
            (pathname === CartStepPaths.COMPLETE ||
              pathname.startsWith(CartStepPaths.CUSTOMIZE)) &&
              "col-span-3 md:col-span-3"
          )}
        >
          {children}
        </div>
        <Suspense fallback={renderSuspense()}>
          <DynamicSummary />
        </Suspense>
      </div>
    </section>
  );
};

export default CartTemplate;
