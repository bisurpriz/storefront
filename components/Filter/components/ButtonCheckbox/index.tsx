import clsx from "clsx";
import React, { FC } from "react";
import { motion } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";

type ButtonCheckboxProps = {
  onChange: (value: boolean) => void;
  checked: boolean;
  label: string;
};

const labelVariants = {
  active: {
    paddingRight: "2rem",
  },
  inactive: {
    paddingRight: "0.5rem",
  },
  transition: {
    type: "spring",
    stiffness: 700,
    damping: 30,
  },
};

const ButtonCheckbox: FC<ButtonCheckboxProps> = ({
  checked,
  label,
  onChange,
}) => {
  return (
    <motion.label
      className={clsx(
        "relative cursor-pointer whitespace-nowrap font-manrope font-semibold",
        "flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-500",
        {
          "border-primary text-primary": checked,
        },
      )}
      variants={labelVariants}
      initial="inactive"
      animate={checked ? "active" : "inactive"}
      transition={labelVariants.transition}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
      <AnimationExitProvider show={checked}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute right-2 h-4 w-4"
          animate={{
            rotate: checked ? 0 : 180,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </motion.svg>
      </AnimationExitProvider>
    </motion.label>
  );
};

export default ButtonCheckbox;
