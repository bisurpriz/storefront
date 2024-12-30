import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import { FC } from "react";
import { FilterTypes } from "../..";
import { FilterInputOption } from "../FilterInput";
import SelectedFilterTag from "./SelectedFilterTag";

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
    <div className={clsx("my-2 flex items-center justify-start gap-2")}>
      <AnimatePresence presenceAffectsLayout>
        {selectedCategories.length > 0 &&
          selectedCategories.map((category) => (
            <SelectedFilterTag
              id={`category-${category.value}`}
              key={`category-${category.value}`}
              label={category.key}
              onClear={() => onClear("category", category.value)}
            />
          ))}

        {!!price.value && (
          <SelectedFilterTag
            id={"price"}
            key={"price"}
            label={price.key}
            onClear={() => onClear("price", "")}
          />
        )}

        {!!sameDayDelivery && (
          <SelectedFilterTag
            key={"sameDayDelivery"}
            id={"sameDayDelivery"}
            label="Aynı gün teslimat"
            onClear={() => onClear("sameDayDelivery", "")}
          />
        )}
        {!!specialOffers && (
          <SelectedFilterTag
            key={"specialOffers"}
            id={"specialOffers"}
            label="Özel teslimat"
            onClear={() => onClear("specialOffers", "")}
          />
        )}
        {!!customizable && (
          <SelectedFilterTag
            key={"customizable"}
            id={"customizable"}
            label="Tasarlanabilir"
            onClear={() => onClear("customizable", "")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectedFilters;
