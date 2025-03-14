"use client";

import { Button } from "@/components/ui/button";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductCarousel = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Main carousel options
  const [mainRef, mainApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  // Thumbnails carousel options
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: isDesktop ? "y" : "x",
  });

  // Handle resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024; // lg breakpoint
      setIsDesktop(desktop);
      if (thumbsApi) {
        thumbsApi.reInit({ axis: desktop ? "y" : "x" });
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [thumbsApi]);

  // Event Handlers
  function handleThumbClick(index: number) {
    mainApi?.scrollTo(index);
  }

  function handleSelect() {
    if (!mainApi || !thumbsApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbsApi.scrollTo(index);
  }

  // Setup event listeners
  if (mainApi) {
    mainApi.on("select", handleSelect);
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[6rem_1fr] lg:gap-4">
      {/* Thumbnails - will be on left for desktop, bottom for mobile */}
      <div className="order-2 overflow-hidden lg:order-1" ref={thumbsRef}>
        <div className="grid touch-pan-x auto-cols-[5.5rem] grid-flow-col gap-2 lg:touch-pan-y lg:grid-flow-row lg:auto-rows-[6rem] lg:grid-rows-[repeat(auto-fill,minmax(6rem,1fr))]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent",
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={selectedIndex === index}
            >
              <Image
                src={getImageUrlFromPath(image)}
                sizes="(max-width: 768px) 72px, 80px"
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative order-1 lg:order-2">
        <div className="overflow-hidden rounded-lg" ref={mainRef}>
          <div className="flex touch-pan-y">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={getImageUrlFromPath(image)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute grid justify-between grid-cols-2 -translate-y-1/2 inset-x-3 top-1/2 lg:inset-x-4">
          <Button
            variant="outline"
            size="icon"
            className="justify-self-start bg-background/80 backdrop-blur-sm"
            onClick={() => mainApi?.scrollPrev()}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="justify-self-end bg-background/80 backdrop-blur-sm"
            onClick={() => mainApi?.scrollNext()}
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
