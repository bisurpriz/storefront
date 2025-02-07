"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { useEffect, useMemo, useState, useTransition } from "react";
import ZoomableImage from "./ZoomableImage";

interface DetailImageGalleryProps {
  images: string[];
  className?: string;
  isMobile?: boolean;
}

const DetailImageGallery = ({
  images,
  className,
  isMobile,
}: DetailImageGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isZoomed, setIsZoomed] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  const validImages = useMemo(
    () =>
      images.filter((img) => {
        try {
          if (img.startsWith("http")) {
            new URL(img);
            return true;
          }
          return true;
        } catch {
          console.warn("Invalid image URL:", img);
          return false;
        }
      }),
    [images],
  );

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap());
        setHighQualityLoaded(false);
      });
    });
  }, [api]);

  // Preload images
  useEffect(() => {
    validImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = getImageUrlFromPath(src);
    });
  }, [validImages]);

  // Load first image in low quality
  useEffect(() => {
    if (validImages.length > 0) {
      const imageUrl = getImageUrlFromPath(validImages[0]);
      const highQualityImage = new window.Image();
      highQualityImage.src = imageUrl;
      highQualityImage.onload = () => setHighQualityLoaded(true);
    }
  }, [validImages]);

  const thumbnails = useMemo(
    () => (
      <div className="order-2 mt-2 xl:order-1 xl:mr-2 xl:mt-0">
        <Carousel
          opts={{
            align: "start",
            axis: "x",
          }}
          className="w-full xl:w-[100px]"
          orientation={!isMobile ? "vertical" : "horizontal"}
        >
          <CarouselContent
            className={cn("-ml-2 xl:-ml-0 xl:-mt-2", "flex xl:flex-col")}
          >
            {validImages.map((src, index) => {
              const imageUrl = getImageUrlFromPath(src);

              return (
                <CarouselItem
                  key={src}
                  className={cn(
                    "pl-2 xl:pl-0 xl:pt-2",
                    "shrink-0 basis-[90px]",
                  )}
                >
                  <button
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "group relative aspect-square h-[90px] w-[90px] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                      current === index
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50",
                      isPending && "opacity-50",
                    )}
                    disabled={isPending}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={imageUrl}
                        alt={`Product thumbnail ${index + 1}`}
                        width={90}
                        height={90}
                        sizes="90px"
                        priority={false}
                        className="object-contain w-auto h-auto transition-opacity duration-300 aspect-square"
                      />
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {validImages.length > 4 && (
            <>
              <CarouselPrevious className="hidden xl:-top-8 xl:left-1/2 xl:flex xl:-translate-x-1/2 xl:rotate-90" />
              <CarouselNext className="hidden xl:-bottom-8 xl:left-1/2 xl:flex xl:-translate-x-1/2 xl:rotate-90" />
            </>
          )}
        </Carousel>
      </div>
    ),
    [validImages, current, isPending, api],
  );

  const mainCarousel = useMemo(() => {
    return (
      <div className="order-1 w-full xl:order-2">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {validImages.map((src, index) => {
              const imageUrl = getImageUrlFromPath(src);
              const isFirstImage = index === 0;

              return (
                <CarouselItem key={src}>
                  <div
                    className={cn(
                      "relative mx-auto aspect-square w-full max-w-[500px]",
                      isPending && "animate-pulse bg-gray-200",
                    )}
                  >
                    {isFirstImage && !highQualityLoaded && (
                      <Image
                        src={`${imageUrl}?w=50&q=10`}
                        alt={`Product image ${index + 1} placeholder`}
                        width={500}
                        height={500}
                        className={cn(
                          "absolute inset-0 h-full w-full object-contain blur-sm",
                          isPending && "opacity-50",
                        )}
                        sizes="(min-width: 1280px) 500px, 100vw"
                        priority
                        quality={10}
                      />
                    )}
                    <ZoomableImage
                      src={imageUrl}
                      alt={`Product image ${index + 1}`}
                      onZoomChange={setIsZoomed}
                      priority={isFirstImage}
                      width={500}
                      height={500}
                      quality={isFirstImage ? 60 : 80}
                      onLoad={
                        isFirstImage
                          ? () => setHighQualityLoaded(true)
                          : undefined
                      }
                      isLoading={isPending}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {!isZoomed && validImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute z-10 left-2" />
              <CarouselNext className="absolute z-10 right-2" />
            </>
          )}
        </Carousel>
      </div>
    );
  }, [validImages, isPending, isZoomed, highQualityLoaded]);

  if (!validImages.length) return null;

  return (
    <div className={cn("mx-auto flex flex-col xl:flex-row", className)}>
      {thumbnails}
      {mainCarousel}
    </div>
  );
};

export default DetailImageGallery;
