import React from "react";
import Spinner from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconSize?: number;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  variant?: "default" | "outlined" | "dashed" | "link" | "fullfilled"; // Yeni varyasyonlar
  color?: "primary" | "error" | "warning" | "secondary" | "success" | "info";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = "medium",
  className,
  disabled = false,
  type = "button",
  icon,
  iconSize = 16,
  fullWidth = false,
  rounded = true,
  loading = false,
  variant = "default", // Varsayılan olarak "default" varyasyonu
  color = "primary", // Varsayılan olarak "primary" rengi
  ...rest
}) => {
  const sizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg",
  };

  const baseClasses =
    "flex items-center font-semibold cursor-pointer relative gap-4";
  const sizeClass = sizeClasses[size];
  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = rounded ? "rounded" : "";
  const loadingClass = loading ? "opacity-50 cursor-not-allowed" : "";
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const colors = (() => {
    // check variant
    switch (variant) {
      case "outlined":
      case "dashed":
      case "link":
        return {
          primary: "text-primary border border-primary",
          error: "text-error border border-error",
          warning: "text-warning border border-warning",
          secondary: "text-secondary border border-secondary",
          success: "text-success border border-success",
          info: "text-info border border-info",
        };
      case "fullfilled":
        return {
          primary: "bg-primary text-white hover:bg-primary-dark",
          error: "bg-error text-white hover:bg-error-dark",
          warning: "bg-warning text-white hover:bg-warning-dark",
          secondary: "bg-secondary text-white hover:bg-secondary-dark",
          success: "bg-success text-white hover:bg-success-dark",
          info: "bg-info text-white hover:bg-info-dark",
        };
      default:
        return {
          primary: "bg-primary text-white hover:bg-primary-dark",
          error: "bg-error text-white hover:bg-error-dark",
          warning: "bg-warning text-white hover:bg-warning-dark",
          secondary: "bg-secondary text-white hover:bg-secondary-dark",
          success: "bg-success text-white hover:bg-success-dark",
          info: "bg-info text-white hover:bg-info-dark",
        };
    }
  })();

  const colorClass = (() => {
    switch (color) {
      case "primary":
        return colors.primary;
      case "error":
        return colors.error;
      case "warning":
        return colors.warning;
      case "secondary":
        return colors.secondary;
      case "success":
        return colors.success;
      case "info":
        return colors.info;
      default:
        return "";
    }
  })();

  const variantClass = (() => {
    switch (variant) {
      case "outlined":
        return "border border-gray-400";
      case "dashed":
        return "border-dashed border-gray-400";
      case "link":
        return "border-0 underline";
      case "fullfilled":
        return "bg-primary text-white hover:bg-primary-dark";
      default:
        return "";
    }
  })();

  const iconStyle: React.CSSProperties = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    fontSize: `${iconSize ?? 24}px`,
  };

  return (
    <button
      {...rest}
      className={`whitespace-nowrap ${baseClasses} ${sizeClass} ${widthClass} ${roundedClass} ${loadingClass} ${variantClass} ${colorClass} ${disabledStyle} ${className} `}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {icon && <span style={iconStyle}>{icon}</span>}
      {loading && (
        <Spinner
          style={iconStyle}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-min bg-stone-400 bg-opacity-40 w-full h-full rounded flex items-center justify-center text-inherit"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
