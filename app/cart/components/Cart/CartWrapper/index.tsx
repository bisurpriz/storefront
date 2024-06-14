"use client";

import { useCart } from "@/contexts/CartContext";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import GreaterThanOneTenant from "./GreaterThanOneTenant";

const CartWrapper = () => {
  const {
    cartState: { cartItems },
  } = useCart();

  const tenantGroupedProducts = cartItems?.reduce((acc, item) => {
    const tenantId = item.tenant?.tenants?.[0]?.id;
    if (acc[tenantId]) {
      acc[tenantId].push(item);
    } else {
      acc[tenantId] = [item];
    }
    return acc;
  }, {});

  const greaterThanOne = Object.keys(tenantGroupedProducts).length > 1;

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <GreaterThanOneTenant show={greaterThanOne}>
        Sepetinizde farklı mağazalardan ürünler bulunmaktadır.
        <br /> Siparişinizi tamamlamadan önce, farklı mağazalardan ürünlerin
        ayrı ayrı gönderileceğini unutmayın.
      </GreaterThanOneTenant>

      <ProductGroup products={tenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
