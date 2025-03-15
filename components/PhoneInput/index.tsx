"use client";

import clsx from "clsx";
import { ChangeEvent, FC, useCallback, useMemo } from "react";
import TextField from "../TextField";

interface PhoneInputProps extends Omit<TextFieldProps, "onChange"> {
  onChange?: (value: string) => void;
  /**
   * Whether to always include country code in the stored value
   * @default true
   */
  includeCountryCode?: boolean;
  /**
   * Whether to enforce the Turkish phone number format
   * @default true
   */
  enforceFormat?: boolean;
}

// Constants for Turkish phone numbers
const COUNTRY_CODE = "90";
const MAX_LOCAL_LENGTH = 10; // Turkish mobile numbers are 10 digits (excluding country code)
const TOTAL_MAX_LENGTH = COUNTRY_CODE.length + MAX_LOCAL_LENGTH;

// Valid Turkish mobile prefixes (first 3 digits after country code)
const VALID_TR_PREFIXES = new Set([
  "501",
  "505",
  "506",
  "507",
  "551",
  "552",
  "553",
  "554",
  "555",
  "559",
  "530",
  "531",
  "532",
  "533",
  "534",
  "535",
  "536",
  "537",
  "538",
  "539",
  "540",
  "541",
  "542",
  "543",
  "544",
  "545",
  "546",
  "547",
  "548",
  "549",
  "561",
  "562",
  "563",
  "564",
  "565",
  "566",
  "567",
  "568",
  "569",
]);

const PhoneInput: FC<PhoneInputProps> = ({
  value = "",
  onChange,
  error,
  errorMessage,
  disabled,
  label = "Telefon Numarası",
  required,
  placeholder = "+90 5XX XXX XX XX",
  fullWidth = true,
  className,
  id,
  name,
  includeCountryCode = true,
  enforceFormat = true,
  ...rest
}) => {
  // Normalize the input value to a standard format (digits only)
  const normalizeValue = useCallback(
    (input: string): string => {
      // Remove all non-digit characters
      const digitsOnly = input.replace(/\D/g, "");

      // Handle country code
      if (includeCountryCode) {
        // If it already has the country code, use it as is
        if (digitsOnly.startsWith(COUNTRY_CODE)) {
          return digitsOnly.slice(0, TOTAL_MAX_LENGTH);
        }
        // Otherwise, add the country code
        return `${COUNTRY_CODE}${digitsOnly.slice(0, MAX_LOCAL_LENGTH)}`;
      }

      // If we don't need to include country code, just return the local part
      return digitsOnly.slice(0, MAX_LOCAL_LENGTH);
    },
    [includeCountryCode],
  );

  // Format the value for display
  const formattedValue = useMemo(() => {
    if (!value) return "";

    const normalized = normalizeValue(value);

    // Extract the local part (without country code)
    const localPart = normalized.startsWith(COUNTRY_CODE)
      ? normalized.slice(COUNTRY_CODE.length)
      : normalized;

    if (!localPart) return includeCountryCode ? "+90" : "";

    // Format the local part with spaces
    const part1 = localPart.slice(0, 3);
    const part2 = localPart.slice(3, 6);
    const part3 = localPart.slice(6, 8);
    const part4 = localPart.slice(8);

    const formattedLocal = [part1, part2, part3, part4]
      .filter(Boolean)
      .join(" ");

    return includeCountryCode ? `+90 ${formattedLocal}` : formattedLocal;
  }, [value, includeCountryCode, normalizeValue]);

  // Validate if the number is a valid Turkish mobile number
  const isValidTurkishMobile = useMemo(() => {
    if (!value) return true; // Empty is considered valid (validation should be handled by required prop)

    const normalized = normalizeValue(value);

    // Must have at least 3 digits after country code
    if (normalized.length < COUNTRY_CODE.length + 3) return false;

    // Check if the prefix is valid for Turkish mobile numbers
    const prefix = normalized.startsWith(COUNTRY_CODE)
      ? normalized.slice(COUNTRY_CODE.length, COUNTRY_CODE.length + 3)
      : normalized.slice(0, 3);

    return VALID_TR_PREFIXES.has(prefix);
  }, [value, normalizeValue]);

  // Handle input changes
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const normalized = normalizeValue(inputValue);
      onChange?.(normalized);
    },
    [onChange, normalizeValue],
  );

  // Determine if there's a format error
  const hasFormatError = enforceFormat && value && !isValidTurkishMobile;
  const displayError = error || hasFormatError;
  const displayErrorMessage = hasFormatError
    ? "Geçerli bir Türk cep telefonu numarası giriniz"
    : errorMessage;

  return (
    <TextField
      {...rest}
      value={formattedValue}
      onChange={handleInputChange}
      error={displayError}
      errorMessage={displayErrorMessage}
      disabled={disabled}
      label={label}
      required={required}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type="tel"
      autoComplete="tel"
      className={clsx(
        "text-sm",
        displayError ? "border-red-500" : "border-gray-300",
        className,
      )}
      id={id}
      name={name}
      aria-invalid={displayError ? "true" : "false"}
    />
  );
};

export default PhoneInput;
