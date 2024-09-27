"use client";

import { FC } from "react";

import clsx from "clsx";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import Slider from "./Slider";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  return (
    <div
      className={clsx(
        "max-md:mb-2 mb-4",
        "mb-8flex flex-nowrap overflow-x-auto gap-4"
      )}
    >
      <Slider
        slides={categories
          .sort((a, b) => a?.id - b?.id)
          .map((category) => ({
            imageUrl: category?.image_url,
            id: category?.id,
            label: category?.name || "Category",
            slug: category?.slug,
          }))}
        autoPlayTime={2000}
        slideWidth={100}
      />
    </div>
  );
};

export default CategorySwiper;
