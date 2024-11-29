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
  () => import("./components/Cart/Summary/CartSummary"),
);
const renderSuspense = () => {
  return (
    <div className="w-full animate-pulse rounded-lg bg-slate-600 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
      <div className="mt-4 h-8 w-full rounded-lg bg-slate-700" />
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
      <div className="mt-4 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
        <div
          className={clsx(
            `col-span-1 flex flex-col gap-3 md:col-span-2`,
            (pathname === CartStepPaths.COMPLETE ||
              pathname.startsWith(CartStepPaths.CUSTOMIZE)) &&
              "col-span-3 md:col-span-3",
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
