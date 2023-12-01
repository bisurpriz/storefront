import { forwardRef } from "react";

export const NumberCustomInput = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<"input"> & { ownerState: any },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { ownerState, ...other } = props;

    return (
      <input
        ref={ref}
        {...other}
        className="text-lg font-normal leading-5
        bg-white dark:slate-50
        border dark:border-slate-200
        rounded-md
        px-1 py-2
        focus:outline-none focus:border-primary shadow-outline focus:ring-1 focus:ring-primary
        transition-colors duration-200
        focus-visible:outline-none
        w-16
        text-center
        border-x-0
        "
        autoComplete="off"
      />
    );
  }
);
