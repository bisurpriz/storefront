import clsx from "clsx";
import React, { FC } from "react";
import { FilterInputOption } from "../FilterInput";
import SelectedFilterTag from "./SelectedFilterTag";
import { AnimatePresence } from "framer-motion";

type SelectedFiltersProps = {
  selectedCategories: FilterInputOption[];
  sameDayDelivery: boolean;
  specialOffers: boolean;
  onClear: (
    name: "sameDayDelivery" | "specialOffers" | "category",
    value: string
  ) => void;
};

const SelectedFilters: FC<SelectedFiltersProps> = ({
  selectedCategories,
  sameDayDelivery,
  specialOffers,
  onClear,
}) => {
  return (
    <AnimatePresence>
      <div className={clsx("flex gap-2 items-center justify-start my-2")}>
        <div className={clsx("flex gap-2 items-center justify-start")}>
          {selectedCategories.map((category) => (
            <SelectedFilterTag
              key={category.value}
              label={category.key}
              onClear={() => onClear("category", category.value)}
            />
          ))}
        </div>

        {sameDayDelivery && (
          <SelectedFilterTag
            label="Aynı gün teslimat"
            onClear={() => onClear("sameDayDelivery", "")}
          />
        )}
        {specialOffers && (
          <SelectedFilterTag
            label="Özel teslimat"
            onClear={() => onClear("specialOffers", "")}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default SelectedFilters;
