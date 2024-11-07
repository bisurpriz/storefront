import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  checked,
  onChange,
  className,
}) => {
  return (
    <label
      className={clsx("flex cursor-pointer items-center text-sm", className)}
    >
      <motion.input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e, value)}
        className="hidden"
        id={name}
      />
      <motion.div
        className={clsx(
          "flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-400",
          {
            "border-blue-500": checked,
          },
        )}
        whileTap={{ scale: 0.8 }}
      >
        {checked && (
          <motion.div className="h-2 w-2 rounded-full bg-blue-500" layout />
        )}
      </motion.div>
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
