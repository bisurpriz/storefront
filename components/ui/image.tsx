"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { memo, useCallback, useState } from "react";

type ImageProps = {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onClick?: () => void;
  imageClassName?: string;
  fill?: boolean;
};

// Create a simple, static shimmer SVG for blur placeholder
const shimmerDataURL = `data:image/svg+xml;base64,${Buffer.from(`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><rect id="r" width="100%" height="100%" fill="url(#g)"/><defs><linearGradient id="g" gradientTransform="rotate(90)"><stop offset="0%" stop-color="#f3f4f6"/><stop offset="50%" stop-color="#e5e7eb"/><stop offset="100%" stop-color="#f3f4f6"/></linearGradient></defs></svg>`).toString("base64")}`;

// Memoized image component for better performance
export const Image = memo(
  ({
    src,
    alt,
    className,
    width = 300,
    height = 300,
    priority = false,
    fallbackSrc = "/images/placeholder-product.jpg",
    objectFit = "cover",
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    quality = 75, // Default to 75% quality for good balance
    onLoad,
    onClick,
    imageClassName,
    fill = false,
  }: ImageProps) => {
    // Use React 19's automatic batching for state updates
    const [hasError, setHasError] = useState(false);

    // Memoize the error handler to prevent re-renders
    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    // Memoize the load handler to prevent re-renders
    const handleLoad = useCallback(() => {
      onLoad?.();
    }, [onLoad]);

    // Early return for missing src - React 19 optimizes these early returns better
    if (!src) {
      return (
        <div
          className={cn(
            "relative flex items-center justify-center bg-gray-100",
            className,
          )}
          style={{ width, height }}
          aria-label="Image not found"
          role="img"
        >
          <span className="text-sm text-gray-400">Görsel Bulunamadı</span>
        </div>
      );
    }

    // React 19 optimizes conditional rendering better
    return (
      <div
        className={cn("relative overflow-hidden bg-gray-100", className)}
        // Add proper aspect ratio to prevent layout shifts
        style={!fill ? { aspectRatio: `${width}/${height}` } : undefined}
      >
        <NextImage
          src={hasError ? fallbackSrc : src}
          alt={alt}
          className={cn(`object-${objectFit}`, imageClassName)}
          sizes={sizes}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          fill={fill}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={shimmerDataURL}
          onError={handleError}
          onLoad={handleLoad}
          onClick={onClick}
          quality={quality}
          fetchPriority={priority ? "high" : "auto"}
          // React 19 supports better resource loading
          decoding="async"
        />

        {/* Error State - Only render when needed */}
        {hasError && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
            role="alert"
            aria-live="polite"
          >
            <span className="text-sm text-gray-500">Görsel Yüklenemedi</span>
          </div>
        )}
      </div>
    );
  },
);

// Add display name for better debugging
Image.displayName = "Image";
