"use client";

import { FC } from "react";

import clsx from "clsx";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import dynamic from "next/dynamic";
import CategorySwiperSuspense from "./CategorySwiperSuspense";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const DynamicCategorySwiper = dynamic(() => import("./Slider"), {
  ssr: false,
  loading: () => <CategorySwiperSuspense />,
});

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  return (
    <div
      className={clsx(
        "max-md:mb-2 mb-4",
        "mb-8flex flex-nowrap overflow-x-auto gap-4"
      )}
    >
      <DynamicCategorySwiper
        slides={categories
          .sort((a, b) => a?.id - b?.id)
          .map((category) => ({
            imageUrl: category?.image_url,
            id: category?.id,
            label: category?.name || "Category",
          }))}
        autoPlayTime={5000}
      />
    </div>
  );
};

export default CategorySwiper;
