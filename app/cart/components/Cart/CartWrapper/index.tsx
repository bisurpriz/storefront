"use client";

import { getProductsByIdsForCart } from "@/app/products/actions";
import { ProductForCart } from "@/common/types/Cart/cart";
import useCart from "@/store/cart";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import CartHomePageButton from "../CartHomePageButton";

const DynamicGroup = dynamic(() => import("../ProductGroup/index"));

const CartWrapper = () => {
  const { cartItems } = useCart();
  const [tenantGrouped, setTenantGrouped] = useState<{
    [key: string]: ProductForCart[];
  }>({});
  const [tenantIds, setTenantIds] = useState<string[]>([]);

  const ids = useMemo(
    () => cartItems.map(({ id, quantity }) => ({ id, quantity })),
    [cartItems]
  );

  const fetchProducts = useCallback(async () => {
    const { productsByTenantGroup } = await getProductsByIdsForCart(ids);
    setTenantIds(Object.keys(productsByTenantGroup));
    setTenantGrouped(productsByTenantGroup);
  }, [ids]);

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <DynamicGroup products={tenantGrouped} tenantIds={tenantIds} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
