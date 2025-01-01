"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ZoomableImageProps {
  src: string;
  alt: string;
  onZoomChange?: (isZoomed: boolean) => void;
}

const ZoomableImage = ({ src, alt, onZoomChange }: ZoomableImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const zoomPreviewRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const lastTapTime = useRef(0);

  const calculatePreviewPosition = () => {
    if (!imageRef.current || !zoomPreviewRef.current || isMobile) return null;

    const imageRect = imageRef.current.getBoundingClientRect();
    const previewRect = zoomPreviewRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const scrollY = window.scrollY;

    const spaceOnRight = windowWidth - imageRect.right;
    const previewWidth = previewRect.width || 500;
    const gap = 20;

    const left =
      spaceOnRight >= previewWidth + gap
        ? imageRect.right + gap
        : imageRect.left - previewWidth - gap;

    const top = imageRect.top + scrollY;

    return { top, left };
  };

  const updatePreviewPosition = () => {
    if (!zoomPreviewRef.current || isMobile) return;

    const position = calculatePreviewPosition();
    if (!position) return;

    zoomPreviewRef.current.style.top = `${position.top}px`;
    zoomPreviewRef.current.style.left = `${position.left}px`;
  };

  useEffect(() => {
    if (isZoomed && !isMobile) {
      updatePreviewPosition();
      window.addEventListener("scroll", updatePreviewPosition);
      window.addEventListener("resize", updatePreviewPosition);

      return () => {
        window.removeEventListener("scroll", updatePreviewPosition);
        window.removeEventListener("resize", updatePreviewPosition);
      };
    }
  }, [isZoomed, isMobile]);

  const handleDoubleTap = (e: TouchEvent) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime.current;

    if (tapLength < 300 && tapLength > 0) {
      setIsMobileZoomed(!isMobileZoomed);
      setPanPosition({ x: 0, y: 0 });
    }

    lastTapTime.current = currentTime;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isMobileZoomed || !imageRef.current) return;

    e.preventDefault();
    const touch = e.touches[0];

    if (e.touches.length === 1) {
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;

      setPanPosition((prev) => {
        const imageRect = imageRef.current!.getBoundingClientRect();
        const maxPanX = imageRect.width;
        const maxPanY = imageRect.height;

        const newX = Math.min(Math.max(prev.x + deltaX, -maxPanX), maxPanX);
        const newY = Math.min(Math.max(prev.y + deltaY, -maxPanY), maxPanY);

        return { x: newX, y: newY };
      });
    }

    setLastTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setLastTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!imageRef.current || isMobile) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => !isMobile && setIsZoomed(true);
  const handleMouseLeave = () => !isMobile && setIsZoomed(false);

  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-lg">
      <div
        ref={imageRef}
        className={cn(
          "relative h-full w-full",
          isMobile ? "touch-none" : "cursor-zoom-in",
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDoubleTap}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-contain transition-transform duration-200",
            isMobileZoomed && "scale-[2.5]",
          )}
          style={
            isMobileZoomed
              ? {
                  transform: `scale(2.5) translate(${panPosition.x}px, ${panPosition.y}px)`,
                }
              : undefined
          }
          sizes="(min-width: 1024px) 40vw, 80vw"
          priority
          quality={isMobileZoomed ? 100 : 80}
        />

        {isZoomed && !isMobile && (
          <div
            className="pointer-events-none absolute z-10 h-1/3 w-1/3 border border-primary/50 bg-white/10"
            style={{
              left: `${position.x - 16.5}%`,
              top: `${position.y - 16.5}%`,
            }}
          />
        )}
      </div>

      {isZoomed &&
        !isMobile &&
        createPortal(
          <div
            ref={zoomPreviewRef}
            className={cn(
              "fixed z-50 aspect-square w-[500px] overflow-hidden rounded-lg border bg-white shadow-xl",
              "duration-200 animate-in fade-in zoom-in-95",
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="500px"
                quality={100}
                style={{
                  transform: `scale(2.5)`,
                  transformOrigin: `${position.x}% ${position.y}%`,
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ZoomableImage;
