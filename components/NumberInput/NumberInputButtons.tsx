import { Button } from "../ui/button";

export const IncrementButton = (
  props: React.ComponentPropsWithoutRef<typeof Button> & {
    ref: React.RefObject<HTMLButtonElement>;
  }
) => {
  return (
    <Button
      ref={props.ref}
      {...props}
      className="order-1 rounded-l-none border-l-0"
      variant="default"
      size="sm"
      disabled={props.disabled}
    />
  );
};

export const DecrementButton = (
  props: React.ComponentPropsWithoutRef<typeof Button> & {
    ref: React.RefObject<HTMLButtonElement>;
  }
) => {
  return (
    <Button
      ref={props.ref}
      {...props}
      variant="default"
      size="sm"
      className="rounded-r-none border-r-0"
      disabled={props.disabled}
    />
  );
};
