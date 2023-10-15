// components/TextInput.tsx
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  id: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  maxLength?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactElement;
  successIcon?: React.ReactElement;
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  errorMessage,
  required = false,
  id,
  placeholder,
  className,
  onChange,
  disabled = false,
  autoComplete = 'on',
  autoFocus = false,
  type = 'text',
  maxLength,
  prefix,
  suffix,
  icon,
  successIcon,
  value,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleFocus);
      inputRef.current.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleFocus);
        inputRef.current.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  const hasError = !!errorMessage;
  const hasSuccess = !!successIcon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium text-gray-700 ${
            hasError ? 'text-red-600' : hasSuccess ? 'text-green-600' : focused ? 'text-indigo-600' : ''
          }`}
          htmlFor={id}
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        {prefix && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600">{prefix}</div>}
        <input
          {...props}
          ref={inputRef}
          className={`block w-full px-3 py-2 pl-10 text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 ${
            hasError ? 'border-red-500' : hasSuccess ? 'border-green-500' : focused ? 'border-indigo-600' : ''
          }`}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          type={type}
          maxLength={maxLength}
          value={value}
        />
        {suffix && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-600">{suffix}</div>}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600">
            {icon}
          </div>
        )}
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-600">
            <FiAlertCircle />
          </div>
        )}
        {hasSuccess && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
            {successIcon}
          </div>
        )}
      </div>
      {hasError && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
