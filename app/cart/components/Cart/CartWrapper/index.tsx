"use client";

import { useCart } from "@/contexts/CartContext";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import { useMemo } from "react";

const CartWrapper = () => {
  const { cartItems } = useCart();

  const tenantGroupedProducts = cartItems?.reduce((acc, item) => {
    const tenantId = item.tenant?.id;
    if (acc[tenantId]) {
      acc[tenantId].push(item);
    } else {
      acc[tenantId] = [item];
    }
    return acc;
  }, {});

  const memoizedTenantGroupedProducts = useMemo(
    () => tenantGroupedProducts,
    [cartItems]
  );

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <ProductGroup products={memoizedTenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
