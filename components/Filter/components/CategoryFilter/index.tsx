import React, { FC } from "react";
import FilterInput, { FilterInputOption } from "../FilterInput";
import { HandleFilterSubmit } from "../..";

type CategoryFilterProps = {
  handleFilterSubmit: HandleFilterSubmit;
  selectedCategories: FilterInputOption[];
  categories: FilterInputOption[];
};

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  handleFilterSubmit,
  selectedCategories,
}) => {
  return (
    <FilterInput
      title="Kategori"
      options={categories}
      defaultSelectedItems={selectedCategories}
      handleFilterSubmit={(selectedItems) => {
        handleFilterSubmit(
          "category",
          selectedItems.map((c) => c.value).join(",") || ""
        );
      }}
    />
  );
};

export default CategoryFilter;
