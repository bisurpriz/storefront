import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

enum TooltipPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}

interface TooltipProps {
  text: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = TooltipPosition.BOTTOM,
  children,
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
        return " left-1/2 transform -translate-x-1/2";

      case TooltipPosition.BOTTOM:
        return " left-1/2 transform -translate-x-1/2";

      case TooltipPosition.LEFT:
        return " top-1/2 transform -translate-y-1/2";

      case TooltipPosition.RIGHT:
        return " top-1/2 transform -translate-y-1/2";
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-fit">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      <CSSTransition
        in={isTooltipVisible}
        timeout={300}
        classNames={{
          enter: "opacity-0",
          enterActive: "opacity-100 transition-opacity duration-300",
          enterDone: "opacity-100",
          exit: "opacity-100",
          exitActive: "opacity-0 transition-opacity duration-300",
          exitDone: "opacity-0",
        }}
        unmountOnExit
        nodeRef={ref}
      >
        <div
          ref={ref}
          role="tooltip"
          className={`absolute z-10 whitespace-nowrap inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip ${getTooltipStyles()}`}
        >
          {text}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tooltip;
