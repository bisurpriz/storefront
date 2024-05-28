import clsx from "clsx";
import React, { FC } from "react";
import { FilterInputOption } from "../FilterInput";
import SelectedFilterTag from "./SelectedFilterTag";
import { FilterTypes } from "../..";
import { AnimatePresence } from "framer-motion";

type SelectedFiltersProps = {
  selectedCategories: FilterInputOption[];
  price: FilterInputOption;
  sameDayDelivery: boolean;
  specialOffers: boolean;
  customizable: boolean;
  onClear: (name: FilterTypes, value: string) => void;
};

const SelectedFilters: FC<SelectedFiltersProps> = ({
  selectedCategories,
  price,
  sameDayDelivery,
  specialOffers,
  customizable,
  onClear,
}) => {
  return (
    <div className={clsx("flex gap-2 items-center justify-start my-2")}>
      <AnimatePresence presenceAffectsLayout>
        {selectedCategories.length > 0 &&
          selectedCategories.map((category) => (
            <SelectedFilterTag
              id={`category-${category.value}`}
              key={category.value}
              label={category.key}
              onClear={() => onClear("category", category.value)}
            />
          ))}

        {!!price.value && (
          <SelectedFilterTag
            id={"price"}
            label={price.key}
            onClear={() => onClear("price", "")}
          />
        )}

        {!!sameDayDelivery && (
          <SelectedFilterTag
            id={"sameDayDelivery"}
            label="Aynı gün teslimat"
            onClear={() => onClear("sameDayDelivery", "")}
          />
        )}
        {!!specialOffers && (
          <SelectedFilterTag
            id={"specialOffers"}
            label="Özel teslimat"
            onClear={() => onClear("specialOffers", "")}
          />
        )}
        {!!customizable && (
          <SelectedFilterTag
            id={"customizable"}
            label="Özelleştirilebilir"
            onClear={() => onClear("customizable", "")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectedFilters;
