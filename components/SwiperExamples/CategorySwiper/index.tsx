"use client";

import { FC } from "react";

import clsx from "clsx";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { cn } from "@/lib/utils";
import { Link } from "@/components/Link";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  const basis = cn(
    "basis-1/3 pl-2",
    "xs:basis-1/4",
    "sm:basis-1/5",
    "md:basis-1/6",
    "lg:basis-1/7",
    "xl:basis-1/8",
    "2xl:basis-1/9",
    "3xl:basis-1/9"
  );
  return (
    <div
      className={clsx("flex flex-nowrap overflow-x-auto gap-4 no-scrollbar")}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className=" -ml-2">
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
                  className={"flex items-center justify-center flex-col p-1"}
                >
                  <Image
                    src={getImageUrlFromPath(_.imageUrl)}
                    alt={_.label}
                    className="object-contain w-full rounded-full"
                    width={120}
                    height={120}
                  />
                  <span className="mt-2 text-xs">{_.label}</span>
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
