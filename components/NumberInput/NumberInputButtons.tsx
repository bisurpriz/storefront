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
        color={props.color}
        size="small"
        disabled={props.disabled}
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
        color={props.color}
        size="small"
        className="rounded-r-none border-r-0"
        disabled={props.disabled}
      />
    );
  }
);
