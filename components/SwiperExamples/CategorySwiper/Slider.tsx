"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import CategorySwiperSuspense from "./CategorySwiperSuspense";
import { useMeasure } from "@uidotdev/usehooks";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface Slide {
  id: number;
  imageUrl: string;
  label: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlayTime?: number;
  slideWidth?: number;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoPlayTime = 3000,
  slideWidth = 130,
}) => {
  const [mounted, setMounted] = useState<boolean>();
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <CategorySwiperSuspense />;

  const slidesPerView = Math.floor(width / slideWidth);

  const slidesLength = slides.length;

  const imageWrapperClasses = clsx(
    `w-[${slideWidth}px]`,
    `h-[${slideWidth}px]`,
    "bg-transparent",
    "rounded-lg"
  );

  return (
    <div className={clsx("relative", "w-full", "overflow-hidden")} ref={ref}>
      <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        centeredSlides={false}
        virtualTranslate={true}
        autoplay={
          autoPlayTime
            ? {
                delay: autoPlayTime,
                disableOnInteraction: false,
              }
            : false
        }
        grabCursor={true}
        navigation={slidesLength > Math.floor(window.innerWidth / slideWidth)}
        modules={[Navigation, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={imageWrapperClasses}>
              <Image
                src={getImageUrlFromPath(slide.imageUrl, 130)}
                alt={slide.label}
                className="rounded-full object-contain w-full"
                width={slideWidth}
                height={slideWidth}
                priority
              />
            </div>
            <span
              className={clsx(
                "block",
                "text-xs",
                "text-center",
                "text-gray-600",
                "mt-1"
              )}
            >
              {slide.label}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
