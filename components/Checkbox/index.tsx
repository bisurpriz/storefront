import clsx from "clsx";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaChecked?: boolean | "mixed";
  ariaDisabled?: boolean;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  label;
  ref?: React.Ref<HTMLInputElement>;
}

const Checkbox = ({
  checked,
  onChange,
  ariaChecked = checked,
  ariaDescribedBy = "",
  ariaDisabled = false,
  ariaInvalid = false,
  ariaLabel = "",
  ariaLabelledBy = "",
  ariaRequired = false,
  autoFocus = false,
  className = "",
  disabled = false,
  id,
  name,
  readOnly,
  required,
  tabIndex,
  value,
  label,
  ref,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange(checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        "relative inline-flex cursor-pointer select-none items-center py-2 pl-6 pr-3 text-sm text-gray-700",
        className,
        disabled && "cursor-not-allowed opacity-50",
        readOnly && "cursor-not-allowed opacity-50",
      )}
    >
      <p className="m-0 p-0 leading-5 text-gray-900">{label}</p>
      <input
        className={clsx(
          "absolute h-0 w-0 cursor-pointer opacity-0",
          disabled && "opacity-0",
          readOnly && "opacity-0",
        )}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-checked={ariaChecked}
        aria-describedby={ariaDescribedBy ?? `${id}-description`}
        aria-disabled={ariaDisabled || disabled}
        aria-invalid={ariaInvalid || false}
        aria-label={ariaLabel || label}
        aria-labelledby={ariaLabelledBy || `${id}-label`}
        aria-required={ariaRequired || required}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        name={name}
        readOnly={readOnly}
        required={required}
        tabIndex={tabIndex}
        value={value}
        ref={ref}
      />
      <div
        className={clsx(
          "absolute left-0 top-1/2 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded border-2 transition-all duration-200 ease-in-out",
          checked ? "border-primary bg-primary" : "border-gray-400 bg-white",
          disabled && "border-gray-200 bg-gray-200",
          readOnly && "border-gray-200 bg-gray-200",
        )}
      >
        <svg
          className={clsx(
            "fill-current stroke-2 text-white",
            checked ? "block" : "hidden",
          )}
          viewBox="0 0 24 24"
        >
          <path d="M20.293 6.293L9 17.586l-5.293-5.293-1.414 1.414 6 6 .707.707.707-.707 12-12z" />
        </svg>
      </div>
    </label>
  );
};

export default Checkbox;
