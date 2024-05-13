import React, { FC, useState, useCallback, useMemo, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import clsx from "clsx";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import useResponsive from "@/hooks/useResponsive";
import FilterDropdownButton from "./FilterDropdownButton";
import FilterDropdownList from "./FilterDropdownList";
import FilterDropdownSearchBar from "./FilterDropdownSearchBar";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import { useLockScroll } from "@/hooks/useLockScroll";
import FilterDropdownAcceptButton from "./FilterDropdownAcceptButton";

type Option = {
  key: string;
  value: string;
};

type FilterInputProps = {
  title: string;
  onItemSelect?: (item: string | string[]) => void;
  options: Option[];
};

const FilterInput: FC<FilterInputProps> = ({
  title,
  onItemSelect,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const close = () => {
    setFilter("");
    setIsOpen(false);
  };

  const ref = useClickAway<HTMLDivElement>(close);
  const { isTablet } = useResponsive();

  const debouncedFilter = useDebounce(filter, 500);

  const filteredOptions = useMemo(() => {
    return options.filter(({ key }) =>
      key.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [debouncedFilter, options]);

  const handleItemSelect = useCallback(
    (item: string) => {
      if (selectedItems.includes(item)) {
        setSelectedItems((prev) => prev.filter((i) => i !== item));
        return;
      }

      setSelectedItems((prev) => [...prev, item]);
    },
    [selectedItems]
  );

  useEffect(() => {
    if (onItemSelect) {
      onItemSelect(selectedItems);
    }
  }, [onItemSelect, selectedItems]);

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
        // like accordion
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

  useLockScroll({ bool: isOpen });

  return (
    <div className={clsx("relative", "max-md:w-full")} ref={ref}>
      <FilterDropdownButton
        isOpen={isOpen}
        selectedItems={selectedItems}
        toggle={toggle}
        title={title}
      />
      {isOpen && isTablet && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <AnimationExitProvider show={isOpen} key="submenu">
        <motion.div
          key="submenu"
          className={clsx(
            "absolute w-full min-w-fit bg-white border border-gray-200 rounded-md mt-2 max-h-96",
            "max-md:w-full max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:h-auto max-md:z-50 max-h-[65vh]"
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
          <FilterDropdownAcceptButton />
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
};

export default FilterInput;
