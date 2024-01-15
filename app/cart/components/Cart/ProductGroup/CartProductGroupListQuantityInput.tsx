"use client";

import { changeQuantityWithRedis } from "@/app/cart/actions";
import { Product } from "@/common/types/Product/product";
import QuantityInput from "@/components/NumberInput/QuantityInput";
import React from "react";

const CartProductGroupListQuantityInput = ({
  id,
  quantity,
}: {
  id: Product["id"];
  quantity: Product["quantity"];
}) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <span className="text-base font-semibold text-gray-600">Adet:</span>
      <QuantityInput
        value={quantity}
        onChange={async (e, quantity) => {
          changeQuantityWithRedis(id, quantity);
        }}
        color="primary"
      />
    </div>
  );
};

export default CartProductGroupListQuantityInput;
