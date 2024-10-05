import React, { FC } from "react";
import NumberInput from "../QuantityInput";

type Values = {
  min: number;
  max: number;
};
type PriceInputProps = {
  min: number;
  max?: number;
  step: number;
  values: Values;
  onChange: (values: Values) => void;
};

const PriceInput: FC<PriceInputProps> = ({
  max = Infinity,
  min,
  onChange,
  step,
  values,
}) => {
  return (
    <>
      <span className="flex items-center gap-1 justify-between mb-2">
        <span className="text-gray-500 text-sm font-semibold ">En az</span>
        <NumberInput
          defaultValue={values.min}
          onChange={(min) => {
            onChange({ ...values, min });
          }}
          min={min}
          max={values.max}
          step={step}
        />
      </span>
      <span className="flex items-center gap-1 justify-between">
        <span className="text-gray-500 text-sm font-semibold ">En fazla</span>
        <NumberInput
          defaultValue={values.max}
          onChange={(max) => {
            onChange({ ...values, max });
          }}
          min={values.min}
          max={max}
          step={step}
        />
      </span>
    </>
  );
};

export default PriceInput;
