import Button from "../Button";

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
      color={props.color}
      size="small"
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
      color={props.color}
      size="small"
      className="rounded-r-none border-r-0"
      disabled={props.disabled}
    />
  );
};
