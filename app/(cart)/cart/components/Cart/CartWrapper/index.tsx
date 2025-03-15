"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";

const CartWrapper = () => {
  const {
    cartState: { cartItems },
  } = useCart();

  const grouped = cartItems?.reduce((acc, item) => {
    const tenantId = item.tenant?.tenants?.[0]?.id;
    if (acc[tenantId]) {
      acc[tenantId].push(item);
    } else {
      acc[tenantId] = [item];
    }
    return acc;
  }, {});

  const tenantGroupedProducts = grouped || {};
  const greaterThanOneTenant = Object.keys(tenantGroupedProducts).length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col col-span-1 gap-4 md:col-span-2"
    >
      <AnimatePresence>
        {greaterThanOneTenant && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="destructive" className="border-2 shadow-sm">
              <TriangleAlert className="w-5 h-5" />
              <AlertTitle className="font-semibold">
                Sepetinizde farklı mağazalardan ürünler bulunmaktadır.
              </AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                Siparişinizi tamamlamadan önce, farklı mağazalardan ürünlerin
                ayrı ayrı gönderileceğini unutmayın.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {cartItems && cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProductGroup products={tenantGroupedProducts} />
        </motion.div>
      )}

      <CartHomePageButton />
    </motion.div>
  );
};

export default CartWrapper;
