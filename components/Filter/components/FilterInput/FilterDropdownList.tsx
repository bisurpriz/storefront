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
      className="flex flex-col items-start justify-start gap-1 overflow-y-auto px-4 max-md:gap-2"
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
              "flex w-full cursor-pointer items-center justify-start gap-2 rounded-md border border-gray-200 bg-white px-2 text-sm last:mb-4",
              {
                "border-gray-300": isSelected,
              },
              {
                "border-primary": isSelected,
              },
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
