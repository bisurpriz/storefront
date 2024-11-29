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
    <span className="absolute right-2 top-0 flex items-center gap-2">
      <Close
        onClick={() => {
          if (loading) return;
          removeFromCart(id);
        }}
        className="hover:text-7 cursor-pointer text-xl transition-all duration-200 ease-in-out"
      />
    </span>
  );
};

export default ProductGroupListItemInfo;
