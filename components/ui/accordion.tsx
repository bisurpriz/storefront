"use client";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithRef, FC } from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>
> = ({ className, ref, ...props }) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "mb-2 rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 last:mb-0 hover:shadow-sm",
      className,
    )}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>
> = ({ className, children, ref, ...props }) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full items-center justify-between rounded-t-lg px-4 py-3 text-left text-sm font-medium text-gray-900 transition-all duration-200",
        "hover:bg-gray-50/80",
        "data-[state=open]:rounded-b-none data-[state=open]:bg-gray-50/80",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronDownIcon className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ease-out group-hover:text-gray-700" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Content>
> = ({ className, children, ref, ...props }) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "bg-gray-50/50",
    )}
    {...props}
  >
    <div className={cn("px-4 pb-4 pt-2 text-gray-700", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
