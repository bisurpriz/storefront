"use client";

import React, { memo } from "react";
import CustomSwiper from "../../Swiper";
import Image from "next/image";
import { useMeasure } from "@uidotdev/usehooks";
import Card from "../../Card";
import { data } from "./constants";

const CategorySwiper = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <div ref={ref} className="mb-8">
      <Card bordered={false} contentClass="py-0 px-0">
        <CustomSwiper
          direction="horizontal"
          slidePerView={Math.floor(width! / 200)}
          spaceBetween={20}
          slideItems={data.map((item, i) => ({
            key: i.toString(),
            children: (
              <Card wrapperClass={`${item.bg} cursor-pointer group shadow-lg`}>
                <div className={`flex flex-col items-center justify-center`}>
                  <Image
                    src={`/shop/${item.img}`}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="transform group-hover:scale-110 transition-all duration-300 ease-in-out"
                    loading="lazy"
                  />
                  <div className="text-center text-sm font-bold text-gray-800">
                    {item.title}
                  </div>
                </div>
              </Card>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default memo(CategorySwiper);
