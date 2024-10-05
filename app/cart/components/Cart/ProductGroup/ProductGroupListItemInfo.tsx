"use client";

import { Product } from "@/common/types/Product/product";
import Close from "@/components/Icons/Close";
import { useCart } from "@/contexts/CartContext";
import React from "react";

const ProductGroupListItemInfo = ({
  id,
  customize,
}: {
  id: Product["id"];
  customize: Product["product_customizable_areas"];
}) => {
  const { removeFromCart, loading } = useCart();

  return (
    <span className="absolute right-2 top-0 flex gap-2 items-center">
      <Close
        onClick={() => {
          if (loading) return;
          removeFromCart(id);
        }}
        className="cursor-pointer hover:text-7 transition-all duration-200 ease-in-out text-xl"
      />
    </span>
  );
};

export default ProductGroupListItemInfo;
