import React, { FC } from "react";
import clsx from "clsx";
import Checkbox from "@/components/Checkbox";
import { FilterInputOption } from ".";

type FilterDropdownListProps = {
  filteredOptions: { key: string; value: string }[];
  selectedItems: FilterInputOption[];
  handleItemSelect: (item: FilterInputOption) => void;
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
      {filteredOptions.map((option, index) => {
        const isSelected = selectedItems.some((x) => x.value === option.value);
        return (
          <label
            key={index}
            className={clsx(
              "w-full cursor-pointer flex items-center justify-start gap-2 text-sm bg-white border border-gray-200 rounded-md px-2 last:mb-4",
              {
                "border-gray-300": isSelected,
              },
              {
                "border-primary": isSelected,
              }
            )}
          >
            <Checkbox
              label={option.key}
              checked={isSelected}
              onChange={() => handleItemSelect(option)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default FilterDropdownList;
