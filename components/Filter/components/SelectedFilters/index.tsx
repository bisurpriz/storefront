import clsx from "clsx";
import React, { FC } from "react";
import { FilterInputOption } from "../FilterInput";
import SelectedFilterTag from "./SelectedFilterTag";
import { FilterTypes } from "../..";

type SelectedFiltersProps = {
  selectedCategories: FilterInputOption[];
  price: FilterInputOption;
  sameDayDelivery: boolean;
  specialOffers: boolean;
  onClear: (name: FilterTypes, value: string) => void;
};

const SelectedFilters: FC<SelectedFiltersProps> = ({
  selectedCategories,
  price,
  sameDayDelivery,
  specialOffers,
  onClear,
}) => {
  return (
    <div className={clsx("flex gap-2 items-center justify-start my-2")}>
      {selectedCategories.map((category) => (
        <SelectedFilterTag
          key={category.value}
          label={category.key}
          onClear={() => onClear("category", category.value)}
          show={!!category.value}
        />
      ))}

      <SelectedFilterTag
        key={price.value}
        label={price.key}
        onClear={() => onClear("price", "")}
        show={!!price.value}
      />

      <SelectedFilterTag
        label="Aynı gün teslimat"
        onClear={() => onClear("sameDayDelivery", "")}
        show={sameDayDelivery}
      />
      <SelectedFilterTag
        label="Özel teslimat"
        onClear={() => onClear("specialOffers", "")}
        show={specialOffers}
      />
    </div>
  );
};

export default SelectedFilters;
