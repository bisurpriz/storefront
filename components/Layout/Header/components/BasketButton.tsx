"use client";

import Badge from "@/components/Badge";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const BasketButton = () => {
  const {
    cartState: { count },
  } = useCart();

  return (
    <Badge text={count} show={count > 0}>
      <ShoppingCart />
    </Badge>
  );
};

export default BasketButton;
