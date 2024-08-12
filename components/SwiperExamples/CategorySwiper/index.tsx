"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Card from "../../Card";
import Link from "next/link";
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
        "mb-8",
        "flex flex-nowrap overflow-x-auto gap-4",
        "scrollbar-hide",
        "snap-mandatory snap-x snap-center scrollbar-"
      )}
    >
      <Slider
        images={categories.map(
          (category) => `https://picsum.photos/seed/${category.id}/120/120`
        )}
        gap={4}
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
