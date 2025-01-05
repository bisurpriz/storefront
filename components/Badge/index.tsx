"use client";

import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import clsx from "clsx";
import { motion } from "motion/react";
import React, { FC } from "react";

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
        "p-0",
      )}
    >
      {children}
      <AnimationExitProvider show={show}>
        <motion.span
          className={clsx(
            "absolute right-0 top-0",
            "flex items-center justify-center",
            "h-4 w-4 rounded-full bg-primary",
            "text-xs text-white",
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
