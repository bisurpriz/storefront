"use client";

import CustomSwiper from "@/components/Swiper";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Page() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  console.log(Math.floor(width! / 100));

  return (
    <div ref={ref}>
      <CustomSwiper
        direction="horizontal"
        options={{
          loop: true,
        }}
        slidePerView={Math.floor(width! / 100)}
        slideItems={Array.from({ length: 25 }, (_, i) => ({
          key: i.toString(),
          children: (
            <div className="p-4 max-w-xs">
              <div className="prose-img:1/1 prose-img:rounded prose-img:shadow-lg prose-img:overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${i}/200/300`}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                  className="aspect-ratio--3x4-l"
                />
              </div>
              <div className="text-center text-md font-bold text-gray-800">
                Lorem ipsum.
              </div>
              <div className="text-center text-xs font-bold text-gray-500">
                20.00 TL
              </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}
