"use client";

import clsx from "clsx";
import { ChangeEvent, FC } from "react";
import TextField from "../TextField";

interface PhoneInputProps extends Omit<TextFieldProps, "onChange"> {
  onChange?: (value: string) => void;
}

const MAX_PHONE_LENGTH = 12; // +90 + 10 hane

const PhoneInput: FC<PhoneInputProps> = ({
  value = "",
  onChange,
  error,
  errorMessage,
  disabled,
  label = "Telefon Numarası",
  required,
  placeholder = "+90 5XX XXX XXXX",
  fullWidth = true,
  className,
  id,
  name,
  ...rest
}) => {
  const formattedValue = () => {
    if (!value) return "";

    const cleaned = value?.replace(/\D/g, "");
    const hasCountryCode = cleaned.startsWith("90");
    const localNumber = hasCountryCode ? cleaned.slice(2) : cleaned;
    const limitedLocal = localNumber.slice(0, 10);

    const part1 = limitedLocal.slice(0, 3);
    const part2 = limitedLocal.slice(3, 6);
    const part3 = limitedLocal.slice(6);

    const formattedLocal = [part1, part2, part3].filter(Boolean).join(" ");
    return hasCountryCode ? `+90 ${formattedLocal}` : formattedLocal;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    const normalized = rawValue.startsWith("90") ? rawValue : `90${rawValue}`;
    const limitedValue = normalized.slice(0, MAX_PHONE_LENGTH);
    onChange?.(limitedValue);
  };

  return (
    <TextField
      {...rest}
      value={formattedValue()}
      onChange={handleInputChange}
      error={error}
      errorMessage={errorMessage}
      disabled={disabled}
      label={label}
      required={required}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type="tel"
      autoComplete="tel"
      className={clsx(
        "text-sm",
        error ? "border-red-500" : "border-gray-300",
        className,
      )}
      id={id}
      name={name}
    />
  );
};

export default PhoneInput;
