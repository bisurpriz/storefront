import React from "react";

type DividerProps = {
  orientation: "horizontal" | "vertical";
  color?: string;
  ariaLabel?: string;
};

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  color = "#000",
  ariaLabel = "divider",
}) => {
  const horizontalClasses = `w-full border-b border-${color}`;
  const verticalClasses = `h-full border-r border-${color}`;

  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      className={
        orientation === "horizontal" ? horizontalClasses : verticalClasses
      }
    />
  );
};

export default Divider;
