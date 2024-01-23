"use client";

import type { FC, ReactNode } from "react";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

enum TooltipPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  whiteSpace?: "normal" | "nowrap";
}

const Tooltip: FC<TooltipProps> = ({
  text,
  position = TooltipPosition.BOTTOM,
  children,
  breakpoint,
  whiteSpace = "nowrap",
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const getTooltipStyles = () => {
    switch (position) {
      case TooltipPosition.TOP:
        return "left-1/2 transform -translate-x-1/2 -top-2 -translate-y-full";

      case TooltipPosition.BOTTOM:
        return "left-1/2 transform -translate-x-1/2";

      case TooltipPosition.LEFT:
        return "top-1/2 transform -translate-y-1/2";

      case TooltipPosition.RIGHT:
        return "top-1/2 transform -translate-y-1/2 translate-x-full -right-2";

      default:
        return "left-1/2 transform -translate-x-1/2";
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const breakpointWithOpenTooltip = () => {
    switch (breakpoint) {
      case "xs":
        return "xs:hidden";

      case "sm":
        return "sm:hidden";

      case "md":
        return "md:hidden";

      case "lg":
        return "lg:hidden";

      case "xl":
        return "xl:hidden";

      case "2xl":
        return "2xl:hidden";

      default:
        return "w:hidden";
    }
  };

  const whiteSpaceClass = whiteSpace === "nowrap" ? "whitespace-nowrap" : "";

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='cursor-pointer'>{children}</div>
      <div className={`${breakpointWithOpenTooltip()}`}>
        <CSSTransition
          in={isTooltipVisible}
          timeout={100}
          classNames={{
            enter: "opacity-0",
            enterActive: "opacity-100 transition-opacity duration-300",
            enterDone: "opacity-100",
            exit: "opacity-100",
            exitActive: "opacity-0 transition-opacity duration-100",
            exitDone: "opacity-0",
          }}
          unmountOnExit
          nodeRef={ref}
        >
          <div
            ref={ref}
            role='tooltip'
            className={`absolute z-20 inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip ${getTooltipStyles()} ${whiteSpaceClass}`}
          >
            {text}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Tooltip;
