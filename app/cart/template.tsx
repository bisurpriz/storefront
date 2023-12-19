"use client";

import useCart from "@/store/cart";
import CartSteps from "./components/Cart/CartSteps";
import CartSummary from "./components/Cart/CartSummary";
import EmptyCart from "./components/Cart/EmptyCart";
import { usePathname } from "next/navigation";

const CartTemplate = ({ children }: { children: React.ReactNode }) => {
  const { count } = useCart();
  const pathname = usePathname();
  return (
    <>
      {count > 0 ? (
        <div>
          <span className="block text-3xl mb-3">
            <CartSteps />
          </span>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
              {children}
            </div>
            <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg">
              <CartSummary />
            </div>
          </div>
        </div>
      ) : pathname === "/cart/complete" ? (
        <>{children} </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default CartTemplate;
