"use client";

import Image from "next/image";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import useResponsive from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import ProductImageGalleryLoading from "./DetailImageGallerySuspense";

export default function NewDesignGallery({ images, isMobile }) {
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const { isLargeDesktop } = useResponsive();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    mainApi.on("select", () => {
      setCurrent(mainApi.selectedScrollSnap());
      thumbnailApi.scrollTo(mainApi.selectedScrollSnap());
    });

    thumbnailApi.on("select", () => {
      setCurrent(thumbnailApi.selectedScrollSnap());
      mainApi.scrollTo(thumbnailApi.selectedScrollSnap());
    });
  }, [mainApi, thumbnailApi, isMobile]);

  const onSelect = React.useCallback(
    (index: number) => {
      mainApi?.scrollTo(index);
      thumbnailApi?.scrollTo(index);
    },
    [mainApi, thumbnailApi, isMobile],
  );

  if (!mounted) {
    return <ProductImageGalleryLoading />;
  }

  return (
    <div className="mx-auto flex flex-col gap-2 xl:flex-row">
      <div className="order-2 w-full xl:order-1 xl:w-[100px]">
        <Carousel
          setApi={setThumbnailApi}
          opts={{
            align: "start",
          }}
          orientation={isMobile || isLargeDesktop ? "horizontal" : "vertical"}
          className={cn("w-full")}
        >
          <CarouselContent
            className={cn(
              isMobile || isLargeDesktop
                ? "-ml-1 h-auto w-full"
                : "-mt-1 h-[500px] w-[100px]",
            )}
          >
            {images.map((image, index) => (
              <CarouselItem
                key={image}
                className={cn(
                  "p-0",
                  isMobile || isLargeDesktop
                    ? "basis-1/4 pl-1"
                    : "basis-1/5 pt-1",
                )}
                onClick={() => onSelect(index)}
              >
                <div className={cn("p-1")}>
                  <Image
                    src={getImageUrlFromPath(image)}
                    alt={image}
                    width={90}
                    sizes="90px"
                    height={90}
                    priority
                    className={cn(
                      "h-full w-full rounded-md object-contain",
                      index === current
                        ? "border-2 border-primary"
                        : "border-2 border-white",
                    )}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="order-1 w-full xl:order-2 xl:w-4/5">
        <Carousel
          setApi={setMainApi}
          opts={{
            loop: true,
          }}
          className="mx-auto h-full max-h-[500px] w-full max-w-[500px]"
        >
          <CarouselContent className={cn("m-0 h-full w-full")}>
            {images.map((image, index) => (
              <CarouselItem
                key={image}
                className="relative flex aspect-square h-full w-full items-center justify-center"
              >
                <Image
                  src={getImageUrlFromPath(image, 500)}
                  alt={image}
                  className="h-full w-full flex-1 rounded-md object-contain"
                  fill
                  sizes="500px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 sm:left-4" />
              <CarouselNext className="right-2 sm:right-4" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
}
