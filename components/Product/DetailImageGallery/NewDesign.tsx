"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { cn } from "@/lib/utils";

export default function NewDesignGallery({ images, isMobile }) {
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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
    [mainApi, thumbnailApi, isMobile]
  );

  return (
    <div className="flex flex-col xl:flex-row gap-2 mx-auto">
      <div className="w-full xl:w-[100px] order-2 xl:order-1">
        <Carousel
          setApi={setThumbnailApi}
          opts={{
            align: "start",
          }}
          orientation={isMobile ? "horizontal" : "vertical"}
          className={cn("w-full")}
        >
          <CarouselContent
            className={cn(
              isMobile ? "-ml-1 w-full h-auto" : "-mt-1 w-[100px] h-[500px]"
            )}
          >
            {images.map((image, index) => (
              <CarouselItem
                key={image}
                className={cn(
                  "p-0",
                  isMobile ? "basis-1/4 pl-1" : "basis-1/5 pt-1"
                )}
                onClick={() => onSelect(index)}
              >
                <div className={cn("p-1")}>
                  <Image
                    src={getImageUrlFromPath(image)}
                    alt={image}
                    width={90}
                    height={90}
                    className={cn(
                      "w-full h-full object-contain rounded-md",
                      index === current
                        ? "border-2 border-primary"
                        : "border-2 border-white"
                    )}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="w-full xl:w-4/5 order-1 xl:order-2">
        <Carousel
          setApi={setMainApi}
          opts={{
            loop: true,
          }}
          className="w-full h-full max-w-[500px] max-h-[500px] mx-auto"
        >
          <CarouselContent className="w-full h-full">
            {images.map((image, index) => (
              <CarouselItem
                key={image}
                className="flex aspect-square relative items-center justify-center w-full h-full"
              >
                <Image
                  src={getImageUrlFromPath(image, 500)}
                  alt={image}
                  className="h-full w-full object-contain rounded-md flex-1"
                  fill
                  sizes="(min-width: 640px) 500px, 100vw"
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
