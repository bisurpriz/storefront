"use client";

import { FC } from "react";

import clsx from "clsx";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import Slider from "./Slider";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

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
            imageUrl: category?.image_url
              ? getImageUrlFromPath(category.image_url)
              : `https://picsum.photos/seed/${category.id}/120/120`,
            id: category?.id,
            label: category?.name || "Category",
          }))}
        autoPlay
        autoPlayTime={5000}
      />
    </div>
  );
};

export default CategorySwiper;
