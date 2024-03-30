"use client";

import { useCart } from "@/contexts/CartContext";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import { useMemo } from "react";

const CartWrapper = () => {
  const { cartItems } = useCart();

  if (!cartItems) return null;

  const tenantGroupedProducts = useMemo(() => {
    return cartItems?.reduce((acc, item) => {
      const tenantId = item.tenant?.tenants[0]?.id;
      if (acc[tenantId]) {
        acc[tenantId].push(item);
      } else {
        acc[tenantId] = [item];
      }
      return acc;
    }, {});
  }, [cartItems]);

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <ProductGroup products={tenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
