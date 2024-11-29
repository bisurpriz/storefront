import { FC, useState } from "react";
import { HandleFilterSubmit } from "../..";
import AnimatedFilterBox from "../FilterInput/AnimatedFilterBox";
import FilterDropdownButton from "../FilterInput/FilterDropdownButton";
import FilterDropdownAcceptButton from "../FilterInput/FilterDropdownAcceptButton";
import FilterModalHeader from "../FilterInput/FilterModalHeader";
import PriceInput from "@/components/PriceInput";
import Category from "@/components/Icons/Category";

type PriceFilterProps = {
  prices: number[];
  handleFilterSubmit: HandleFilterSubmit;
  defaultPrice: string;
};

const PriceFilter: FC<PriceFilterProps> = ({
  prices,
  handleFilterSubmit,
  defaultPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number;
    max: number;
  }>({
    min: defaultPrice ? parseInt(defaultPrice.split("-")[0]) : prices[0],
    max: defaultPrice
      ? parseInt(defaultPrice.split("-")[1])
      : prices[prices.length - 1],
  });

  const toggle = () => setIsOpen(!isOpen);

  const selectedItems = defaultPrice
    ? {
        key: `${selectedPrice.min}₺ - ${selectedPrice.max}₺`,
        value: defaultPrice,
      }
    : {
        key: "",
        value: "",
      };

  return (
    <div className="w-fit">
      <FilterDropdownButton
        isOpen={isOpen}
        selectedItems={selectedItems.key ? [selectedItems] : []}
        toggle={toggle}
        title={"Fiyat"}
        icon={<Category />}
      />
      <AnimatedFilterBox isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <FilterModalHeader
          title={`Fiyat Aralığı ${
            selectedPrice
              ? `: ${selectedPrice.min}₺ - ${selectedPrice.max}₺`
              : ""
          }`}
        />
        <div className="p-4">
          <PriceInput
            min={prices[0]}
            step={100}
            onChange={(val) => setSelectedPrice(val)}
            values={{
              min: selectedPrice.min,
              max: selectedPrice.max,
            }}
          />
        </div>
        <FilterDropdownAcceptButton
          handleClear={() => {
            handleFilterSubmit("price", "");
            setSelectedPrice({
              min: prices[0],
              max: prices[prices.length - 1],
            });
            setIsOpen(false);
          }}
          handleFilterSubmit={() => {
            handleFilterSubmit(
              "price",
              `${selectedPrice.min}-${selectedPrice.max}`,
            );
            setIsOpen(false);
          }}
        />
      </AnimatedFilterBox>
    </div>
  );
};

export default PriceFilter;
