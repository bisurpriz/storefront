import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { CheckCheck, CheckCircleIcon } from "lucide-react";
import { FC, InputHTMLAttributes, LegacyRef } from "react";

const inputVariants = cva(
  "flex h-9 border-2 w-full placeholder:text-xs lg:placeholder:text-sm rounded-md  border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  ref?: LegacyRef<HTMLInputElement>;
  icon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  dirtyAnimation?: boolean;
}

const Input: FC<InputProps> = ({
  className,
  type,
  ref,
  size,
  variant,
  icon,
  error,
  errorMessage,
  placeholder,
  dirtyAnimation,
  ...props
}) => {
  const hasIconClasses = icon ? "pl-10" : "";

  return (
    <>
      <div className="relative">
        {!!icon && (
          <span
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
            )}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(inputVariants({ variant }), className, hasIconClasses)}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        {dirtyAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CheckCheck className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />
          </motion.div>
        )}
      </div>
      {error && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </>
  );
};

Input.displayName = "Input";

export { Input };
