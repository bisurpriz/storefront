"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperProps } from "./Swiper";

const CustomSwiper = ({
  options,
  slideItems,
  onSwpier,
  onSlideChange,
  direction = "vertical",
  slidePerView = 1,
  spaceBetween = 0,
}: SwiperProps) => {
  return (
    <Swiper
      {...options}
      direction={direction}
      onSlideChange={onSlideChange}
      onSwiper={onSwpier}
      slidesPerView={slidePerView}
      spaceBetween={spaceBetween}
      className="w-full h-full"
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
