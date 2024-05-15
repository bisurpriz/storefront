"use client";

import React, { useState } from "react";
import FilterInput, { FilterInputOption } from "../FilterInput";
import { useCategory } from "@/contexts/CategoryContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { createQueryString } from "@/utils/createQueryString";
import SameDayFilter from "../SameDayFilter";
import SpecialOffersFilter from "../SpecialOffersFilter";

export type HandleFilterSubmit = (name: string, value: string) => void;

const CategoryFilterInput = () => {
  const data = Array.from({ length: 15 }).map((_, i) => ({
    key: `Category ${i}`,
    value: `category-${i}`,
  }));

  const { category } = useCategory();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const categories = category.map((c) => ({
    key: c.name,
    value: c.slug,
  }));

  const [sameDayDelivery, setSameDayDelivery] = useState(
    searchParams.has("sameDayDelivery")
  );

  const [specialOffers, setSpecialOffers] = useState(
    searchParams.has("specialOffers")
  );

  const [selectedCategories, setSelectedCategories] = useState<
    FilterInputOption[]
  >(
    categories.filter((c) =>
      searchParams.getAll("category")[0]?.includes(c.value)
    )
  );

  const handleFilterSubmit: HandleFilterSubmit = (name, value) => {
    const queryString = createQueryString(name, value, searchParams);

    if (queryString) {
      push(`?${queryString}`);
    } else {
      push(pathname);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "flex gap-2 items-center justify-start overflow-y-scroll"
        )}
      >
        <FilterInput
          title="Kategori"
          options={categories}
          onItemSelect={(item) => setSelectedCategories(item)}
          selectedItems={selectedCategories}
          handleFilterSubmit={() => {
            handleFilterSubmit(
              "category",
              selectedCategories.map((c) => c.value).join(",") || ""
            );
          }}
        />
        <SameDayFilter
          handleFilterSubmit={handleFilterSubmit}
          sameDayDelivery={sameDayDelivery}
          setSameDayDelivery={setSameDayDelivery}
        />
        <SpecialOffersFilter
          specialOffers={!!specialOffers}
          handleFilterSubmit={handleFilterSubmit}
          setSpecialOffers={setSpecialOffers}
        />
      </div>
      <div className={clsx("flex gap-2 items-center justify-start mt-2")}>
        <div className={clsx("flex gap-2 items-center justify-start")}>
          {selectedCategories.map((category, index) => (
            <span
              key={index}
              className={clsx(
                "bg-gray-200 text-gray-800 rounded-md px-2 py-1",
                "font-semibold text-sm"
              )}
            >
              {category.key}
            </span>
          ))}
        </div>
        <div
          className={clsx(
            "flex gap-2 items-center justify-start",
            "flex-col md:flex-row"
          )}
        >
          {sameDayDelivery && <span>Aynı gün teslimat</span>}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterInput;
