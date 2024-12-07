import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center select-none justify-center text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary ",
        sale: "bg-red-100 text-red-700 ",
        new: "bg-blue-100 text-blue-700 ",
        discount: "bg-green-100 text-green-700 ",
        soldOut: "bg-gray-100 text-gray-700 ",
        freeShipping: "bg-purple-100 text-purple-700 ",
      },
      size: {
        default: "h-6 px-2 rounded",
        sm: "h-5 px-1.5 rounded-sm",
        lg: "h-7 px-3 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
