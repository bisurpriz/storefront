"use client";

import { FC } from "react";

import { Link } from "@/components/Link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import clsx from "clsx";
import Image from "next/image";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  const basis = cn(
    "basis-1/4 pl-2",
    "xs:basis-1/4",
    "sm:basis-1/5",
    "md:basis-1/6",
    "lg:basis-1/7",
    "xl:basis-1/8",
    "2xl:basis-1/9",
    "3xl:basis-1/9",
  );
  return (
    <div
      className={clsx("no-scrollbar flex flex-nowrap gap-4 overflow-x-auto")}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {categories
            .sort((a, b) => a?.id - b?.id)
            .map((category) => ({
              imageUrl: category?.image_url,
              id: category?.id,
              label: category?.name || "Category",
              slug: category?.slug,
            }))
            .map((_, index) => (
              <CarouselItem key={index} className={basis}>
                <Link
                  href={`/${_.slug}`}
                  className={"flex flex-col items-center justify-center p-1"}
                >
                  <Image
                    src={getImageUrlFromPath(_.imageUrl)}
                    alt={_.label}
                    className="w-full rounded-full object-contain"
                    width={120}
                    height={120}
                  />
                  <span className="mt-2 whitespace-nowrap text-center text-xs">
                    {_.label}
                  </span>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategorySwiper;
