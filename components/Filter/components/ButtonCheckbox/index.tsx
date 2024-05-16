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
        "font-manrope font-semibold whitespace-nowrap cursor-pointer relative",
        "flex items-center justify-between gap-2 text-sm bg-white border text-gray-500 border-gray-200 rounded-md p-2",
        {
          "border-primary text-primary": checked,
        }
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
          className="w-4 h-4 absolute right-2"
          // padding geldiği zaman belirecek
          initial={{ opacity: 0, paddingRight: 0 }}
          animate={{ opacity: 1, paddingRight: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
