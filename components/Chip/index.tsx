import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Close from "../Icons/Close";

export enum ChipColor {
  primary = "primary",
  secondary = "secondary",
  error = "error",
  info = "info",
  warning = "warning",
  success = "success",
  purple = "purple",
  gray = "gray",
}

type ChipColorType = keyof typeof ChipColor;

type ChipProps = {
  label: string;
  icon?: React.ReactNode;
  variant?: "outlined" | "filled" | "soft";
  size?: "small" | "medium" | "large";
  color?: ChipColorType;
  withClose?: boolean;
  onClose?: () => void;
  rounded?: "full" | "semi" | "none";
  as?: "button" | "link";
  href?: string; // If as='link', href is required
};

const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  variant = "outlined",
  size = "medium",
  color = "primary",
  withClose = false,
  onClose,
  rounded = "full",
  as = "button",
  href,
}) => {
  const baseClasses =
    "w-fit flex items-center font-medium cursor-pointer whitespace-nowrap";

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1.5 text-sm",
    large: "px-4 py-2 text-base",
  };

  const iconSizeClasses = {
    small: "w-4 h-4 text-base",
    medium: "w-5 h-5 text-lg",
    large: "w-6 h-6 text-xl",
  };

  const colorClasses = {
    primary: {
      outlined: "border border-primary text-primary-dark",
      filled: "bg-primary text-white",
      soft: "bg-slate-200 text-primary-dark",
    },
    secondary: {
      outlined: "border border-secondary text-secondary-dark",
      filled: "bg-secondary text-white",
      soft: "bg-slate-200 text-secondary-dark",
    },
    error: {
      outlined: "border border-red-500 text-red-700",
      filled: "bg-red-500 text-white",
      soft: "bg-red-100 text-red-700",
    },
    info: {
      outlined: "border border-cyan-500 text-cyan-700",
      filled: "bg-cyan-500 text-white",
      soft: "bg-cyan-100 text-cyan-700",
    },
    warning: {
      outlined: "border border-yellow-500 text-yellow-700",
      filled: "bg-yellow-500 text-white",
      soft: "bg-yellow-100 text-yellow-700",
    },
    success: {
      outlined: "border border-green-500 text-green-700",
      filled: "bg-green-500 text-white",
      soft: "bg-green-100 text-green-700",
    },
    purple: {
      outlined: "border border-purple-400 text-purple-800",
      filled: "bg-purple-500 text-white",
      soft: "bg-purple-100 text-purple-800",
    },
    gray: {
      outlined: "border border-gray-400 text-gray-800",
      filled: "bg-gray-400 text-white",
      soft: "bg-gray-200 text-gray-800",
    },
  };

  const roundedClasses = {
    full: "rounded-full",
    semi: "rounded-lg",
    none: "rounded-none",
  };

  const chipContent = (
    <>
      {icon && (
        <span
          className={clsx([
            iconSizeClasses[size],
            "flex items-center justify-center",
            "mr-2",
          ])}
        >
          {icon}
        </span>
      )}
      <span>{label}</span>
      {withClose && (
        <button
          className="ml-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <Close />
        </button>
      )}
    </>
  );

  if (as === "link" && href) {
    return (
      <Link
        href={href}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          colorClasses[color][variant],
          roundedClasses[rounded]
        )}
      >
        {chipContent}
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        baseClasses,
        sizeClasses[size],
        colorClasses[color][variant],
        roundedClasses[rounded]
      )}
    >
      {chipContent}
    </div>
  );
};

export default Chip;
