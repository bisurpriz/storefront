import CartSteps from "./components/Cart/CartSteps";
import CartSummary from "./components/Cart/CartSummary";
import { Suspense } from "react";
import CartSkeleton from "./components/Skeletons/CartSkeleton";

const CartTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartSteps />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
          {children}
        </div>
        <CartSummary />
      </div>
    </Suspense>
  );
};

export default CartTemplate;
