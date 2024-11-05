"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { ComponentPropsWithRef, FC } from "react";

const RadioGroup: FC<
  ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>
> = ({ className, ref, ...props }) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
};
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem: FC<
  ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>
> = ({ className, ref, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
