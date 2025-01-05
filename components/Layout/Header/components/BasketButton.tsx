"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const BasketButton = () => {
  const {
    cartState: { count },
  } = useCart();

  return (
    <div className="relative">
      <ShoppingCart />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
          {count}
        </span>
      )}
    </div>
  );
};

export default BasketButton;
