"use client";

import clsx from "clsx";
import React, { FC } from "react";
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

export type BadgeProps = {
  show?: boolean;
  children?: React.ReactNode;
  text: string | number;
};

const Badge: FC<BadgeProps> = ({ children, show, text }) => {
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
      {children}
      <AnimationExitProvider show={show}>
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
          {text}
        </motion.span>
      </AnimationExitProvider>
    </span>
  );
};

export default Badge;
