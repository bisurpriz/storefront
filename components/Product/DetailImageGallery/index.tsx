"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { FreeMode, Navigation, Thumbs, Virtual, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/virtual";

import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import { useMeasure } from "@uidotdev/usehooks";

type ProductDetailImageGalleryProps = {
  images: string[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { isLargeDesktop } = useResponsive();
  const [activeIndex, setActiveIndex] = useState(0);

  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const getImageUrl = useMemo(() => getImageUrlFromPath, []);

  const slidePerview = useMemo(() => {
    return isLargeDesktop ? Math.floor(width / 120) : Math.floor(height / 120);
  }, [isLargeDesktop, width, height]);

  return (
    <div
      className={clsx(
        "flex justify-start items-start max-h-[800px] h-[500px] min-h-[500px] gap-2 max-xl:flex-col max-xl:h-full max-xl:w-full",
        "max-xl:flex-col-reverse max-xl:gap-0 max-xl:w-full"
      )}
      ref={ref}
    >
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        direction={isLargeDesktop ? "horizontal" : "vertical"}
        slidesPerView={slidePerview}
        className={clsx(
          "h-full m-0 w-[120px] ",
          "max-xl:w-full max-xl:mb-2 max-xl:mt-2 max-xl:gap-2"
        )}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image}
            className={clsx(
              "flex items-center justify-center border border-gray-200 rounded-md overflow-hidden shadow-sm",
              activeIndex === index && "border-primary"
            )}
          >
            <Image
              src={getImageUrl(image)}
              alt={image}
              className="w-full object-contain"
              width={120}
              height={120}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom, FreeMode, Navigation, Thumbs, Virtual]}
        slidesPerView={1}
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className={clsx(
          "flex-1 ring-1 ring-gray-200 rounded-lg w-full",
          "max-xl:w-full  max-xl:mt-2 max-xl:mb-2"
        )}
        style={{
          height: "-webkit-fill-available",
        }}
        zoom={true}
        virtual={true}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image}
            className={clsx(
              "w-full flex items-center justify-center",
              "max-xl:w-full "
            )}
            virtualIndex={index}
          >
            <div className="swiper-zoom-container">
              <Image
                src={getImageUrl(image)}
                alt={image}
                className="h-full w-full object-contain"
                width={500}
                height={500}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductDetailImageGallery;
