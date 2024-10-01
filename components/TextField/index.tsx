"use client";

import clsx from "clsx";
import { useInput } from "@mui/base/useInput";
import { FC } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";

const TextField: FC<TextFieldProps> = (props) => {
  const {
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
    spellCheck,
    ref,
    readOnly,
    ...rest
  } = props;

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
    onFocus: (e) => onFocus?.(e as React.FocusEvent<HTMLInputElement>),
    required,
    value,
  });

  const isErrorClasses = isError
    ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
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
        "relative text-xs font-medium text-gray-700 flex flex-col gap-1",
        fullWidthClasses
      )}
    >
      {label ? <p>{label}</p> : null}
      <div
        className={clsx(
          "flex relative w-full overflow-hidden rounded-lg bg-white  border border-solid border-gray-200  hover:border-primary-400 focus-visible:outline-0 shadow-[0_2px_4px_rgb(0_0_0_/_0.05)] ",
          !focused && "shadow-[0_2px_2px_transparent] shadow-gray-50 ",
          focused &&
            "border-primary-400 shadow-[0_0_0_3px_transparent] shadow-primary-200 ",
          isErrorClasses,
          disabledClasses
        )}
      >
        <AnimationExitProvider show={!!icon}>
          <motion.span
            className={clsx(
              "absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none text-sm",
              "object-fill text-current"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {icon}
          </motion.span>
        </AnimationExitProvider>
        <input
          {...getInputProps()}
          {...rest}
          readOnly={readOnly}
          spellCheck={spellCheck ?? false}
          tabIndex={0}
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
            "text-sm leading-[1.5] text-gray-900  bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto",
            className,
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
};

export default TextField;
