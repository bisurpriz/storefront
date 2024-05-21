"use client";

import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import clsx from "clsx";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import FilterDropdownButton from "./FilterDropdownButton";
import FilterDropdownList from "./FilterDropdownList";
import FilterDropdownSearchBar from "./FilterDropdownSearchBar";
import FilterDropdownAcceptButton from "./FilterDropdownAcceptButton";
import { TbCategory } from "react-icons/tb";
import AnimatedFilterBox from "./AnimatedFilterBox";

export type FilterInputOption = {
  key: string;
  value: string;
};

type FilterInputProps = {
  title: string;
  options: FilterInputOption[];
  defaultSelectedItems?: FilterInputOption[];
  handleFilterSubmit: (selectedItems: FilterInputOption[]) => void;
};

const FilterInput: FC<FilterInputProps> = ({
  title,
  options,
  defaultSelectedItems = [],
  handleFilterSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] =
    useState<FilterInputOption[]>(defaultSelectedItems);

  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useClickAway<HTMLDivElement>(handleClose);

  const debouncedFilter = useDebounce(filter, 500);

  const filteredOptions = useMemo(() => {
    return options.filter(({ key }) =>
      key.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [debouncedFilter, options]);

  const handleItemSelect = useCallback(
    (item: FilterInputOption) => {
      if (selectedItems.some((i) => i.value === item.value)) {
        setSelectedItems(selectedItems.filter((i) => i.value !== item.value));
        return;
      }

      setSelectedItems([...selectedItems, item]);
    },
    [selectedItems]
  );

  const handleClear = () => {
    handleFilterSubmit([]);
    setSelectedItems([]);
    setFilter("");
    handleClose();
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) {
      setFilter("");
      setSelectedItems(defaultSelectedItems);
    }
  }, [isOpen, defaultSelectedItems]);

  return (
    <div className={clsx("relative")} ref={ref}>
      <FilterDropdownButton
        isOpen={isOpen}
        selectedItems={selectedItems}
        toggle={toggle}
        title={title}
        icon={<TbCategory />}
      />
      <AnimatedFilterBox handleClose={handleClose} isOpen={isOpen}>
        <FilterDropdownSearchBar filter={filter} setFilter={setFilter} />
        <FilterDropdownList
          filteredOptions={filteredOptions}
          handleItemSelect={handleItemSelect}
          selectedItems={selectedItems}
        />
        <FilterDropdownAcceptButton
          handleClear={handleClear}
          handleFilterSubmit={() => {
            handleFilterSubmit(selectedItems);
            handleClose();
          }}
        />
      </AnimatedFilterBox>
    </div>
  );
};

export default FilterInput;
