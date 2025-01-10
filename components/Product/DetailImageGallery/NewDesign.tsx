"use client";

import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ZoomableImage from "./ZoomableImage";

interface DetailImageGalleryProps {
  images: string[];
  className?: string;
}

const DetailImageGallery = ({ images, className }: DetailImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

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
  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  }, [validImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    },
    [handleNext, handlePrevious],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const scrollThumbnailIntoView = useCallback(() => {
    if (!thumbnailsRef.current) return;
    const thumbnails = thumbnailsRef.current.children;
    if (thumbnails[selectedIndex]) {
      thumbnails[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    scrollThumbnailIntoView();
  }, [selectedIndex, scrollThumbnailIntoView]);

  useEffect(() => {
    validImages.forEach((src) => {
      const img = document.createElement("img");
      img.src = getImageUrlFromPath(src);
    });
  }, [validImages]);

  // İlk görseli düşük kalitede yükle
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
      <div
        ref={thumbnailsRef}
        className="order-2 flex h-[100px] w-full gap-2 overflow-x-auto xl:order-1 xl:h-[500px] xl:w-[100px] xl:flex-col xl:overflow-y-auto"
      >
        {validImages.map((src, index) => {
          const imageUrl = getImageUrlFromPath(src);

          return (
            <button
              key={src}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "group relative aspect-square h-[90px] w-[90px] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50",
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={imageUrl}
                  alt={`Product thumbnail ${index + 1}`}
                  width={90}
                  height={90}
                  sizes="90px"
                  priority={false}
                  className={cn(
                    "h-auto w-auto object-cover transition-opacity duration-300",
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    ),
    [validImages, selectedIndex],
  );

  const mainImage = useMemo(() => {
    const currentImage = validImages[selectedIndex];
    const imageUrl = getImageUrlFromPath(currentImage);
    const isFirstImage = selectedIndex === 0;

    return (
      <div className="order-1 w-full xl:order-2 xl:w-4/5">
        <div
          className={cn("relative mx-auto aspect-square w-full max-w-[500px]")}
        >
          {isFirstImage && !highQualityLoaded && (
            <Image
              src={`${imageUrl}?w=50&q=10`}
              alt={`Product image ${selectedIndex + 1} placeholder`}
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-contain blur-sm"
              sizes="(min-width: 1280px) 500px, 100vw"
              priority
              quality={10}
            />
          )}
          <ZoomableImage
            src={imageUrl}
            alt={`Product image ${selectedIndex + 1}`}
            onZoomChange={setIsZoomed}
            priority={isFirstImage}
            width={500}
            height={500}
            quality={isFirstImage ? 60 : 80}
            onLoadingComplete={
              isFirstImage ? () => setHighQualityLoaded(true) : undefined
            }
          />
          {!isZoomed && validImages.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }, [
    validImages,
    selectedIndex,
    isZoomed,
    handlePrevious,
    handleNext,
    highQualityLoaded,
  ]);

  if (!validImages.length) return null;

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto flex flex-col gap-2 xl:flex-row", className)}
    >
      {thumbnails}
      {mainImage}
    </div>
  );
};

export default DetailImageGallery;
