"use client";

import React, { useMemo } from "react";
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

export type HandleFilterSubmit = (name: string, value: string) => void;

const Filter = () => {
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

  const selectedCategories = useMemo(
    () =>
      searchParams
        ?.get("category")
        ?.split(",")
        ?.map((c) => categories.find((category) => category.value === c)) || [],
    [searchParams, categories]
  );

  const selectedPrice = useMemo((): FilterInputOption => {
    const price = searchParams.get("price");
    if (price) {
      const [min, max] = price.split("-");
      // with tl symbol
      return {
        key: `${min}₺ - ${max}₺`,
        value: price,
      };
    }

    return {
      key: "",
      value: "",
    };
  }, [searchParams]);

  return (
    <div className={clsx("w-full")}>
      <div
        className={clsx(
          "flex items-center justify-start gap-2 scroll-smooth max-md:overflow-auto"
        )}
      >
        <CategoryFilter
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          selectedCategories={selectedCategories}
        />
        <PriceFilter
          defaultPrice={searchParams.get("price") || ""}
          prices={Array.from({ length: 10 }, (_, i) => (i + 1) * 100)}
          handleFilterSubmit={handleFilterSubmit}
        />
        <SameDayFilter
          handleFilterSubmit={handleFilterSubmit}
          sameDayDelivery={!!searchParams.get("sameDayDelivery")}
        />
        <SpecialOffersFilter
          specialOffers={!!searchParams.get("specialOffers")}
          handleFilterSubmit={handleFilterSubmit}
        />
      </div>
      <SelectedFilters
        sameDayDelivery={!!searchParams.get("sameDayDelivery")}
        selectedCategories={selectedCategories}
        specialOffers={!!searchParams.get("specialOffers")}
        price={selectedPrice}
        onClear={(name, value) => {
          switch (name) {
            case "category":
              handleFilterSubmit(
                name,
                selectedCategories
                  .filter((c) => c.value !== value)
                  .map((c) => c.value)
                  .join(",") || ""
              );
              break;
            case "price":
              handleFilterSubmit(name, "");
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
