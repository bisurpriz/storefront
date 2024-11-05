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
import { cva } from "class-variance-authority";

export type AutoCompleteOption = Pick<DropdownOption, "label" | "value"> & {
  [key: string]: any;
};

const inputVariants = cva(
  "flex h-9 border-2 w-full rounded-md  border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input text-foreground placeholder-text-muted-foreground focus-visible:ring-ring focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2",
        error:
          "border-red-300 text-red-900 placeholder-text-red-300 focus:ring-red-500 focus:border-red-500 focus-visible:outline-none focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500",
        success:
          "border-green-300 text-green-900 placeholder-text-green-300 focus:ring-green-500 focus:border-green-500 focus-visible:outline-none focus-visible:ring-green-500 focus-visible:ring-2 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

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
  variant?: "default" | "error" | "success";
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
  variant,
  errorMessage,
  startIcon,
  buttonClass,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [updatedOptions, setUpdatedOptions] =
    useState<AutoCompleteOption[]>(options);

  const { isTablet } = useResponsive();

  useEffect(() => {
    setUpdatedOptions(options);
  }, [options]);

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
              className={cn(
                "justify-between",
                inputVariants({ variant }),
                buttonClass
              )}
              type="button"
              aria-readonly={readOnly}
            >
              <div className="flex items-center gap-2 truncate max-w-full">
                {startIcon && startIcon}
                {value ? value.label : placeholder}
              </div>
              {value ? (
                <SquareX
                  className={cn(
                    "ml-auto h-4 w-4 shrink-0 opacity-50 hover:opacity-100",
                    { "hover:opacity-50": disabled }
                  )}
                  onClick={(e) => {
                    if (disabled) return;
                    e.stopPropagation();
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
              onChange(value);
              setOpen(false);
            }}
            options={updatedOptions}
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
        <Label className="flex flex-col gap-1">
          {label}
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between w-full", buttonClass)}
            type="button"
          >
            <div className="flex items-center gap-2 truncate max-w-full">
              {startIcon && startIcon}
              {value ? value.label : placeholder}
            </div>
            {value ? (
              <SquareX
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 opacity-50 hover:opacity-100",
                  { "hover:opacity-50": disabled }
                )}
                onClick={(e) => {
                  if (disabled) return;
                  e.stopPropagation();
                  onChange(null);
                }}
              />
            ) : (
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </Label>
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
            options={updatedOptions}
            inputValue={inputValue}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
