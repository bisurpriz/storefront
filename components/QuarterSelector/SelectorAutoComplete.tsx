"use client";

import {
  useAutocomplete,
  UseAutocompleteProps,
} from "@mui/base/useAutocomplete";
import { Button } from "@mui/base/Button";
import { Popper } from "@mui/base/Popper";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import clsx from "clsx";
import { GrClear } from "react-icons/gr";
import { BsChevronDown } from "react-icons/bs";
import { ForwardedRef, forwardRef } from "react";

export type Option = {
  label: string;
  value: string | number;
};

const SelectorAutoComplete = forwardRef(function Autocomplete(
  props: UseAutocompleteProps<Option[][number], false, false, false>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    onInputChange,
    isOptionEqualToValue,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
  } = useAutocomplete({
    selectOnFocus: true,
    autoComplete: false,
    onInputChange,
    componentName: "SelectorAutoComplete",
    ...props,
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <>
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={clsx(
          "relative flex items-center w-full bg-white border border-solid border-pink-100  rounded-lg",
          "transition-shadow duration-200 ease-in-out",
          focused && "shadow-pink-100",
          !focused && "shadow-[0_4px_30px_transparent]"
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
          className={clsx(
            "w-full p-2 text-sm outline-0 bg-transparent",
            "transition-shadow duration-200 ease-in-out",
            focused && "shadow-pink-100",
            !focused && "shadow-[0_4px_30px_transparent]"
          )}
          placeholder="Lütfen gönderim yapılacak ilçeyi seçin"
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-pink-100 hover:cursor-pointer"
          >
            <GrClear className="translate-y-[2px] scale-90" />
          </Button>
        )}
        <Button
          {...getPopupIndicatorProps()}
          className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-pink-100 hover:cursor-pointer"
        >
          <BsChevronDown
            className={clsx(
              "translate-y-[2px]",
              "transition-transform duration-200 ease-in-out",
              popupOpen && "rotate-180"
            )}
          />
        </Button>
      </div>
      {anchorEl && options.length > 0 && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: clsx("relative z-[1001]"),
            },
          }}
          style={{
            width: anchorEl.clientWidth,
          }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, -4],
              },
            },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0  rounded-xl overflow-auto outline-0 max-h-[30vh] z-[1] bg-white w-full  border border-solid border-pink-100  text-gray-900  shadow-[0_4px_30px_transparent] shadow-pink-100 "
          >
            {options.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <li
                  {...optionProps}
                  key={option.value}
                  className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-pink-100  aria-selected:text-pink-900  ui-focused:bg-gray-100  ui-focus-visible:bg-gray-100  ui-focused:text-gray-900  ui-focus-visible:text-gray-900  ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-pink-200  ui-focused:aria-selected:bg-pink-100  ui-focus-visible:aria-selected:bg-pink-100  ui-focused:aria-selected:text-pink-900  ui-focus-visible:aria-selected:text-pink-900"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </Popper>
      )}
    </>
  );
});

export default SelectorAutoComplete;
