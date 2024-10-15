import type { SVGProps } from "react";
const Package = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12 3 8 4.5v9L12 21l-8-4.5v-9zm0 9 8-4.5M12 12v9m0-9L4 7.5m12-2.25-8 4.5"
    />
  </svg>
);
export default Package;
