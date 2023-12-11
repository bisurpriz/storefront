"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import { Pagination, Virtual, Zoom } from "swiper/modules";
import useResponsive from "@/hooks/useResponsive";
import { Swiper as SwiperType } from "swiper/types";

type ProductDetailImageGalleryProps = {
  images: {
    id: number;
    url: string;
  }[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const { isExtraLargeDesktop } = useResponsive();
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    if (isExtraLargeDesktop) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  }, [isExtraLargeDesktop]);

  const handleImageClick = (index: number) => {
    swiperRef?.current?.swiper.slideTo(index);
    setSelected(index);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setSelected(swiper.activeIndex);
  };

  const handleZoomClick = (swiper: SwiperType) => {
    swiper.zoom.toggle();
  };

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
          modules={[Virtual]}
          width={width}
          virtual
        >
          {images?.map((image, index) => (
            <SwiperSlide key={image.id} onClick={() => handleImageClick(index)}>
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
          ref={swiperRef}
          className={`h-full gallery-scroll-hide cursor-zoom-in`}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-primary !opacity-100",
          }}
          modules={[Zoom, Pagination]}
          zoom={{
            toggle: false,
          }}
          onSlideChange={handleSlideChange}
          onClick={handleZoomClick}
        >
          {images?.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="swiper-zoom-container">
                <Image
                  src={image.url}
                  alt={`Product Image ${image.id}`}
                  width={1024}
                  height={1024}
                  className={`rounded-lg w-full h-full transition-all duration-300 ease-linear`}
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
