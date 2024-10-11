import type { SVGProps } from "react";
const Confirm = (props: SVGProps<SVGSVGElement>) => (
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
      <path
        strokeDasharray={60}
        strokeDashoffset={60}
        d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="60;0"
        />
      </path>
      <path strokeDasharray={14} strokeDashoffset={14} d="m8 12 3 3 5-5">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="14;0"
        />
      </path>
    </g>
  </svg>
);
export default Confirm;
