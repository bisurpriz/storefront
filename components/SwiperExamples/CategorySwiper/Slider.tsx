"use client";

import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { useMeasure } from "@uidotdev/usehooks";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySwiperSuspense from "./CategorySwiperSuspense";

interface LoopCheckParams {
  totalSlides: number;
  slidesPerView: number;
  slidesPerGroup: number;
  gridRows?: number; // Opsiyonel, grid sisteminde satır sayısı
}

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
    "rounded-lg",
    "mx-auto"
  );

  function canEnableLoop({
    totalSlides,
    slidesPerView,
    slidesPerGroup,
    gridRows = 1,
  }: LoopCheckParams): boolean {
    const minRequiredSlides = slidesPerView + slidesPerGroup;

    const isGridValid = totalSlides % gridRows === 0;

    const isGroupValid = totalSlides % slidesPerGroup === 0;

    if (totalSlides >= minRequiredSlides && isGroupValid && isGridValid) {
      return true;
    } else {
      return false;
    }
  }

  const navigation = slidesLength > Math.floor(window.innerWidth / slideWidth);
  const slidesPerGroup = 1;

  return (
    <div className={clsx("relative", "w-full", "overflow-hidden")} ref={ref}>
      <Swiper
        slidesPerView={slidesPerView}
        grid={{
          fill: "row",
          rows: 1,
        }}
        spaceBetween={10}
        slidesPerGroup={slidesPerGroup}
        pagination={{
          clickable: true,
        }}
        grabCursor
        navigation={navigation}
        modules={[Grid, Navigation]}
        loop={canEnableLoop({
          totalSlides: slidesLength,
          slidesPerView,
          slidesPerGroup,
        })}
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
