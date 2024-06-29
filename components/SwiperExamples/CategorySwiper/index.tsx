"use client";

import { FC, memo } from "react";
import CustomSwiper from "../../Swiper";
import Image from "next/image";
import { useMeasure } from "@uidotdev/usehooks";
import Card from "../../Card";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import Link from "next/link";
import clsx from "clsx";

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
          slidePerView={Math.floor(width / 100) || 10}
          spaceBetween={20}
          navigation={true}
          slideItems={categories.map((item, i) => ({
            key: i.toString(),
            children: (
              <div className="flex-shrink-0 group">
                <Link className="block w-full" href={`/${item.slug}`}>
                  <Image
                    // random images
                    src={`https://picsum.photos/seed/${item.id}/120/120`}
                    alt={item.name}
                    width={120}
                    height={120}
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
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default memo(CategorySwiper);
