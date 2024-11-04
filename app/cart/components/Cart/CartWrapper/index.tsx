"use client";

import { useCart } from "@/contexts/CartContext";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import GreaterThanOneTenant from "../ProductGroup/GreaterThanOneTenant";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

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

  const greaterThanOneTenant = Object.keys(tenantGroupedProducts).length > 1;

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <GreaterThanOneTenant show={greaterThanOneTenant}>
        <Alert variant="destructive">
          <TriangleAlert className="w-5 h-5" />
          <AlertTitle>
            Sepetinizde farklı mağazalardan ürünler bulunmaktadır.
          </AlertTitle>
          <AlertDescription>
            Siparişinizi tamamlamadan önce, farklı mağazalardan ürünlerin ayrı
            ayrı gönderileceğini unutmayın.
          </AlertDescription>
        </Alert>
      </GreaterThanOneTenant>

      <ProductGroup products={tenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
