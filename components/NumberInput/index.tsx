import React, { useCallback, useEffect, useRef } from "react";

export interface NumberInputProps {
  value?: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  precision?: number;
  label?: string;
  className?: string;
  mask?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  id?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  placeholder,
  disabled,
  precision = 0,
  label,
  className,
  mask,
  autoFocus = false,
  onBlur,
  icon,
  iconPosition = "right",
  id,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const formatValue = (val?: number) => {
    if (mask) {
      const maskedValue = val.toFixed(precision).replace(/[.,]/, mask);
      return maskedValue;
    }
    return val?.toFixed(precision);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const unmaskedValue = inputValue.replace(new RegExp(`[${mask}]`, "g"), "");
    const parsedValue = parseFloat(unmaskedValue);

    if (!isNaN(parsedValue)) {
      const roundedValue = parseFloat(parsedValue.toFixed(precision));
      if (roundedValue >= min && roundedValue <= max) {
        onChange(roundedValue);
      }
    }
  };

  const increment = useCallback(() => {
    if (value < max) {
      onChange(roundToPrecision(value + step, precision));
    }
  }, [value, max, step, onChange, precision]);

  const decrement = useCallback(() => {
    if (value > min) {
      onChange(roundToPrecision(value - step, precision));
    }
  }, [value, min, step, onChange, precision]);

  const roundToPrecision = (number: number, precision: number) => {
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {icon && iconPosition === "left" && <div className="mr-2">{icon}</div>}
      {label && <label className="mr-2">{label}</label>}
      <button
        className="bg-primary text-white px-2 py-1 rounded-l hover:bg-primary-dark"
        onClick={decrement}
        disabled={value <= min || disabled}
      >
        -
      </button>
      <input
        name={id}
        id={id}
        type="text"
        value={formatValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        ref={inputRef}
        onBlur={handleBlur}
        className="px-2 py-1 text-center w-16"
      />
      <button
        className="bg-primary text-white px-2 py-1 rounded-r hover:bg-primary-dark"
        onClick={increment}
        disabled={value >= max || disabled}
      >
        +
      </button>
      {icon && iconPosition === "right" && <div className="ml-2">{icon}</div>}
    </div>
  );
};

export default NumberInput;
