/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MagnifierImage from "@/components/ZoomableImage";
import useResponsive from "@/hooks/useResponsive";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import React, { useEffect } from "react";
import { Mousewheel, Virtual, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

// create fake 10 images
const images = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  url: `https://picsum.photos/seed/${i}/1280/1280`,
}));

const ProductDetailImageGallery = () => {
  const [swipperRef, setSwipperRef] = React.useState<SwiperType>(
    {} as SwiperType
  );
  const [direction, setDirection] = React.useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const { isExtraLargeDesktop } = useResponsive();
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [selected, setSelected] = React.useState<number>(0);
  const [scaled, setScaled] = React.useState<number>(1);

  const isScaled = scaled === 1 ? "cursor-zoom-in" : "cursor-zoom-out";

  useEffect(() => {
    if (isExtraLargeDesktop) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  }, [isExtraLargeDesktop]);

  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-2">
      <div
        className="col-span-full row-span-1 order-2 2xl:col-span-1 2xl:row-span-6 2xl:order-1 overflow-hidden flex flex-col items-center justify-star rounded-lg max-h-[500px]"
        ref={ref}
      >
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          direction={direction}
          className="h-full gallery-scroll-hide"
          mousewheel={true}
          modules={[Mousewheel, Virtual]}
          width={width}
          virtual
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image.id}
              onClick={() => {
                swipperRef?.slideTo(index);
                setSelected(index);
              }}
            >
              <Image
                src={image.url}
                alt="Product Image"
                width={100}
                height={100}
                className={`rounded-lg cursor-pointer object-fill transition-all duration-300 ease-linear  ${
                  index === selected
                    ? "border border-2 border-primary border-solid"
                    : "border border-2 border-transparent"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-full order-1 row-span-5 2xl:col-span-5 2xl:row-span-6 2xl:order-2 rounded-lg ">
        <Swiper
          className="h-full gallery-scroll-hide"
          modules={[Zoom]}
          zoom={true}
          onSwiper={(swiper) => {
            setSwipperRef(swiper);
            setSelected(swiper.activeIndex);
          }}
          onSlideChange={(swiper) => {
            setSelected(swiper.activeIndex);
          }}
          onZoomChange={(swiper, scale) => {
            setScaled(scale);
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="swiper-zoom-container">
                <Image
                  src={image.url}
                  alt={`Product Image ${image.id}`}
                  width={1024}
                  height={1024}
                  className={`rounded-lg w-full h-full transition-all duration-300 ease-linear ${isScaled}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;
