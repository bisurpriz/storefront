"use client";

import * as RPNInput from "react-phone-number-input";
import { cn } from "@/lib/utils";
import { ComponentRef, FC, InputHTMLAttributes } from "react";
import TextField from "../TextField";

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    ref?: ComponentRef<typeof RPNInput.default>;
  };

const PhoneInput: FC<PhoneInputProps & TextFieldProps> = ({
  ref,
  className,
  onChange,
  ...props
}) => {
  return (
    <RPNInput.default
      ref={ref as any}
      className={cn(className)}
      inputComponent={InputComponent}
      defaultCountry="TR"
      countries={["TR"]}
      countrySelectComponent={({ flags }) => flags}
      onChange={(value) => onChange?.(value)}
      countryOptionsOrder={["TR"]}
      {...props}
    />
  );
};
PhoneInput.displayName = "PhoneInput";

const InputComponent: FC<TextFieldProps> = ({ className, ref, ...props }) => (
  <TextField className={cn(className)} {...props} ref={ref} />
);
InputComponent.displayName = "InputComponent";

export { PhoneInput };
