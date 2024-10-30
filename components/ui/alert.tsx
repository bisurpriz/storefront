import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, Ref } from "react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-3 py-2 text-xs [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3 [&>svg]:text-foreground [&>svg~*]:pl-6",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        informative:
          "border-sky-600/50 text-sky-600 dark:border-sky-600 dark:text-sky-600 [&>svg]:text-sky-600",
        success:
          "border-success/50 text-success dark:border-success dark:text-success [&>svg]:text-success",
        warning:
          "border-warning/50 text-warning dark:border-warning dark:text-warning [&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert: FC<
  HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & {
      ref?: Ref<HTMLDivElement>;
    }
> = ({ className, variant, ref, ...props }) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);
Alert.displayName = "Alert";

const AlertTitle: FC<
  HTMLAttributes<HTMLHeadingElement> & {
    ref?: Ref<HTMLParagraphElement>;
  }
> = ({ className, ref, ...props }) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription: FC<
  HTMLAttributes<HTMLParagraphElement> & {
    ref?: Ref<HTMLParagraphElement>;
  }
> = ({ className, ref, ...props }) => (
  <div
    ref={ref}
    className={cn("text-xs [&_p]:leading-relaxed", className)}
    {...props}
  />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
