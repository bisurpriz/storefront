"use client";

import { useMemo } from "react";
import Rating from "react-rating";
import { CustomStar } from "./CustomStar";

const ReviewRating = ({
  value = 0,
  readOnly = false,
  reviewCount = 0,
  className = "",
  showReviewCount = true,
  onChange,
}: {
  value: number;
  readOnly?: boolean;
  reviewCount?: number;
  className?: string;
  showReviewCount?: boolean;
  onChange?: (value: number) => void;
}) => {
  const reviewCountText = useMemo(() => {
    return reviewCount > 0
      ? `${reviewCount} Değerlendirme`
      : "Henüz Değerlendirme Yapılmamış";
  }, [reviewCount]);

  return (
    <div className="flex items-center font-semibold gap-1">
      {showReviewCount && (
        <p className="leading-5 text-sm mb-1 text-slate-400 whitespace-nowrap">
          {value.toFixed(1)} {reviewCount > 0 && "•"}
        </p>
      )}
      <Rating
        initialRating={value}
        fractions={2}
        readonly={readOnly}
        onChange={onChange}
        className={className}
        direction="ltr"
        key={value}
        emptySymbol={
          <CustomStar className="w-4 h-4 fill-gray-300 stroke-gray-300" />
        }
        fullSymbol={
          <CustomStar className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
        }
      />
      {showReviewCount && (
        <p className="leading-5 text-xs mb-0.5 ml-1 text-slate-400 whitespace-nowrap">
          {reviewCountText}
        </p>
      )}
    </div>
  );
};

export default ReviewRating;
