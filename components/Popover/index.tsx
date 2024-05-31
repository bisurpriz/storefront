"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: "click" | "hover";
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  className,
  placement = "bottom",
  trigger = "hover",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      triggerRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const showPopover = () => {
    setIsOpen(true);
  };

  const hidePopover = () => {
    setIsOpen(false);
  };

  const popoverClasses = clsx(
    "absolute z-[11] p-2 bg-white border rounded shadow-lg",
    className,
    {
      "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2":
        placement === "top",
      "top-full left-1/2 transform -translate-x-1/2 translate-y-2":
        placement === "bottom",
      "right-full top-1/2 transform -translate-x-4 -translate-y-1/2":
        placement === "left",
      "left-full top-1/2 transform translate-x-4 -translate-y-1/2":
        placement === "right",
    }
  );

  const caretClasses = clsx(
    "absolute z-10 w-3 h-3 bg-white transform rotate-45",
    {
      "top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2":
        placement === "top",
      "bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2":
        placement === "bottom",
      "left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2":
        placement === "left",
      "right-full top-1/2 transform translate-x-1/2 -translate-y-1/2":
        placement === "right",
    }
  );

  const triggerEvents =
    trigger === "click"
      ? { onClick: togglePopover }
      : { onMouseEnter: showPopover, onMouseLeave: hidePopover };

  return (
    <div className="relative inline-block" ref={triggerRef} {...triggerEvents}>
      {children}
      {isOpen && (
        <motion.div
          className={popoverClasses}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          ref={popoverRef}
          transformTemplate={({ scale, x, y }) =>
            `scale(${scale}) translate(${x}, ${y})`
          }
        >
          <div className={caretClasses} />
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default Popover;
