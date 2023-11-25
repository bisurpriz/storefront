"use client";

import Button from "@/components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import CartSummary from "./CartSummary";
import { getProductsByIdsForCart } from "@/app/products/actions";
import useCart from "@/store/cart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductForCart } from "../../types/cart";
import dynamic from "next/dynamic";
import useCartSummary from "@/hooks/useCartSummary";

const DynamicGroup = dynamic(() => import("./ProductGroup"));

const Cart = () => {
  const { cartItems } = useCart();
  const [cartProducts, setCartProducts] = useState<ProductForCart[]>([]);
  const [tenantGrouped, setTenantGrouped] = useState<{
    [key: string]: ProductForCart[];
  }>({});

  const ids = useMemo(
    () => cartItems.map(({ id, quantity }) => ({ id, quantity })),
    [cartItems]
  );

  const fetchProducts = useCallback(async () => {
    const { productsByTenantGroup, products } = await getProductsByIdsForCart(
      ids
    );
    setTenantGrouped(productsByTenantGroup);
    setCartProducts(products);
  }, [ids]);

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  const tenantIds = useMemo(() => Object.keys(tenantGrouped), [tenantGrouped]);
  const { cartSummary } = useCartSummary(cartProducts);

  return (
    <div className="w-full relative">
      <span className="block text-3xl mb-3">Sepetim</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {tenantIds.length ? (
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            {tenantIds.map((id) => {
              return <DynamicGroup products={tenantGrouped[id]} key={id} />;
            })}
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
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3 ">
            <div className="w-full  bg-stone-100 animate-pulse flex flex-col gap-4 p-8 rounded-lg">
              <div className="w-full bg-stone-300 animate-pulse p-12 rounded-lg"></div>
              <div className="w-full bg-stone-300 animate-pulse p-12 rounded-lg"></div>
            </div>
          </div>
        )}
        <div className="sticky bottom-0 col-span-1 md:relative">
          <CartSummary cartSummary={cartSummary} tenantGrouped={tenantGrouped} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
