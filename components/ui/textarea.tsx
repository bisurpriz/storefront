import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { CheckCheck } from "lucide-react";
import { motion } from "motion/react";
import { FC, TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
  variant?: "default" | "error" | "success";
  dirtyAnimation?: boolean;
}

const inputVariants = cva(
  "flex w-full mt-1 placeholder:text-xs lg:placeholder:text-sm rounded-md border-2 border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
  },
);

const Textarea: FC<TextareaProps> = ({
  className,
  variant,
  ref,
  dirtyAnimation,
  ...props
}) => {
  return (
    <div className="relative">
      <textarea
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
      {dirtyAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          className="absolute right-2 top-3 -translate-y-1/2"
        >
          <CheckCheck className="absolute right-2 top-3 h-6 w-6 -translate-y-1/2 text-green-500" />
        </motion.div>
      )}
    </div>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
