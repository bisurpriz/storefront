import * as React from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { IoAdd, IoRemove } from "react-icons/io5";
import { DecrementButton, IncrementButton } from "./NumberInputButtons";
import { NumberInputRoot } from "./NumberInputRoot";
import { NumberCustomInput } from "./NumberCustomInput";
import { NumberInputProps } from "./NumberInputProps";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: NumberInputRoot,
        input: NumberCustomInput,
        incrementButton: IncrementButton,
        decrementButton: DecrementButton,
      }}
      slotProps={{
        incrementButton: {
          children: <IoAdd fontSize="small" />,
          color: props.color,
        },
        decrementButton: {
          children: <IoRemove fontSize="small" />,
          color: props.color,
        },
        input: {
          disabled: props.disabled,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
