import type { SVGProps } from "react";
const Send = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...props}
  >
    <path fill="currentColor" d="m16 464 480-208L16 48v160l320 48-320 48Z" />
  </svg>
);
export default Send;
