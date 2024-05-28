"use client";

import CartSteps from "./components/Cart/CartSteps";
import CartSummary from "./components/Cart/CartSummary";
import EmptyCart from "./components/Cart/EmptyCart";
import { useCart } from "@/contexts/CartContext";
import { CartStepProvider } from "@/contexts/CartContext/CartStepProvider";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { CartStepPaths } from "./constants";

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
      <section id="cart" className="flex flex-col gap-4">
        <CartSteps />
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div
            className={clsx(
              `col-span-2 md:col-span-2 flex flex-col gap-3`,
              pathname === CartStepPaths.COMPLETE && "col-span-3 md:col-span-3"
            )}
          >
            {children}
          </div>
          <CartSummary />
        </div>
      </section>
    </CartStepProvider>
  );
};

export default CartLayout;
