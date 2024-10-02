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
      className="bg-gradient-to-l from-white via-pink-100  to-white py-8 rounded-md"
      id="category-section"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 text-start">
          Kategorilere Göz At
        </h2>
        <ScrollButtons />
      </div>
      <div
        className="flex flex-nowrap overflow-x-auto gap-6 w-full no-scrollbar snap-x snap-mandatory"
        ref={scrollRef}
      >
        {category.map((category) => (
          <Link
            key={category.name}
            href={category.slug}
            className="flex-1 w-full snap-start"
          >
            <div className="group relative block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
              <Image
                src={getImageUrlFromPath(category.image_url)}
                alt={category.name}
                className="object-contain w-full min-w-[250px] max-md:min-w-[150px]"
                width={400}
                height={400}
                sizes="
                  (min-width: 1024px) 20vw,
                  (min-width: 768px) 40vw,
                  20vw
                  "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">
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
