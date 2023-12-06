"use client";
import useResponsive from "@/hooks/useResponsive";
import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

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
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getCaretPosition = () => {
    switch (dynamicPosition) {
      case "top":
        return "-bottom-2 left-1/2 transform -translate-x-1/2";
      case "right":
        return "top-1/2 -left-2 transform -translate-y-1/2";
      case "bottom":
        return "-top-2 left-1/2 transform -translate-x-1/2";
      case "left":
        return "top-1/2 -right-2 transform -translate-y-1/2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2";
    }
  };

  const child = children
    ? (React.Children?.only(children) as React.ReactElement)
    : null;

  const childTrigger = child
    ? React.cloneElement(children, {
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
    <div className="relative inline-block">
      {childTrigger}
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={{
          enter: "opacity-0",
          enterActive: "opacity-100",
          enterDone: "opacity-100",
          exit: "opacity-100",
          exitActive: "opacity-0",
          exitDone: "opacity-0",
        }}
        unmountOnExit
        nodeRef={ref}
      >
        <div
          className={`absolute bg-white shadow-lg rounded p-4 mt-3 z-50 ${getPositionClass()} ${contentClassName}`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onTouchStart={() => setIsOpen(true)}
          onTouchEnd={() => setIsOpen(false)}
          aria-hidden={!isOpen}
          ref={ref}
        >
          {content}
          <div
            className={`absolute w-4 h-4 bg-white transform rotate-45 border-t border-r ${getCaretPosition()}`}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Popover;
