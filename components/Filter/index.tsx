"use client";

import React, { FC } from "react";
import { useCategory } from "@/contexts/CategoryContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { createQueryString } from "@/utils/createQueryString";
import CategoryFilter from "./components/CategoryFilter";
import { FilterInputOption } from "./components/FilterInput";
import SameDayFilter from "./components/SameDayFilter";
import SpecialOffersFilter from "./components/SpecialOffersFilter";
import SelectedFilters from "./components/SelectedFilters";
import PriceFilter from "./components/PriceFilter";
import CustomizableFilter from "./components/CustomizableFilter";
import { VisibleChecker } from "./components/FilterVisibleChecker";

export type HandleFilterSubmit = (name: string, value: string) => void;

export type FilterTypes =
  | "category"
  | "price"
  | "sameDayDelivery"
  | "specialOffers"
  | "customizable";

export enum FilterKeys {
  CATEGORY = "category",
  PRICE = "price",
  SAME_DAY_DELIVERY = "sameDayDelivery",
  SPECIAL_OFFERS = "specialOffers",
  CUSTOMIZABLE = "customizable",
}

type FilterProps = {
  filterTypes?: FilterTypes[];
};

const Filter: FC<FilterProps> = ({ filterTypes }) => {
  const { category } = useCategory();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const categories: FilterInputOption[] = category.map((c) => ({
    key: c.name,
    value: c.slug,
  }));

  const handleFilterSubmit: HandleFilterSubmit = (name, value) => {
    const queryString = createQueryString(name, value, searchParams);

    if (queryString) {
      push(`?${queryString}`);
    } else {
      push(pathname);
    }
  };

  const selectedCategories =
    searchParams
      ?.get(FilterKeys.CATEGORY)
      ?.split(",")
      ?.map((c) => categories.find((category) => category.value === c)) || [];

  const price = searchParams.get(FilterKeys.PRICE);

  const selectedPrice: FilterInputOption = price
    ? {
        key: price.split("-")[0] + "₺ - " + price.split("-")[1] + "₺",
        value: price,
      }
    : {
        key: "",
        value: "",
      };

  return (
    <div className={clsx("w-full")}>
      <div
        className={clsx(
          "flex items-center justify-start gap-2 scroll-smooth max-md:overflow-x-auto",
          "scroll-smooth snap-x snap-mandatory no-scrollbar"
        )}
      >
        <VisibleChecker filterType="category" filterTypes={filterTypes}>
          <CategoryFilter
            categories={categories}
            handleFilterSubmit={handleFilterSubmit}
            selectedCategories={selectedCategories}
          />
        </VisibleChecker>
        <VisibleChecker filterType={FilterKeys.PRICE} filterTypes={filterTypes}>
          <PriceFilter
            defaultPrice={searchParams.get(FilterKeys.PRICE) || ""}
            prices={Array.from({ length: 10 }, (_, i) => (i + 1) * 100)}
            handleFilterSubmit={handleFilterSubmit}
          />
        </VisibleChecker>
        <VisibleChecker
          filterType={FilterKeys.CUSTOMIZABLE}
          filterTypes={filterTypes}
        >
          <CustomizableFilter
            customizable={!!searchParams.get(FilterKeys.CUSTOMIZABLE)}
            handleFilterSubmit={handleFilterSubmit}
          />
        </VisibleChecker>
        <VisibleChecker
          filterType={FilterKeys.SAME_DAY_DELIVERY}
          filterTypes={filterTypes}
        >
          <SameDayFilter
            handleFilterSubmit={handleFilterSubmit}
            sameDayDelivery={!!searchParams.get(FilterKeys.SAME_DAY_DELIVERY)}
          />
        </VisibleChecker>
        <VisibleChecker
          filterType={FilterKeys.SPECIAL_OFFERS}
          filterTypes={filterTypes}
        >
          <SpecialOffersFilter
            specialOffers={!!searchParams.get(FilterKeys.SPECIAL_OFFERS)}
            handleFilterSubmit={handleFilterSubmit}
          />
        </VisibleChecker>
      </div>
      <SelectedFilters
        sameDayDelivery={!!searchParams.get(FilterKeys.SAME_DAY_DELIVERY)}
        selectedCategories={selectedCategories}
        specialOffers={!!searchParams.get(FilterKeys.SPECIAL_OFFERS)}
        customizable={!!searchParams.get(FilterKeys.CUSTOMIZABLE)}
        price={selectedPrice}
        onClear={(name, value) => {
          switch (name) {
            case FilterKeys.CATEGORY:
              handleFilterSubmit(
                name,
                selectedCategories
                  .filter((c) => c.value !== value)
                  .map((c) => c.value)
                  .join(",") || ""
              );
              break;
            default:
              handleFilterSubmit(name, value);
              break;
          }
        }}
      />
    </div>
  );
};

export default Filter;
