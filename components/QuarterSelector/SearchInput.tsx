"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, MapPinnedIcon, SquareX } from "lucide-react";
import { SearchInputProps } from "./types";

export const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  onClear,
  placeholder,
  isLoading,
  isFocused,
  isGeocoding,
}: SearchInputProps) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl p-[1px]",
        "transition-all duration-300 ease-in-out",
        "bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20",
        "hover:from-primary/40 hover:via-secondary/40 hover:to-tertiary/40",
        "focus-within:from-primary focus-within:via-secondary focus-within:to-tertiary",
        "shadow-sm hover:shadow-md",
      )}
    >
      <div className="relative overflow-hidden rounded-[10px]">
        <Input
          icon={
            <MapPinnedIcon
              className={cn(value ? "text-white" : "text-primary")}
            />
          }
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={false}
          placeholder={placeholder ?? "Teslimat adresinizi giriniz"}
          aria-label="Adres arama"
          aria-expanded={false}
          aria-autocomplete="list"
          aria-controls="predictions-list"
          className={cn(
            "h-12 w-full border-none bg-background px-4 py-3 font-medium",
            "transition-all duration-300 ease-in-out",
            "placeholder:text-gray-400 placeholder:transition-colors",
            "focus:ring-0 focus:ring-offset-0",
            {
              "bg-gradient-to-r from-primary to-secondary pr-10 text-white placeholder:text-white/70":
                value,
              "cursor-not-allowed opacity-70": isLoading || isGeocoding,
            },
          )}
          disabled={isGeocoding}
        />
        <div
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            "flex items-center space-x-2",
          )}
        >
          {(isLoading || isGeocoding) && (
            <Loader2
              className={cn(
                "h-5 w-5 animate-spin transition-colors duration-300",
                value ? "text-white" : "text-gray-400",
              )}
            />
          )}
          {value && !isLoading && !isGeocoding && (
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-7 w-7 rounded-full p-0",
                "transition-all duration-300 hover:scale-110",
                "bg-white/10 hover:bg-white/20",
                "text-white hover:text-white",
              )}
              onClick={onClear}
              disabled={isGeocoding}
            >
              <SquareX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
