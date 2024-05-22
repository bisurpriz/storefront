"use client";
import useResponsive from "@/hooks/useResponsive";
import {
  useState,
  useRef,
  useEffect,
  Children,
  ReactElement,
  cloneElement,
} from "react";
import { motion } from "framer-motion";

interface PopoverProps {
  children: React.ReactElement;
  content: React.ReactElement;
  position?: "top" | "right" | "bottom" | "left";
  contentClassName?: string;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  position = "top",
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicPosition, setDynamicPosition] = useState(position); // ["top", "right", "bottom", "left"]
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  const getPositionClass = () => {
    switch (dynamicPosition) {
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-3";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-3";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-3";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mt-3";
    }
  };

  const getCaretPosition = () => {
    switch (dynamicPosition) {
      case "top":
        return "-bottom-2 left-1/2 transform -translate-x-1/2 border-b border-r";
      case "right":
        return "top-1/2 -left-2 transform -translate-y-1/2 border-t border-l";
      case "bottom":
        return "-top-2 left-1/2 transform -translate-x-1/2 border-t border-l";
      case "left":
        return "top-1/2 -right-2 transform -translate-y-1/2 border-t border-r";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2";
    }
  };

  const child = children ? (Children?.only(children) as ReactElement) : null;

  const childTrigger = child
    ? cloneElement(children, {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      })
    : null;

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      if (isMobile) {
        setDynamicPosition("top");
        return;
      }

      if (rect.top < 0) {
        setDynamicPosition("bottom");
      } else if (rect.left < 0) {
        setDynamicPosition("right");
      } else if (rect.right > rect.x) {
        setDynamicPosition("left");
      } else if (rect.bottom > rect.y) {
        setDynamicPosition("top");
      } else {
        setDynamicPosition(position);
      }
    }
  }, [isOpen]);

  return (
    <div
      className="relative inline-block w-fit whitespace-nowrap"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onTouchStart={() => setIsOpen(true)}
      onTouchEnd={() => setIsOpen(false)}
    >
      {childTrigger}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute bg-white shadow-lg rounded p-4 z-50 ${getPositionClass()} ${contentClassName}`}
          aria-hidden={!isOpen}
          ref={ref}
        >
          {content}
          <div
            className={`absolute w-4 h-4 bg-white transform rotate-45 ${getCaretPosition()}`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Popover;
