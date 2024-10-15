import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface NumberInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function NumberInput({
  defaultValue = 1,
  onChange,
  disabled,
  max = Infinity,
  min = 1,
  step = 1,
}: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(defaultValue + step, max);
    onChange(newValue);
    return newValue;
  };

  const handleDecrement = () => {
    const newValue = Math.max(defaultValue - step, min);
    onChange(newValue);
    return newValue;
  };

  return (
    <div className="inline-flex items-center rounded-md shadow-sm">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={disabled || defaultValue <= min}
        aria-label="Azalt"
        className="rounded-l-md rounded-r-none border-r-0 h-8 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="flex items-center justify-center h-8 w-10 border-y border-input bg-background text-center text-sm font-medium">
        <span aria-live="polite" aria-label="Adet Sayısı">
          {defaultValue}
        </span>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={disabled || defaultValue >= max}
        aria-label="Artır"
        className="rounded-r-md rounded-l-none border-l-0 h-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
