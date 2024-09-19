"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";

type ProductDetailImageGalleryProps = {
  images: string[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isDesktop } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);

  const getImageUrl = useMemo(() => getImageUrlFromPath, []);

  return (
    <div
      className={clsx(
        "flex justify-start items-start h-[500px] gap-2 max-lg:flex-col max-lg:h-full max-lg:w-full",
        "max-lg:flex-col-reverse max-h-[500px] max-lg:gap-0 max-lg:w-full"
      )}
    >
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction={isDesktop ? "horizontal" : "vertical"}
        slidesPerView={4}
        className={clsx(
          "h-full m-0",
          "max-lg:w-full max-lg:h-[100px] max-lg:mb-2 max-lg:mt-2 max-lg:gap-2"
        )}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image}
            className={clsx(
              "h-[100px] w-[100px] flex items-center justify-center border border-gray-200 rounded-md overflow-hidden shadow-sm",
              activeIndex === index && "border-primary",
              "max-lg:w-[100px] max-lg:h-[100px]"
            )}
          >
            <Image
              src={getImageUrl(image)}
              alt={image}
              className="h-full w-full object-contain"
              width={100}
              height={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom, FreeMode, Navigation, Thumbs]}
        slidesPerView={1}
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className={clsx(
          "flex-1 ring-1 ring-gray-200 rounded-lg",
          "max-lg:w-full max-lg:h-[400px] max-lg:mt-2 max-lg:mb-2"
        )}
        style={{
          height: "-webkit-fill-available",
        }}
        zoom={true}
      >
        {images?.map((image) => (
          <SwiperSlide
            key={image}
            className={clsx(
              "w-full flex items-center justify-center",
              "max-lg:w-full max-lg:h-[400px]"
            )}
          >
            <Image
              src={getImageUrl(image)}
              alt={image}
              className="h-full w-full object-contain"
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductDetailImageGallery;
