"use client";
import { getProductsByIdsForCart } from "@/app/products/actions";
import { ProductForCart } from "@/common/types/Cart/cart";
import Button from "@/components/Button";
import useCart from "@/store/cart";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EmptyCart from "./EmptyCart";

const DynamicGroup = dynamic(() => import("./ProductGroup"));

const CartWrapper = () => {
  const { cartItems, count } = useCart();
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

  return count > 0 ? (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      {tenantIds.map((id) => (
        <DynamicGroup products={tenantGrouped[id]} key={id} />
      ))}
      <Link href="/">
        <Button
          icon={<AiOutlineArrowLeft />}
          type="button"
          size="small"
          variant="link"
          className="gap-2 !px-0 !font-normal"
        >
          Alışverişe Devam Et
        </Button>
      </Link>
    </div>
  ) : (
    <EmptyCart />
  );
};

export default CartWrapper;
