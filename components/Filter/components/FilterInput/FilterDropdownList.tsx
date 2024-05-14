import React, { FC } from "react";
import clsx from "clsx";
import Checkbox from "@/components/Checkbox";

type FilterDropdownListProps = {
  filteredOptions: { key: string; value: string }[];
  selectedItems: string[];
  handleItemSelect: (item: string) => void;
};

const FilterDropdownList: FC<FilterDropdownListProps> = ({
  filteredOptions,
  selectedItems,
  handleItemSelect,
}) => {
  return (
    <div
      className="overflow-y-auto flex flex-col items-start justify-start max-md:gap-2 gap-1 px-4"
      style={{
        maxHeight: "40vh",
      }}
    >
      {filteredOptions.map(({ key, value }, index) => (
        <label
          key={index}
          className={clsx(
            "w-full cursor-pointer flex items-center justify-start gap-2 text-sm bg-white border border-gray-200 rounded-md p-2 last:mb-4",
            {
              "border-gray-300": selectedItems.includes(value),
            },
            {
              "border-primary": selectedItems.includes(value),
            }
          )}
        >
          <Checkbox
            label={key}
            checked={selectedItems.includes(value)}
            onChange={() => handleItemSelect(value)}
          />
        </label>
      ))}
    </div>
  );
};

export default FilterDropdownList;
