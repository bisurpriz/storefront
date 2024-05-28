"use client";

import { FC, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";
import clsx from "clsx";

const tooltipVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position = "bottom",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const positionClasses = {
    top: "-translate-x-1/2 left-1/2 bottom-full",
    bottom: "-translate-x-1/2 left-1/2 top-full",
    left: "right-full -translate-y-full",
    right: "left-full -translate-y-full",
  };

  const arrowPositionClasses = {
    top: "-bottom-1 left-1/2 -translate-x-1/2",
    bottom: "-top-1 left-1/2 -translate-x-1/2",
    left: "-right-1 top-1/2 -translate-y-1/2",
    right: "-left-1 top-1/2 -translate-y-1/2",
  };

  const tooltipClasses = `absolute p-2 rounded-md z-10 ${positionClasses[position]} bg-gray-100 rounded-md text-gray-600 shadow-md`;

  const contentClasses = "text-sm";

  const arrowClasses = `absolute w-2 h-2 bg-7 ${arrowPositionClasses[position]} bg-gray-100 transform rotate-45`;

  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative whitespace-nowrap"
    >
      {children}
      <AnimationExitProvider show={showTooltip}>
        <motion.div
          ref={tooltipRef}
          className={clsx(tooltipClasses)}
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transformTemplate={(values, generated) =>
            `translate(${values.x}px, ${values.y}px) scale(${values.scale})`
          }
        >
          <div className={contentClasses}>{content}</div>
          <div className={arrowClasses} />
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
};

export default Tooltip;
