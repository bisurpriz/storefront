"use client";

import { FC } from "react";
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
      <div
        className={clsx(
          "h-10 bg-white flex items-center rounded-md px-4 select-none",
          "transition-all duration-300 text-sm text-slate-400",
          "border border-primary-300",
          { "border-b-0": isTablet },
          { "border-b-2": !isTablet }
        )}
        id="header-search"
        onFocus={() => {
          isTablet ? null : setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
      >
        <span>Çiçek, hediye, süprizler ve dahası...</span>
      </div>

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
            "h-full bg-primary text-white rounded-r-md px-6",
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
