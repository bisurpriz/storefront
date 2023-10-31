/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { breakpoints } from "@/contants/breakpoints";
import useResponsive from "@/hooks/useResponsive";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// create fake 10 images
const images = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  url: `https://picsum.photos/seed/${i}/1280/1280`,
}));

const ProductDetailImageGallery = () => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);
  const [direction, setDirection] = React.useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const { isExtraLargeDesktop } = useResponsive();
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (isExtraLargeDesktop) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  }, [isExtraLargeDesktop]);

  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-2 ">
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
          modules={[Mousewheel]}
          width={width}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} onClick={() => setSelectedImage(image)}>
              <Image
                src={image.url}
                alt="Product Image"
                width={100}
                height={100}
                className={`rounded-lg cursor-pointer object-fill transition-all duration-300 ease-linear  ${
                  image.id === selectedImage.id
                    ? "border border-2 border-primary border-solid"
                    : "border border-2 border-transparent"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-full order-1 row-span-5 2xl:col-span-5 2xl:row-span-6 2xl:order-2 rounded-lg max-h-[500px]">
        <Image
          src={selectedImage.url}
          alt="Product Image"
          width={500}
          height={500}
          className="rounded-lg origin-top-left w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;
