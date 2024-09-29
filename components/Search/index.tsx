"use client";

import { FC } from "react";
import TextField from "../TextField";
import clsx from "clsx";
import RemoveSquare from "../Icons/RemoveSquare";
import SearchIcon from "../Icons/SearchBotttomMenu";
import SearchList from "./SearchList";
import { useSearchProduct } from "@/contexts/SearchContext";
import useResponsive from "@/hooks/useResponsive";

type Props = {
  className?: string;
};

const Search: FC<Props> = ({ className }) => {
  const {
    handleSearchProducts,
    products,
    loading,
    inputVal,
    setInputVal,
    isOpen,
    setIsOpen,
    handleKeyDown,
    pushToSearch,
    handleClear,
    setProducts,
  } = useSearchProduct();

  const onChange = (e, value: string) => {
    setInputVal(value);
    handleSearchProducts(value);
  };

  const { isTablet } = useResponsive();

  return (
    <div
      className={clsx("relative max-w-xl w-full mx-auto", {
        [className]: className,
      })}
    >
      <TextField
        type="text"
        className=""
        id="header-search"
        placeholder="Çiçek, hediye, süprizler..."
        value={inputVal}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        fullWidth
        onFocus={() => {
          isTablet ? null : setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        readOnly={isTablet}
      />

      <div
        className={clsx(
          "absolute right-0 top-0",
          "h-full flex items-center justify-center gap-3",
          "transition-all duration-300 group"
        )}
      >
        {inputVal && (
          <button
            className={clsx(
              "text-primary ",
              "flex items-center justify-center outline-none",
              "transition-all duration-300 group"
            )}
            onClick={handleClear}
          >
            <RemoveSquare className="text-2xl" />
          </button>
        )}
        <button
          className={clsx(
            "h-full bg-primary text-white rounded-r-lg px-6",
            "flex items-center justify-center outline-none",
            "hover:bg-primary-light  focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
            "transition-all duration-300 group"
          )}
          onClick={pushToSearch}
          name="search"
        >
          <SearchIcon className="group-hover:animate-bounce text-2xl" />
        </button>
      </div>
      <SearchList
        isLoading={loading}
        isOpen={isOpen}
        products={products}
        setIsOpen={setIsOpen}
        onChange={onChange}
        inputVal={inputVal}
        setInputVal={setInputVal}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Search;
