import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import clsx from "clsx";
import { FC } from "react";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, val: string) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
};

const Textarea: FC<TextareaProps> = ({
  disabled,
  error,
  errorMessage,
  fullWidth,
  id,
  label,
  onChange,
  placeholder,
  value,
  className,
  rows = 3,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e, e.target.value);
  };

  const isErrorClasses = error
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "";

  const fullWidthClasses = fullWidth ? "w-full" : "";

  return (
    <div
      className={clsx("inline-block text-sm", fullWidth && "w-full", className)}
    >
      {label ?? null}
      <TextareaAutosize
        id={id}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={clsx(
          "w-full mt-1 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 border rounded-lg shadow-sm appearance-none transition-colors duration-200",
          "focus-within:ring-1 focus-within:ring-primary focus-visible:outline-none",
          "disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
          isErrorClasses,
          fullWidthClasses
        )}
        minRows={rows}
      />
      {error && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default Textarea;
