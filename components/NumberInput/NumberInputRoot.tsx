export const NumberInputRoot = (
  props: React.ComponentPropsWithoutRef<"div"> & {
    ownerState: any;
    ref: React.RefObject<HTMLDivElement>;
  }
) => {
  const { ownerState, ref, ...other } = props;

  return (
    <div
      ref={ref}
      {...other}
      className="font-normal flex items-center justify-center flex-nowrap text-primary"
    />
  );
};
