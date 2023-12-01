import { forwardRef } from "react";

export const NumberInputRoot = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<"div"> & { ownerState: any },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { ownerState, ...other } = props;

    return (
      <div
        ref={ref}
        {...other}
        className="font-normal flex items-center justify-center flex-nowrap text-primary"
      />
    );
  }
);
