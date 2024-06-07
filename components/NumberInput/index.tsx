"use client";

import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { IoAdd, IoRemove } from "react-icons/io5";
import { DecrementButton, IncrementButton } from "./NumberInputButtons";
import { NumberInputRoot } from "./NumberInputRoot";
import { NumberCustomInput } from "./NumberCustomInput";
import { NumberInputProps } from "./NumberInputProps";
import { ForwardedRef, forwardRef } from "react";

const NumberInput = forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: ForwardedRef<HTMLDivElement>
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
          disabled: props.disabled,
        },
        decrementButton: {
          children: <IoRemove fontSize="small" />,
          color: props.color,
          disabled: props.disabled,
        },
        input: {
          color: props.color,
          disabled: true,
          className: "select-none",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
