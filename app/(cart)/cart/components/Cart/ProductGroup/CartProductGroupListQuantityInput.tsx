"use client";

import { Product } from "@/common/types/Product/product";
import NumberInput from "@/components/QuantityInput";
import { useCart } from "@/contexts/CartContext";
import React from "react";

const CartProductGroupListQuantityInput = ({
  id,
  quantity,
}: {
  id: Product["id"];
  quantity: Product["quantity"];
}) => {
  const {
    loading,
    addToCart,
    cartState: { cartItems },
  } = useCart();

  return (
    <div className="flex items-center justify-start gap-2">
      <span className="text-base font-semibold text-gray-600 max-xs:text-xs">
        Adet:
      </span>
      <NumberInput
        disabled={loading}
        defaultValue={quantity}
        onChange={(quantity) => {
          const item = cartItems.find((item) => item.id === id);
          if (item) {
            addToCart({
              id: item.id,
              type: "updateq",
              quantity,
              deliveryLocation: item.deliveryLocation,
            });
          }
        }}
      />
    </div>
  );
};

export default CartProductGroupListQuantityInput;
