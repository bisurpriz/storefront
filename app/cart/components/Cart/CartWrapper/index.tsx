"use client";

import { useCart } from "@/contexts/CartContext";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import { useMemo } from "react";
import clsx from "clsx";

const CartWrapper = () => {
  const {
    cartState: { cartItems },
  } = useCart();

  const tenantGroupedProducts = useMemo(() => {
    return cartItems?.reduce((acc, item) => {
      const tenantId = item.tenant?.tenants?.[0]?.id;
      if (acc[tenantId]) {
        acc[tenantId].push(item);
      } else {
        acc[tenantId] = [item];
      }
      return acc;
    }, {});
  }, [cartItems]);

  const greaterThanOne = Object.keys(tenantGroupedProducts).length > 1;

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <span
        className={clsx(
          "text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded-md",
          {
            hidden: !greaterThanOne,
          }
        )}
      >
        Sepetinizde farklı mağazalardan ürünler bulunmaktadır. Siparişinizi
        tamamlamadan önce, farklı mağazalardan ürünlerin ayrı ayrı
        gönderileceğini unutmayın.
      </span>
      <ProductGroup products={tenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
