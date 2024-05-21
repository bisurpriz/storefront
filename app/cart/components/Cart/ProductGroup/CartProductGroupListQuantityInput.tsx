"use client";

import QuantityInput from "@/components/NumberInput/QuantityInput";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/graphql/generated";
import React from "react";

const CartProductGroupListQuantityInput = ({
  id,
  quantity,
}: {
  id: Product["id"];
  quantity: Product["quantity"];
}) => {
  const { addToCart, cartItems } = useCart();

  return (
    <div className="flex items-center justify-start gap-2">
      <span className="text-base font-semibold text-gray-600 max-xs:text-xs">
        Adet:
      </span>
      <QuantityInput
        value={quantity}
        onChange={(e, quantity) => {
          const item = cartItems.find((item) => item.id === id);
          if (item) {
            addToCart({ ...item, quantity });
          }
        }}
        color="primary"
      />
    </div>
  );
};

export default CartProductGroupListQuantityInput;
