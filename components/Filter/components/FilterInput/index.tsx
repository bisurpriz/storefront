"use client";

import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import clsx from "clsx";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import useResponsive from "@/hooks/useResponsive";
import FilterDropdownButton from "./FilterDropdownButton";
import FilterDropdownList from "./FilterDropdownList";
import FilterDropdownSearchBar from "./FilterDropdownSearchBar";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import FilterDropdownAcceptButton from "./FilterDropdownAcceptButton";
import { TbCategory } from "react-icons/tb";

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
  const { isTablet } = useResponsive();

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
    setSelectedItems([]);
    setFilter("");
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const subMenuVariants: Variants = useMemo(() => {
    if (isTablet) {
      return {
        initial: { height: 0 },
        enter: { height: "auto" },
        exit: { height: 0 },
        transition: {
          type: "easeInOut",
          duration: 0.3,
        },
      };
    }

    return {
      initial: { opacity: 0, y: 20 },
      enter: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
        delay: 0.2,
      },
    };
  }, [isTablet]);

  useEffect(() => {
    if (!isOpen) {
      setFilter("");
      setSelectedItems(defaultSelectedItems);
    }
  }, [isOpen, defaultSelectedItems]);

  return (
    <div className={clsx("relative min-w-[300px]")} ref={ref}>
      <FilterDropdownButton
        isOpen={isOpen}
        selectedItems={selectedItems}
        toggle={toggle}
        title={title}
        icon={<TbCategory />}
      />
      {isOpen && isTablet && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <AnimationExitProvider show={isOpen} key="submenu">
        <motion.div
          key="submenu"
          className={clsx(
            "absolute w-full min-w-fit bg-white border border-gray-200 rounded-md mt-2 max-h-96 z-50",
            "max-md:w-full max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:h-auto max-h-[65vh]"
          )}
          variants={subMenuVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={subMenuVariants.transition}
        >
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
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
};

export default FilterInput;
