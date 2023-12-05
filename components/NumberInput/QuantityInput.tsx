import NumberInput from ".";
import { NumberInputProps } from "./NumberInputProps";

export interface QuantityInputProps extends NumberInputProps {}

export default function QuantityInput({ ...props }: QuantityInputProps) {
  return (
    <NumberInput
      {...props}
      aria-label="Quantity Input"
      min={1}
      max={99}
      disabled={true}
    />
  );
}
