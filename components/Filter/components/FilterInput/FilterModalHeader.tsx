import React, { FC } from "react";

type FilterModalHeaderProps = {
  title: string;
};

const FilterModalHeader: FC<FilterModalHeaderProps> = ({ title }) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 p-4">
      <span className="text-base font-semibold text-gray-500">{title}</span>
    </div>
  );
};

export default FilterModalHeader;
