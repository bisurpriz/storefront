import clsx from "clsx";
import { motion } from "motion/react";
import { FC } from "react";
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
          "mr-1 inline-flex items-center rounded-full bg-purple-100 py-1 pl-2.5 pr-1.5 text-sm font-medium text-purple-800",
          "cursor-pointer",
          "whitespace-nowrap",
        )}
      >
        {label}
        <button
          type="button"
          aria-label="Remove small"
          className={clsx(
            "ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
            "text-purple-400 hover:bg-purple-200 hover:text-purple-500",
            "transition-colors duration-200 ease-in-out",
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
