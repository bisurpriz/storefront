"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { FC } from "react";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";

interface AnimatedFilterBoxProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const AnimatedFilterBox: FC<AnimatedFilterBoxProps> = ({
  isOpen,
  handleClose,
  children,
  className,
}) => {
  return (
    <AnimationExitProvider show={isOpen}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "absolute z-50 mt-2 w-56 rounded-lg border bg-white p-2 shadow-lg",
          className,
        )}
      >
        {children}
      </motion.div>
    </AnimationExitProvider>
  );
};

export { AnimatedFilterBox };
