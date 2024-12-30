import clsx from "clsx";
import { motion } from "motion/react";
import { FC } from "react";
import { FilterInputOption } from ".";

type FilterDropdownButtonProps = {
  toggle: () => void;
  isOpen: boolean;
  selectedItems: FilterInputOption[];
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
        "flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-500",
        "whitespace-nowrap font-manrope font-semibold transition-colors duration-300 ease-in-out",
        {
          "border-primary text-primary": selectedItems.length > 0 || isOpen,
        },
      )}
    >
      {selectedItems.length > 0 ? (
        <span>
          {title}: <span> ({selectedItems.length})</span>
          {selectedItems.length > 1 ? (
            <span>
              :{" "}
              {selectedItems
                .map((item) => item.key)
                .slice(0, 2)
                .join(", ")}
            </span>
          ) : (
            <span>: {selectedItems[0].key}</span>
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
