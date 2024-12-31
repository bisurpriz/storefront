import { Loader } from "lucide-react";

const Spinner = ({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div role="status" className={className}>
      <Loader
        className="animate-spin"
        style={{
          ...style,
          width: "1em",
          height: "1em",
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
