"use client";

import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import Clear from "../Icons/Clear";
import ChevronDown from "../Icons/ChevronDown";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { Popper } from "@mui/base/Popper";
import clsx from "clsx";

export type AutoCompleteOption = Pick<DropdownOption, "label" | "value"> & {
  [key: string]: any;
};

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
    anchorEl,
    setAnchorEl,
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

  const ref = React.useRef(null);

  const rootRef = useForkRef(ref, setAnchorEl);

  const hasClearIcon = !disabled && dirty && !readOnly;

  const hasErrorClass = error
    ? "border-red-500 ring-red-500 focus-within:ring-1 focus-within:ring-red-500"
    : "";

  const disabledClass = disabled
    ? "!bg-gray-100 text-gray-500 cursor-not-allowed hover:border-gray-200"
    : "";

  return (
    <div>
      <label
        className={`relative text-xs font-medium text-gray-700 flex flex-col gap-1 w-fit
        ${error ? "text-red-500" : ""}
      `}
      >
        {label ? <p>{label}</p> : null}
        <div
          {...getRootProps()}
          ref={rootRef}
          className={clsx(
            "flex gap-[5px] overflow-hidden w-80 rounded-lg bg-white  border border-solid border-gray-200  hover:border-primary-400 focus-visible:outline-0 shadow-[0_2px_4px_rgb(0_0_0_/_0.05)] ",
            !focused && "shadow-[0_2px_2px_transparent] shadow-gray-50 ",
            focused &&
              "border-primary-400 shadow-[0_0_0_3px_transparent] shadow-primary-200 ",
            hasErrorClass,
            disabledClass
          )}
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
            className={clsx(
              "text-sm leading-[1.5] text-gray-900  bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto",
              disabledClass,
              className
            )}
            placeholder={placeholder}
            aria-label={label}
            autoComplete={"new-password"}
            readOnly={readOnly}
            disabled={disabled}
          />

          {hasClearIcon && (
            <button
              {...getClearProps()}
              type="button"
              className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-primary-100  hover:cursor-pointer"
            >
              <Clear />
            </button>
          )}

          <button
            {...getPopupIndicatorProps()}
            className={clsx(
              "self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-primary-100  hover:cursor-pointer",
              error ? "text-red-500 hover:text-red-700" : ""
            )}
            disabled={disabled}
          >
            <ChevronDown
              className={clsx("translate-y-[2px]", popupOpen && "rotate-180")}
            />
          </button>
        </div>
        {error && errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </label>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: "relative z-[1001] w-80",
            },
          }}
          modifiers={[
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0 min-w-[320px] rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] bg-white  border border-solid border-gray-200  text-gray-900  shadow-[0_4px_30px_transparent] shadow-gray-200 "
          >
            {(groupedOptions as DropdownOption[]).map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                key={option.value}
                className="list-none p-2 rounded-lg cursor-default 
                last-of-type:border-b-0 hover:cursor-pointer 
                aria-selected:bg-primary-100  aria-selected:text-primary-900 
                 ui-focused:bg-gray-100  ui-focus-visible:bg-gray-100
                   ui-focused:text-gray-900  ui-focus-visible:text-gray-900
                     ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-primary-200  
                     ui-focused:aria-selected:bg-primary-100  ui-focus-visible:aria-selected:bg-primary-100
                      ui-focused:aria-selected:text-primary-900 ui-focus-visible:aria-selected:text-primary-900 
                      "
              >
                {option.label}
              </li>
            ))}
          </ul>
        </Popper>
      )}
    </div>
  );
}
