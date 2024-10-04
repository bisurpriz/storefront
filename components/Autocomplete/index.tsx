"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import OptionList from "./AutoCompleteList";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";

export type AutoCompleteOption = Pick<DropdownOption, "label" | "value"> & {
  [key: string]: any;
};

export interface AutoCompleteProps {
  options: AutoCompleteOption[];
  onChange: (value: AutoCompleteOption | AutoCompleteOption[]) => void;
  value?: AutoCompleteOption | null;
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
  getOptionLabel,
  disabled,
  readOnly,
  error,
  errorMessage,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const { isTablet } = useResponsive();

  if (!isTablet) {
    return (
      <Popover open={open} onOpenChange={readOnly ? undefined : setOpen}>
        <PopoverTrigger asChild aria-readonly={readOnly}>
          <Label className="flex flex-col gap-1">
            {label}
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
              type="button"
              aria-readonly={readOnly}
            >
              {value
                ? options.find((option) => option.value === value.value)?.label
                : placeholder}
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
            {error && errorMessage && (
              <span className="text-xs text-red-500">{errorMessage}</span>
            )}
          </Label>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" side="bottom">
          <OptionList
            onInputChange={onInputChange}
            getOptionLabel={getOptionLabel}
            onChange={(value) => {
              console.log(value, "burada la");
              onChange(value);
              setOpen(false);
            }}
            options={options}
            inputValue={inputValue}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
          type="button"
        >
          {value
            ? options.find((option) => option.value === value.value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            onInputChange={onInputChange}
            getOptionLabel={getOptionLabel}
            onChange={(value) => {
              onChange(value);
              setOpen(false);
            }}
            options={options}
            inputValue={inputValue}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
