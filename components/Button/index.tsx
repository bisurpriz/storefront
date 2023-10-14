import React from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  size?: "small" | "medium" | "large";
  color?: "primary" | "error" | "warning" | "secondary" | "success" | "info";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode; // İkon bileşeni JSX'i olarak kabul eder
  iconSize?: number;
  // Yeni eklenen özellikler
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = "medium",
  color = "primary",
  className,
  disabled = false,
  type = "button",
  icon,
  iconSize = 20, // Varsayılan icon boyutu
  fullWidth = false, // Düğmenin genişliğini 100% yapar
  rounded = true, // Kenar yuvarlatmayı etkinleştirir
  loading = false, // Yükleme durumunu gösterir
}) => {
  const sizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6",
    large: "py-4 px-8 text-lg",
  };

  const colorClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    error: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    success: "bg-green-500 text-white hover:bg-green-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
  };

  const baseClasses = "flex items-center font-semibold";
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];
  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = rounded ? "rounded" : "";
  const loadingClass = loading ? "opacity-50 cursor-not-allowed" : "";

  const iconStyle: React.CSSProperties = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    marginRight: label && !loading ? "0.5rem" : "0",
    fontSize: `${iconSize}px`,
  };

  return (
    <button
      className={`whitespace-nowrap ${baseClasses} ${sizeClass} ${colorClass} ${widthClass} ${roundedClass} ${loadingClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {icon && !loading && <span style={iconStyle}>{icon}</span>}
      {loading ? <Spinner /> : label}
    </button>
  );
};

export default Button;
