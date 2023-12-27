import NumberInput from ".";
import type { NumberInputProps } from "./NumberInputProps";

export interface QuantityInputProps extends NumberInputProps {}

export default function QuantityInput({ ...props }: QuantityInputProps) {
  return (
    <NumberInput
      aria-label="Quantity Input"
      min={1}
      max={99}
      color="secondary"
      readOnly
      {...props}
    />
  );
}
