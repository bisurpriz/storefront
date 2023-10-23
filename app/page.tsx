"use client";

import CustomSwiper from "@/components/Swiper";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <CustomSwiper
      direction="horizontal"
      options={{
        slidesPerView: 3,
        loop: true,
        spaceBetween: 10,
      }}
      slideItems={Array.from({ length: 5 }, (_, i) => ({
        key: i.toString(),
        children: (
          <div className="p-4 max-w-xs">
            <div className="prose-img:1/1 prose-img:rounded prose-img:shadow-lg prose-img:overflow-hidden">
              <Image
                src={"https://picsum.photos/200/300"}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </div>
            <div className="text-center text-md font-bold text-gray-800">
              Stage 1
            </div>
            <div className="text-center text-xs font-bold text-gray-500">
              25 questions
            </div>
          </div>
        ),
      }))}
    />
  );
}
