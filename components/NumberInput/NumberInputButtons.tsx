import { forwardRef } from "react";
import Button from "../Button";

export const IncrementButton = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<typeof Button>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        className="order-1 rounded-l-none border-l-0"
        color="primary"
        size="small"
      />
    );
  }
);

export const DecrementButton = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<typeof Button>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        color="primary"
        size="small"
        className="rounded-r-none border-r-0"
      />
    );
  }
);
