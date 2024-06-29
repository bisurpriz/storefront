import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { MdClear } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

export type AutoCompleteOption = Pick<DropdownOption, "label" | "value">;

export interface AutoCompleteProps {
  options: AutoCompleteOption[];
  onChange: (value: AutoCompleteOption | AutoCompleteOption[]) => void;
  value?: AutoCompleteOption | AutoCompleteOption[] | null;
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  multiple?: boolean;
  getOptionLabel?: (option: any) => string;
  readOnly?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  disableCloseOnSelect?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export default function AutoComplete({
  options,
  className,
  id,
  label,
  onChange,
  placeholder,
  value,
  inputValue,
  onInputChange,
  multiple,
  getOptionLabel,
  disabled,
  readOnly,
  disableCloseOnSelect,
  autoComplete = "off",
  error,
  errorMessage,
}: AutoCompleteProps) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    dirty,
    getClearProps,
    getPopupIndicatorProps,
    popupOpen,
    value: selectedValue,
  } = useAutocomplete<DropdownOption, typeof multiple, false, false>({
    id,
    options,
    value,
    onChange: (event, newValue) => onChange(newValue),
    inputValue,
    onInputChange: (event, newInputValue) => onInputChange?.(newInputValue),
    multiple,
    getOptionLabel,
    disableCloseOnSelect,
    readOnly,
    disabled,
    isOptionEqualToValue: (option, value) => option.value === value.value,
  });

  const hasClearIcon = !disabled && dirty && !readOnly;

  const hasErrorClass = error
    ? "border-red-500 ring-red-500 focus-within:ring-1 focus-within:ring-red-500"
    : "";

  const disabledClass = disabled ? "bg-gray-100 text-gray-500" : "";

  return (
    <div className="relative">
      <label
        className={`text-xs font-medium text-gray-700 flex flex-col gap-1 
      ${error ? "text-red-500" : ""}
      `}
      >
        {label ? <p>{label}</p> : null}
        <div
          {...getRootProps()}
          className={` ${focused ? "ring-1 ring-primary" : ""} 
            rounded-md
            bg-white 
            border 
            shadow-sm
            focus-within:ring-1 focus-within:ring-primary
            transition-colors duration-200
            focus-visible:outline-none
            overflow-hidden
            flex items-center gap-2
            ${hasErrorClass}
            ${disabledClass}
            `}
        >
          {multiple && (
            <div className="flex gap-1 flex-nowrap whitespace-nowrap">
              {(selectedValue as DropdownOption[])?.map((option) => (
                <span
                  key={option.value}
                  className="px-2 py-1 bg-primary text-white rounded-lg"
                >
                  {option.label}
                </span>
              ))}
            </div>
          )}
          <input
            {...getInputProps()}
            className={`
            text-sm font-normal leading-normal
            text-gray-900
            bg-inherit
            border-none
            px-3 py-2
            outline-none
            flex-1
            ${disabledClass}
            ${className ?? ""}`}
            placeholder={placeholder}
            aria-label={label}
            autoComplete={"off"}
            readOnly={readOnly}
            disabled={disabled}
          />

          {hasClearIcon && (
            <button
              {...getClearProps()}
              type="button"
              className="flex items-center justify-center p-1 text-gray-500 hover:text-gray-700 rounded-lg
            transition-transform duration-200 shadow-sm hover:bg-gray-50"
            >
              <MdClear />
            </button>
          )}

          <button
            {...getPopupIndicatorProps()}
            className={`${popupOpen ? "rotate-180" : ""}
            flex items-center justify-center mr-2 p-1 text-gray-500 hover:text-gray-700 rounded-lg
            transition-transform duration-200 shadow-sm hover:bg-gray-50
            ${error ? "text-red-500 hover:text-red-700" : ""}
          `}
            disabled={disabled}
          >
            <BsChevronDown />
          </button>
        </div>
        {error && errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </label>
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className={`
            absolute text-sm
            left-0
            right-0
            z-10
            overflow-auto
            max-h-60
            outline-none
            rounded-md
            my-3
            bg-white dark:bg-slate-50
            border dark:border-slate-200
            shadow-sm
            focus-within:ring-1 focus-within:ring-primary
            transition-colors duration-200
            focus-visible:outline-none
            w-full
            p-1
            `}
        >
          {(groupedOptions as DropdownOption[]).map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              key={option.value}
              className={`
              list-none
              p-2
              my-1
              rounded-sm
              cursor-pointer
              ${index === groupedOptions.length - 1 ? "border-b-0" : ""}
              hover:bg-primary-light hover:text-white
              aria-selected:bg-primary aria-selected:text-white
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
