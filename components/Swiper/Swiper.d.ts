import { SwiperSlideProps } from "swiper/react";
import { Swiper, SwiperOptions } from "swiper/types";

interface SwiperProps extends SwiperSlideProps {
  slideItems: SlideItem[];
  options?: SwiperOptions;
  onSlideChange?: (swiper: Swiper) => void;
  onSwpier?: (swiper: Swiper) => void;
  direction?: "horizontal" | "vertical";
  slidePerView?: number;
  spaceBetween?: number;
}

interface SlideItem {
  /* @param key: slide key will be unique */
  key: string;
  children: React.ReactNode;
  className?: string;
}
