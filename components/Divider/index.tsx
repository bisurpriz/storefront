import { FC } from "react";

type DividerProps = {
  orientation: "horizontal" | "vertical";
  color?: string;
  ariaLabel?: string;
  className?: string;
};

const Divider: FC<DividerProps> = ({
  orientation = "horizontal",
  color = "#000",
  ariaLabel = "divider",
  className = "",
}) => {
  const horizontalClasses = `w-full border-b border-${color}`;
  const verticalClasses = `h-full border-r border-${color}`;

  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      className={`${
        orientation === "horizontal" ? horizontalClasses : verticalClasses
      } ${className}`}
    />
  );
};

export default Divider;
