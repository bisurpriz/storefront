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

type Option = {
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
    groupedOptions,
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
          "flex gap-1.5 pr-1.5 w-full h-full overflow-hidden rounded-lg bg-white border border-solid border-pink-100  hover:border-pink-400  focus-visible:outline-0 shadow-[0_2px_4px_rgb(0_0_0_/_0.05)] ",
          !focused && "shadow-[0_2px_2px_transparent] shadow-pink-50 ",
          focused &&
            "border-pink-400 shadow-[0_0_0_3px_transparent] shadow-pink-200"
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
          className={clsx(
            "bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto",
            "text-xl"
          )}
          placeholder="Lütfen gönderim yapılacak ilçeyi seçin"
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-pink-100  hover:cursor-pointer"
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
      {anchorEl && groupedOptions.length > 0 && (
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
            {groupedOptions.map((option, index) => {
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
