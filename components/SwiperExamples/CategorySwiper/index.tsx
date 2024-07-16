"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Card from "../../Card";
import Link from "next/link";
import clsx from "clsx";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  const [responsive, setResponsive] = useState<ResponsiveType | null>({
    xs: {
      breakpoint: { max: 575, min: 376 },
      items: 3,
    },
  });

  useEffect(() => {
    setResponsive({
      xxs: {
        breakpoint: { max: 375, min: 0 },
        items: 2,
      },
      xs: {
        breakpoint: { max: 575, min: 376 },
        items: 3,
      },
      sm: {
        breakpoint: { max: 767, min: 576 },
        items: 5,
      },
      md: {
        breakpoint: { max: 991, min: 768 },
        items: 6,
      },
      lg: {
        breakpoint: { max: 1199, min: 992 },
        items: 8,
      },
      xl: {
        breakpoint: { max: 1400, min: 1200 },
        items: 10,
      },
    });
  }, [categories]);

  return (
    <div className="mb-8">
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        infinite={true}
        slidesToSlide={1}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {categories.map((item, i) => (
          <div className="flex-shrink-0 group" key={item.slug}>
            <Link className="block w-full" href={`/${item.slug}`}>
              <Image
                src={`https://picsum.photos/seed/${item.id}/120/120`}
                alt={item.name}
                width={100}
                height={100}
                className={clsx(
                  "w-24 h-24 mx-auto rounded-xl",
                  "group-hover:shadow-lg transition-shadow duration-200"
                )}
              />
              <p className="mt-2 text-center font-normal text-sm leading-none font-monrope">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CategorySwiper;
