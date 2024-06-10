"use client";

import { useCart } from "@/contexts/CartContext";
import React from "react";
import { PiBasketLight } from "react-icons/pi";
import Badge from "@/components/Badge";

const badgeVariants = {
  hidden: { scale: 0, right: 0, top: 0, translateY: "-50%", translateX: "50%" },
  visible: {
    scale: 1,
    right: 0,
    top: 0,
    translateY: "-50%",
    translateX: "50%",
  },
};

const BasketButton = () => {
  const {
    cartState: { count },
  } = useCart();

  return (
    <Badge text={count} show={count > 0}>
      <PiBasketLight />
    </Badge>
  );
};

export default BasketButton;
