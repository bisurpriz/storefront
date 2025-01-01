"use client";

import { Star } from "lucide-react";
import { memo, useMemo } from "react";

interface StarRatingProps {
  score?: number | null;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
} as const;

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const StarRating = memo(
  ({ score, reviewCount, size = "sm" }: StarRatingProps) => {
    // Score yoksa veya 0 ise özel gösterim
    if (!score) {
      return (
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`${sizeClasses[size]} stroke-[1.5] text-gray-200`}
                fill="currentColor"
              />
            ))}
          </div>
          <span
            className={`${textSizeClasses[size]} max-w-[90px] truncate text-gray-400 transition-colors group-hover:text-gray-500 sm:max-w-none`}
            title="Henüz değerlendirme yok, ilk değerlendiren siz olun!"
          >
            Değerlendirme yok
          </span>
        </div>
      );
    }

    const stars = useMemo(() => {
      return [...Array(5)].map((_, index) => {
        const fillPercentage = Math.max(
          0,
          Math.min(100, (score - index) * 100),
        );

        return (
          <div key={index} className="relative">
            {/* Arka plan yıldız */}
            <Star
              className={`${sizeClasses[size]} stroke-[1.5] text-gray-200`}
              fill="currentColor"
            />

            {/* Doluluk oranına göre sarı yıldız */}
            {fillPercentage > 0 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                }}
              >
                <Star
                  className={`${sizeClasses[size]} stroke-[1.5] text-yellow-400`}
                  fill="currentColor"
                />
              </div>
            )}
          </div>
        );
      });
    }, [score, size]);

    return (
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">{stars}</div>
        {reviewCount !== undefined && (
          <span
            className={`${textSizeClasses[size]} font-medium text-gray-500 transition-colors group-hover:text-gray-700`}
          >
            ({score.toFixed(1)})
          </span>
        )}
      </div>
    );
  },
);

StarRating.displayName = "StarRating";

export default StarRating;
