import clsx from 'clsx';
import React from 'react';

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
  ariaChecked?: boolean | 'mixed';
  ariaDisabled?: boolean;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  label;
}

const Checkbox = ({
  checked,
  onChange,
  ariaChecked = checked,
  ariaDescribedBy = '',
  ariaDisabled = false,
  ariaInvalid = false,
  ariaLabel = '',
  ariaLabelledBy = '',
  ariaRequired = false,
  autoFocus = false,
  className = '',
  disabled = false,
  id,
  name,
  readOnly,
  required,
  tabIndex,
  value,
  label,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange(checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        'inline-flex items-center cursor-pointer select-none relative pl-6 pr-3 py-2 text-gray-700',
        className,
        disabled && 'opacity-50 cursor-not-allowed',
        readOnly && 'opacity-50 cursor-not-allowed'
      )}
    >
      <p className="m-0 p-0 text-sm leading-5 font-medium text-gray-900">
        {label}
      </p>
      <input
        className={clsx(
          'absolute opacity-0 cursor-pointer h-0 w-0',
          disabled && 'opacity-0',
          readOnly && 'opacity-0'
        )}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-checked={ariaChecked}
        aria-describedby={ariaDescribedBy || `${id}-description`}
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
      />
      <div
        className={clsx(
          'absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rounded border-2 transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center',
          checked ? 'bg-primary border-primary' : 'bg-white border-gray-400',
          disabled && 'bg-gray-200 border-gray-200',
          readOnly && 'bg-gray-200 border-gray-200'
        )}
      >
        <svg
          className={clsx(
            'text-white fill-current stroke-2',
            checked ? 'block' : 'hidden'
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
