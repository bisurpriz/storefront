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
      className={clsx("relative mx-auto w-full max-w-xl", {
        [className]: className,
      })}
    >
      <div
        className={clsx(
          "flex h-10 select-none items-center rounded-md bg-white px-4",
          "text-sm text-slate-400 transition-all duration-300",
          "border border-primary",
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
          "flex h-full items-center justify-center gap-3",
          "group transition-all duration-300",
        )}
      >
        {inputVal && (
          <button
            className={clsx(
              "text-primary",
              "flex items-center justify-center outline-none",
              "group transition-all duration-300",
            )}
            onClick={handleClear}
          >
            <RemoveSquare className="text-2xl" />
          </button>
        )}
        <button
          className={clsx(
            "h-full rounded-r-md bg-primary px-6 text-white",
            "flex items-center justify-center outline-none",
            "hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50",
            "group transition-all duration-300",
          )}
          onClick={pushToSearch}
          name="search"
        >
          <SearchIcon className="text-2xl group-hover:animate-bounce" />
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
