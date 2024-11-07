"use client";

import { Link } from "@/components/Link";
import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import useScrollHorizontal from "@/hooks/useScrollHorizontal";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import React, { FC, useRef } from "react";

type CategorySectionProps = {
  category: GetAllCategoriesQuery["category"];
};

const CategorySection: FC<CategorySectionProps> = ({ category }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { ScrollButtons } = useScrollHorizontal(scrollRef);

  return (
    <section
      className="rounded-md bg-gradient-to-l from-white via-pink-100 to-white py-8"
      id="category-section"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-start text-lg font-semibold text-gray-700">
          Kategorilere Göz At
        </h2>
        <ScrollButtons />
      </div>
      <div
        className="no-scrollbar flex w-full snap-x snap-mandatory flex-nowrap gap-6 overflow-x-auto"
        ref={scrollRef}
      >
        {category.map((category) => (
          <Link
            key={category.name}
            href={category.slug}
            className="w-full flex-1 snap-start"
          >
            <div className="group relative block cursor-pointer overflow-hidden rounded-lg border transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <Image
                src={getImageUrlFromPath(category.image_url)}
                alt={category.name}
                className="w-full min-w-[250px] object-contain max-md:min-w-[150px]"
                width={400}
                height={400}
                sizes="
                  (min-width: 1024px) 20vw,
                  (min-width: 768px) 40vw,
                  20vw
                  "
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-lg font-semibold text-white">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
