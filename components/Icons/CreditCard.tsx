import type { SVGProps } from "react";
const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <rect width={20} height={14} x={2} y={5} rx={2} />
      <path d="M2 10h20" />
    </g>
  </svg>
);
export default CreditCard;
