import React, { FC } from "react";

type FilterModalHeaderProps = {
  title: string;
};

const FilterModalHeader: FC<FilterModalHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 w-full">
      <span className="text-base text-gray-500 font-semibold">{title}</span>
    </div>
  );
};

export default FilterModalHeader;
