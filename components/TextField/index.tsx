import * as React from "react";
import clsx from "clsx";
import { useInput } from "@mui/base/useInput";

const TextField = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      defaultValue,
      disabled,
      error,
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
      <div {...getRootProps()} className={fullWidthClasses}>
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 relative">
          {label ?? null}
          {icon && <div className="absolute left-3 top-3">{icon}</div>}
          <input
            {...getInputProps()}
            type={type}
            name={id}
            id={id}
            autoComplete={autoComplete}
            ref={inputRef}
            required={isRequired}
            placeholder={placeholder}
            value={value as string}
            className={clsx(
              "w-full px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg shadow-sm appearance-none transition-colors duration-200 ",
              className,
              focusedClasses,
              disabledClasses,
              isErrorClasses,
              hasIconClasses
            )}
            disabled={isDisabled}
          />
        </label>
      </div>
    );
  }
);

export default TextField;
