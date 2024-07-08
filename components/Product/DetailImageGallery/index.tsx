"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import Carousel from "react-multi-carousel";

type ProductDetailImageGalleryProps = {
  images: {
    id: number;
    url: string;
  }[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const swiperRef = useRef(null);
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

  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-2 max-h-[500px] max-md:max-h-[720px]">
      <div
        className="col-span-full row-span-1 order-2 2xl:col-span-1 2xl:row-span-full 2xl:order-1 overflow-hidden rounded-lg"
        ref={ref}
      >
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container"
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {images?.map((image, index) => (
            <Image
              key={image.url}
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
          ))}
        </Carousel>
      </div>
      <div className="col-span-full order-1 row-span-5 2xl:col-span-5 2xl:row-span-6 2xl:order-2 rounded-lg ">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {images?.map((image) => (
            <div className="swiper-zoom-container" key={image.url}>
              <Image
                src={image.url}
                alt={`Product Image ${image.id}`}
                width={1024}
                height={1024}
                className={`rounded-lg transition-all duration-300 ease-linear object-contain`}
                priority={image.id === 0}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;
