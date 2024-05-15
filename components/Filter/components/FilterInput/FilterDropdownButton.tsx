import clsx from "clsx";
import { motion } from "framer-motion";
import { FC } from "react";

type FilterDropdownButtonProps = {
  toggle: () => void;
  isOpen: boolean;
  selectedItems: string | string[];
  title: string;
  icon?: React.ReactNode;
};

const FilterDropdownButton: FC<FilterDropdownButtonProps> = ({
  toggle,
  isOpen,
  selectedItems,
  title,
  icon,
}) => {
  return (
    <motion.button
      key="filter-button"
      onClick={toggle}
      className={clsx(
        "flex items-center justify-between gap-2 text-sm bg-white border text-gray-500 border-gray-200 rounded-md p-2 w-full",
        "font-manrope font-semibold whitespace-nowrap",
        {
          "border-gray-300": isOpen,
        },
        {
          "border-primary text-primary": selectedItems.length > 0,
        }
      )}
    >
      {selectedItems.length > 0 ? (
        <span>
          {title}: <span> ({selectedItems.length})</span>
          {selectedItems.length > 1 ? (
            <span>
              :{" "}
              {Array.isArray(selectedItems)
                ? selectedItems.slice(0, 2).join(", ")
                : selectedItems}
              ...
            </span>
          ) : (
            <span>: {selectedItems[0]}</span>
          )}
        </span>
      ) : (
        <span>{title}</span>
      )}
      {icon}
    </motion.button>
  );
};

export default FilterDropdownButton;
