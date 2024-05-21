import { FC, useMemo, useState } from "react";
import { HandleFilterSubmit } from "../..";
import MultiRangeSliderInput from "@/components/SlideInput";
import AnimatedFilterBox from "../FilterInput/AnimatedFilterBox";
import FilterDropdownButton from "../FilterInput/FilterDropdownButton";
import { TbCategory } from "react-icons/tb";
import clsx from "clsx";
import FilterDropdownAcceptButton from "../FilterInput/FilterDropdownAcceptButton";
import FilterModalHeader from "../FilterInput/FilterModalHeader";

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
  const [selectedPrice, setSelectedPrice] = useState<string>(defaultPrice);

  const toggle = () => setIsOpen(!isOpen);
  const key = useMemo(
    () => ({
      min: parseInt(defaultPrice.split("-")[0]),
      max: parseInt(defaultPrice.split("-")[1]),
    }),
    [defaultPrice, prices]
  );

  const selectedItems = useMemo(() => {
    if (defaultPrice) {
      return {
        key: `${key.min}₺ - ${key.max}₺`,
        value: defaultPrice,
      };
    } else {
      return {
        key: "",
        value: "",
      };
    }
  }, [defaultPrice, key]);

  return (
    <div className="w-fit">
      <FilterDropdownButton
        isOpen={isOpen}
        selectedItems={selectedItems.key ? [selectedItems] : []}
        toggle={toggle}
        title={"Fiyat"}
        icon={<TbCategory />}
      />
      <AnimatedFilterBox isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <FilterModalHeader
          title={`Fiyat Aralığı ${selectedPrice ? `(${selectedPrice})` : ""}`}
        />
        <div className="p-4">
          <div
            className={clsx(
              "flex justify-between items-center text-gray-500 text-sm"
            )}
          >
            <span>{`${prices[0]}₺`}</span>
            <span>{`${prices[prices.length - 1]}₺`}</span>
          </div>

          <MultiRangeSliderInput
            max={prices[prices.length - 1]}
            min={prices[0]}
            step={100}
            onChange={(min, max) => setSelectedPrice(`${min}-${max}`)}
            defaultValues={key}
          />
          <FilterDropdownAcceptButton
            handleClear={() => {
              handleFilterSubmit("price", "");
              setIsOpen(false);
            }}
            handleFilterSubmit={() => {
              handleFilterSubmit("price", selectedPrice);
              setIsOpen(false);
            }}
          />
        </div>
      </AnimatedFilterBox>
    </div>
  );
};

export default PriceFilter;
