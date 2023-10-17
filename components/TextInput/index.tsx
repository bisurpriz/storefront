// components/TextInput.tsx
import React, { useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const TextInput: React.FC<TextInputProps> = ({
  label,
  errorMessage,
  required = false,
  id,
  placeholder,
  className,
  onChange,
  disabled = false,
  autoComplete = "on",
  autoFocus = false,
  type = "text",
  maxLength,
  prefix,
  suffix,
  icon,
  successIcon,
  value,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    const input = inputRef?.current;

    if (input) {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  const hasError = !!errorMessage;
  const hasSuccess = !!successIcon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium ${
            hasError
              ? "text-error"
              : hasSuccess
              ? "text-success"
              : focused
              ? "text-info"
              : ""
          }`}
          htmlFor={id}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600">
            {prefix}
          </div>
        )}
        <input
          {...props}
          ref={inputRef}
          className={`block outline-none w-full px-3 py-2 pl-10 text-gray-700 border rounded-md focus:ring-primary focus:border-primary-dark shadow-sm focus:ring focus:ring-opacity-50 ${
            hasError
              ? "border-error-light"
              : hasSuccess
              ? "border-success-light"
              : focused
              ? "border-primary-dark"
              : ""
          }`}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          type={type}
          maxLength={maxLength}
          value={value}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-600">
            {suffix}
          </div>
        )}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600">
            {icon}
          </div>
        )}
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-error">
            <FiAlertCircle />
          </div>
        )}
        {hasSuccess && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-success">
            {successIcon}
          </div>
        )}
      </div>
      {hasError && <p className="text-sm text-error mt-1">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
