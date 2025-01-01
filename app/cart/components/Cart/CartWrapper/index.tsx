"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/contexts/CartContext";
import { TriangleAlert } from "lucide-react";
import { useMemo } from "react";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import GreaterThanOneTenant from "../ProductGroup/GreaterThanOneTenant";

const CartWrapper = () => {
  const {
    cartState: { cartItems },
  } = useCart();

  const { tenantGroupedProducts, greaterThanOneTenant } = useMemo(() => {
    const grouped = cartItems?.reduce((acc, item) => {
      const tenantId = item.tenant?.tenants?.[0]?.id;
      if (acc[tenantId]) {
        acc[tenantId].push(item);
      } else {
        acc[tenantId] = [item];
      }
      return acc;
    }, {});

    return {
      tenantGroupedProducts: grouped,
      greaterThanOneTenant: Object.keys(grouped || {}).length > 1,
    };
  }, [cartItems]);

  return (
    <div className="col-span-1 flex flex-col gap-3 md:col-span-2">
      <GreaterThanOneTenant show={greaterThanOneTenant}>
        <Alert variant="destructive">
          <TriangleAlert className="h-5 w-5" />
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
