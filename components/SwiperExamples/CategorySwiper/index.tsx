"use client";

import { FC, memo } from "react";
import CustomSwiper from "../../Swiper";
import Image from "next/image";
import { useMeasure } from "@uidotdev/usehooks";
import Card from "../../Card";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import Link from "next/link";

type CategorySwiperProps = {
  categories: GetMainCategoriesQuery["category"];
};

const CategorySwiper: FC<CategorySwiperProps> = ({ categories }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  if (!categories || !ref) return null;

  return (
    <div ref={ref} className="mb-8">
      <Card bordered={false} contentClass="!p-0">
        <CustomSwiper
          direction="horizontal"
          slidePerView={Math.floor(width / 90) || 10}
          spaceBetween={20}
          navigation={true}
          slideItems={categories.map((item, i) => ({
            key: i.toString(),
            children: (
              <div className="flex-shrink-0 group">
                <Link className="block w-full" href={`/${item.slug}`}>
                  <Image
                    src="https://source.unsplash.com/random/80x80"
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-full object-contain w-full aspect-square group-hover:opacity-80 transition-opacity"
                  />
                  <p className="mt-2 text-center font-normal text-xs leading-none font-monrope">
                    {item.name}
                  </p>
                </Link>
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default memo(CategorySwiper);
