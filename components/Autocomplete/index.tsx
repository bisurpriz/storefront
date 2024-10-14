"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import OptionList from "./AutoCompleteList";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, SquareX } from "lucide-react";

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
  startIcon?: React.ReactNode;
  buttonClass?: string;
}

export default function AutoComplete({
  options,
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
  startIcon,
  buttonClass,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<AutoCompleteOption | null>(
    value
  );

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const { isTablet } = useResponsive();

  if (!isTablet) {
    return (
      <Popover
        open={open}
        onOpenChange={readOnly || disabled ? undefined : setOpen}
      >
        <PopoverTrigger
          asChild
          aria-readonly={readOnly || disabled}
          disabled={readOnly || disabled}
        >
          <Label className="flex flex-col gap-1">
            {label}
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("justify-between", buttonClass)}
              type="button"
              aria-readonly={readOnly}
            >
              <div className="flex items-center gap-2 truncate max-w-full">
                {startIcon && startIcon}
                {selectedValue ? selectedValue.label : placeholder}
              </div>
              {selectedValue ? (
                <SquareX
                  className="ml-auto h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedValue(null);
                    onChange(null);
                  }}
                />
              ) : (
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              )}
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
              setSelectedValue(value);
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
    <Drawer
      open={open}
      onOpenChange={readOnly || disabled ? undefined : setOpen}
    >
      <DrawerTrigger asChild disabled={readOnly || disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", buttonClass)}
          type="button"
        >
          <div className="flex items-center gap-2 truncate max-w-full">
            {startIcon && startIcon}
            {selectedValue ? selectedValue.label : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            onInputChange={onInputChange}
            getOptionLabel={getOptionLabel}
            onChange={(value) => {
              setSelectedValue(value);
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
