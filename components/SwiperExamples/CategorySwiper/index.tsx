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
        images={categories.map(
          (category) => `https://picsum.photos/seed/${category.id}/120/120`
        )}
        gap={16}
        imageHeight={120}
        imageWidth={120}
        autoPlay
        autoPlayInterval={2000}
        showArrows={false}
      />
    </div>
  );
};

export default CategorySwiper;
