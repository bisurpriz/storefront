import TextField from "@/components/TextField";
import React, { FC } from "react";

type FilterDropdownSearchBarProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterDropdownSearchBar: FC<FilterDropdownSearchBarProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="flex items-center gap-2 p-4 max-md:w-full">
      <TextField
        type="text"
        placeholder="Ara"
        value={filter}
        fullWidth
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default FilterDropdownSearchBar;
