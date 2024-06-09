"use client";

import { useCart } from "@/contexts/CartContext";
import clsx from "clsx";
import React from "react";
import { PiBasketLight } from "react-icons/pi";
import { motion } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";

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
    <span
      className={clsx(
        "relative",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "p-0"
      )}
    >
      <PiBasketLight />
      <AnimationExitProvider show={count > 0}>
        <motion.span
          className={clsx(
            "absolute right-0 top-0",
            "flex items-center justify-center",
            "w-4 h-4 rounded-full bg-primary",
            "text-xs text-white font-mono"
          )}
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {count}
        </motion.span>
      </AnimationExitProvider>
    </span>
  );
};

export default BasketButton;
