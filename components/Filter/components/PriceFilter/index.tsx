import { FC } from "react";
import FilterInput, { FilterInputOption } from "../FilterInput";
import { HandleFilterSubmit } from "../..";

type PriceFilterProps = {
  prices: number[];
  defaultSelectedItems: FilterInputOption[];
  handleFilterSubmit: HandleFilterSubmit;
};

const PriceFilter: FC<PriceFilterProps> = ({
  prices,
  defaultSelectedItems,
  handleFilterSubmit,
}) => {
  const priceMapWithDash = prices.map((price, index): FilterInputOption => {
    if (index === 0) {
      return {
        key: `${price} TL ve altı`,
        value: `0-${price}`,
      };
    }

    if (index === prices.length - 1) {
      return {
        key: `${price} TL ve üstü`,
        value: `${price}-`,
      };
    }

    return {
      key: `${prices[index - 1]} - ${price} TL`,
      value: `${prices[index - 1]}-${price}`,
    };
  });

  return (
    <FilterInput
      options={priceMapWithDash}
      title="Fiyat Aralığı"
      defaultSelectedItems={defaultSelectedItems}
      handleFilterSubmit={(selectedItems) => {
        handleFilterSubmit(
          "price",
          selectedItems.map((item) => item.value).join(",")
        );
      }}
    />
  );
};

export default PriceFilter;
