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
      className={clsx("flex items-center text-sm cursor-pointer", className)}
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
          "w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center",
          {
            "border-blue-500": checked,
          }
        )}
        whileTap={{ scale: 0.8 }}
      >
        {checked && (
          <motion.div className="w-2 h-2 bg-blue-500 rounded-full" layout />
        )}
      </motion.div>
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
