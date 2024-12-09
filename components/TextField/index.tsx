"use client";

import clsx from "clsx";

import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    dirtyAnimation,
    name,
    ...rest
  } = props;

  const fullWidthClasses = fullWidth ? "w-full" : "";

  return (
    <label className={clsx("relative flex flex-col gap-1", fullWidthClasses)}>
      {label ? (
        <Label
          htmlFor={id}
          className={clsx(error ? "text-red-500" : "text-gray-700")}
        >
          {label}
        </Label>
      ) : null}
      <Input
        {...rest}
        readOnly={readOnly}
        spellCheck={spellCheck ?? false}
        tabIndex={0}
        onKeyDown={onKeyDown}
        type={type}
        name={name ?? id}
        id={id}
        autoComplete={autoComplete}
        ref={ref}
        required={required}
        placeholder={placeholder}
        value={value as string}
        disabled={disabled}
        className={className}
        onChange={(e) => onChange?.(e, e.target.value)}
        variant={error ? "error" : "default"}
        icon={icon}
        error={error}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        dirtyAnimation={dirtyAnimation}
      />
    </label>
  );
};

export default TextField;
