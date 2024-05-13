import clsx from "clsx";
import { motion } from "framer-motion";
import { FC } from "react";

type FilterDropdownButtonProps = {
  toggle: () => void;
  isOpen: boolean;
  selectedItems: string | string[];
  title: string;
};

const FilterDropdownButton: FC<FilterDropdownButtonProps> = ({
  toggle,
  isOpen,
  selectedItems,
  title,
}) => {
  return (
    <motion.button
      key="filter-button"
      onClick={toggle}
      className={clsx(
        "flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-md p-2 w-full",
        {
          "border-gray-300": isOpen,
        },
        {
          "border-primary": selectedItems.length > 0,
        }
      )}
    >
      {selectedItems.length > 0 ? (
        <span
          className={clsx(
            "font-manrope font-semibold  text-primary whitespace-nowrap",
            {
              "text-gray-400": !selectedItems.length,
            }
          )}
        >
          {title}:{" "}
          <span className="text-gray-400"> ({selectedItems.length})</span>
          {selectedItems.length > 1 ? (
            <span className="text-gray-400">
              :{" "}
              {Array.isArray(selectedItems)
                ? selectedItems.slice(0, 2).join(", ")
                : selectedItems}
              ...
            </span>
          ) : (
            <span className="text-gray-400">: {selectedItems[0]}</span>
          )}
        </span>
      ) : (
        <span className="text-gray-400">{title}</span>
      )}
    </motion.button>
  );
};

export default FilterDropdownButton;
