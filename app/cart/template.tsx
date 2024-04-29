"use client";

import CartSteps from "./components/Cart/CartSteps";
import CartSummary from "./components/Cart/CartSummary";
import { Suspense } from "react";
import CartSkeleton from "./components/Skeletons/CartSkeleton";
import EmptyCart from "./components/Cart/EmptyCart";
import { useCart } from "@/contexts/CartContext";
import { CartStepProvider } from "@/contexts/CartContext/CartStepProvider";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const { count } = useCart();

  return (
    <CartStepProvider>
      <Suspense fallback={<CartSkeleton />}>
        {!(count < 1) ? (
          <section id="cart" className="flex flex-col gap-4">
            <CartSteps />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
                {children}
              </div>
              <CartSummary />
            </div>
          </section>
        ) : (
          <EmptyCart />
        )}
      </Suspense>
    </CartStepProvider>
  );
};

export default CartLayout;
