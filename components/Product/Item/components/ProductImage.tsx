"use client";

import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { cn, getImageUrlFromPath } from "@/lib/utils";

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
        "group relative aspect-[3/4] h-52 w-full flex-shrink-0 items-center justify-center lg:h-56 2xl:h-60",
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
      <Image
        src={getImageUrlFromPath(imageUrl)}
        alt={alt}
        className={cn(
          "h-full w-full rounded-t-lg object-contain transition-transform duration-300 ease-out",
        )}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        width={300}
        height={300}
        priority={priority}
      />
    </div>
  );
};
