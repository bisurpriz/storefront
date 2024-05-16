import clsx from "clsx";
import React, { FC } from "react";
import { FilterInputOption } from "../FilterInput";
import SelectedFilterTag from "./SelectedFilterTag";

type SelectedFiltersProps = {
  selectedCategories: FilterInputOption[];
  prices: FilterInputOption[];
  sameDayDelivery: boolean;
  specialOffers: boolean;
  onClear: (
    name: "sameDayDelivery" | "specialOffers" | "category" | "price",
    value: string
  ) => void;
};

const SelectedFilters: FC<SelectedFiltersProps> = ({
  selectedCategories,
  prices,
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

      {prices.map((price) => (
        <SelectedFilterTag
          key={price.value}
          label={price.key}
          onClear={() => onClear("price", price.value)}
          show={!!price.value}
        />
      ))}

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
