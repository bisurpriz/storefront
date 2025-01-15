"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useState } from "react";

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
};

export const Image = ({
  src,
  alt,
  className,
  width = 300,
  height = 300,
  priority = false,
  fallbackSrc = "/images/placeholder-product.jpg",
  objectFit = "cover",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality,
  onLoad,
  onClick,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Shimmer effect for loading state
  const shimmer = `
    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#f3f4f6"/>
          <stop offset="50%" stop-color="#e5e7eb"/>
          <stop offset="100%" stop-color="#f3f4f6"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer)"/>
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  if (!src) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          "animate-pulse bg-gray-100",
          className,
        )}
        style={{ width, height }}
      >
        <span className="text-sm text-gray-400">Görsel Bulunamadı</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}

      <NextImage
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "transition-transform duration-300 ease-out",
          isLoading ? "blur-xl grayscale" : "blur-0 grayscale-0",
          `object-${objectFit}`,
        )}
        sizes={sizes}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer)}`}
        onError={() => setHasError(true)}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onClick={onClick}
        quality={quality}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Görsel Yüklenemedi</span>
        </div>
      )}
    </div>
  );
};
