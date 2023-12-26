import CartSteps from "./components/Cart/CartSteps";
import CartSummary from "./components/Cart/CartSummary";
import { Suspense } from "react";
import CartSkeleton from "./components/Skeletons/CartSkeleton";
import { getCartWithRedis } from "./actions";
import EmptyCart from "./components/Cart/EmptyCart";

const CartLayout = async ({ children }: { children: React.ReactNode }) => {
  const cartData = await getCartWithRedis();

  return (
    <Suspense fallback={<CartSkeleton />}>
      {cartData?.length > 0 ? (
        <>
          <CartSteps />
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
              {children}
            </div>
            <CartSummary cartItems={cartData} />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </Suspense>
  );
};

export default CartLayout;
