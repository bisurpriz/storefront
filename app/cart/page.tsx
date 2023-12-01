"use client";

import Button from "@/components/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCart from "@/store/cart";
import { ProductForCart } from "@/common/types/Cart/cart";
import { getProductsByIdsForCart } from "../products/actions";

const DynamicGroup = dynamic(() => import("./components/Cart/ProductGroup"));

const Cart = () => {
  const { cartItems } = useCart();
  const [tenantGrouped, setTenantGrouped] = useState<{
    [key: string]: ProductForCart[];
  }>({});

  const ids = useMemo(
    () => cartItems.map(({ id, quantity }) => ({ id, quantity })),
    [cartItems]
  );

  const fetchProducts = useCallback(async () => {
    const { productsByTenantGroup } = await getProductsByIdsForCart(ids);
    setTenantGrouped(productsByTenantGroup);
  }, [ids]);

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  const tenantIds = useMemo(() => Object.keys(tenantGrouped), [tenantGrouped]);
  return (
    <div className="w-full relative">
      <div>
        {tenantIds?.length > 0 ? (
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
          <div>Sepetinizde ürün bulunmamaktadır.</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
