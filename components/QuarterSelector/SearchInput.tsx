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
    <div className="relative">
      <Input
        icon={
          <MapPinnedIcon
            className={cn("h-5 w-5 text-gray-400 transition-colors", {
              "text-white": value,
            })}
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
          "h-auto w-full border-none bg-background p-4 pr-8 font-medium transition-all",
          "focus:ring-2 focus:ring-primary/20",
          {
            "bg-primary pr-10 text-white placeholder:text-white/70": value,
            "ring-2 ring-primary/20": isFocused,
            "opacity-70": isLoading || isGeocoding,
          },
        )}
        disabled={isGeocoding}
      />
      {(isLoading || isGeocoding) && (
        <Loader2
          className={cn(
            "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin",
            { "text-white": value, "text-gray-400": !value },
          )}
        />
      )}
      {value && !isLoading && !isGeocoding && (
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0",
            { "text-white hover:text-white/80": value },
          )}
          onClick={onClear}
          disabled={isGeocoding}
        >
          <SquareX className="h-4 w-4" />
        </Button>
      )}
      <div
        className={cn(
          "absolute -inset-[2px] -z-[1] rounded-md transition-opacity",
          "bg-gradient-to-bl from-primary via-secondary to-tertiary",
          {
            "opacity-100": value || isFocused,
            "opacity-70": !value && !isFocused,
          },
        )}
      />
    </div>
  );
};
