"use client";

import CartSteps from "./components/Cart/CartSteps";
import EmptyCart from "./components/Cart/EmptyCart";
import { useCart } from "@/contexts/CartContext";
import { CartStepProvider } from "@/contexts/CartContext/CartStepProvider";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { CartStepPaths } from "./constants";
import dynamic from "next/dynamic";

const DynamicSummary = dynamic(
  () => import("./components/Cart/Summary/CartSummary")
);

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    cartState: { count },
  } = useCart();
  const pathname = usePathname();
  if (!count && pathname !== CartStepPaths.COMPLETE) {
    return <EmptyCart />;
  }

  return (
    <CartStepProvider>
      <section id="cart" className="flex flex-col gap-4 max-md:mb-[60px]">
        <CartSteps />
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div
            className={clsx(
              `col-span-1 md:col-span-2 flex flex-col gap-3`,
              pathname === CartStepPaths.COMPLETE && "col-span-3 md:col-span-3"
            )}
          >
            {children}
          </div>
          <DynamicSummary />
        </div>
      </section>
    </CartStepProvider>
  );
};

export default CartLayout;
