"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { CustomSwiperProps } from "./Swiper";
import { Navigation } from "swiper/modules";

const CustomSwiper = ({
  options,
  slideItems,
  onSwpier,
  onSlideChange,
  direction = "vertical",
  slidePerView = 1,
  spaceBetween = 0,
  navigation,
  ...props
}: CustomSwiperProps) => {
  return (
    <Swiper
      {...options}
      {...props}
      direction={direction}
      onSlideChange={onSlideChange}
      onSwiper={onSwpier}
      slidesPerView={slidePerView}
      spaceBetween={spaceBetween}
      className={`w-full h-full`}
      modules={[Navigation]}
      navigation={navigation}
    >
      {slideItems.map((item) => {
        const className = item.className ? item.className : "";
        return (
          <SwiperSlide
            className={`flex items-center justify-center ${className}`}
            key={item.key}
          >
            {item.children}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CustomSwiper;
