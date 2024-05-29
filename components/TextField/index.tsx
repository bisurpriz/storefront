"use client";

import clsx from "clsx";
import { useInput } from "@mui/base/useInput";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      defaultValue,
      disabled,
      error,
      errorMessage,
      label,
      onBlur,
      onChange,
      onClick,
      onFocus,
      placeholder,
      required,
      value,
      className,
      fullWidth,
      autoComplete = "off",
      id,
      type = "text",
      icon,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const {
      disabled: isDisabled,
      error: isError,
      focused,
      getInputProps,
      getRootProps,
      inputRef,
      required: isRequired,
    } = useInput({
      defaultValue,
      disabled,
      error,
      inputRef: ref,
      onBlur,
      onChange: (e) =>
        onChange?.(e as React.ChangeEvent<HTMLInputElement>, e.target.value),
      onClick,
      onFocus,
      required,
      value,
    });

    const isErrorClasses = isError
      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
      : "";

    const focusedClasses = focused
      ? "focus-within:ring-1 focus-within:ring-primary focus-visible:outline-none"
      : "";

    const disabledClasses = isDisabled
      ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
      : "";

    const fullWidthClasses = fullWidth ? "w-full" : "";

    const hasIconClasses = icon ? "pl-10" : "";

    return (
      <label
        {...getRootProps()}
        className={clsx(
          "flex flex-col gap-1 text-sm font-medium text-gray-700 relative whitespace-nowrap",
          {
            "text-red-500": isError,
          },
          fullWidthClasses
        )}
      >
        {label ?? null}
        <div className="relative">
          <AnimationExitProvider show={!!icon}>
            <motion.span
              className={clsx(
                "absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {icon}
            </motion.span>
          </AnimationExitProvider>
          <input
            {...getInputProps()}
            {...rest}
            onKeyDown={onKeyDown}
            type={type}
            name={id}
            id={id}
            autoComplete={autoComplete}
            ref={inputRef}
            required={isRequired}
            placeholder={placeholder}
            value={value as string}
            className={clsx(
              "w-full px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg shadow-sm appearance-none transition-colors duration-200",
              className,
              focusedClasses,
              disabledClasses,
              isErrorClasses,
              hasIconClasses
            )}
            disabled={isDisabled}
          />
        </div>
        {isError && errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </label>
    );
  }
);

export default TextField;
