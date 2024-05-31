import clsx from "clsx";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { selectedTagMotionVariants } from "../../constants";

type SelectedFilterTagProps = {
  label: string;
  onClear: () => void;
  id: string;
};

const SelectedFilterTag: FC<SelectedFilterTagProps> = ({
  label,
  onClear,
  id,
}) => {
  return (
    <motion.div
      key={id}
      variants={selectedTagMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <div
        className={clsx(
          "inline-flex items-center pl-2.5 pr-1.5 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mr-1",
          "cursor-pointer",
          "whitespace-nowrap"
        )}
      >
        {label}
        <button
          type="button"
          aria-label="Remove small"
          className={clsx(
            "flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center",
            "text-purple-400 hover:bg-purple-200 hover:text-purple-500",
            "transition-colors duration-200 ease-in-out"
          )}
          onClick={onClear}
        >
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default SelectedFilterTag;
