"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  imageUrl?: string;
  alt: string;
  className?: string;
  isCustomizable?: boolean;
  isSameDayDelivery?: boolean;
  priority?: boolean;
};

export const ProductImage = ({
  imageUrl,
  alt,
  className,
  isCustomizable,
  isSameDayDelivery,
  priority = false,
}: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback görsel için
  const fallbackImage = "/images/placeholder-product.jpg";

  // Yükleme durumu için shimmer efekti
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

  if (!imageUrl) {
    return (
      <div
        className={cn(
          "relative aspect-[3/4] h-52 w-full flex-shrink-0 lg:h-56 2xl:h-60",
          "animate-pulse bg-gray-100",
          className,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Görsel Bulunamadı</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative aspect-[3/4] h-52 w-full flex-shrink-0 lg:h-56 2xl:h-60",
        "overflow-hidden",
        className,
      )}
    >
      {/* Badges */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {isCustomizable && (
          <Badge variant="new" size="sm" className="w-fit justify-start">
            🎨 Tasarlanabilir
          </Badge>
        )}
        {isSameDayDelivery && (
          <Badge
            variant="freeShipping"
            size="sm"
            className="w-fit justify-start"
          >
            🚚 Aynı Gün Teslimat
          </Badge>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}

      <Image
        src={hasError ? fallbackImage : getImageUrlFromPath(imageUrl, 300)}
        alt={alt}
        className={cn(
          "h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out",
          isLoading ? "blur-xl grayscale" : "blur-0 grayscale-0",
        )}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        width={300}
        height={300}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer)}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
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
