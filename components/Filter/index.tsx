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

  return (
    <div className={clsx("w-full max-md:overflow-auto")}>
      <div className={clsx("flex gap-2 items-center justify-start")}>
        <CategoryFilter
          categories={categories}
          handleFilterSubmit={handleFilterSubmit}
          selectedCategories={selectedCategories}
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
