"use client";

import { useMemo } from "react";
import Rating from "./CustomRating";
import clsx from "clsx";

const ReviewRating = ({
  value = 0,
  readOnly = false,
  reviewCount = 0,
  className = "",
  showReviewCount = true,
  onChange,
  tooltips = [],
}: {
  value: number;
  readOnly?: boolean;
  reviewCount?: number;
  className?: string;
  showReviewCount?: boolean;
  onChange?: (value: number) => void;
  tooltips?: string[];
}) => {
  const reviewCountText = useMemo(() => {
    return reviewCount > 0
      ? `${reviewCount} Değerlendirme`
      : "Henüz Değerlendirme Yapılmamış";
  }, [reviewCount]);

  const textStyle =
    "leading-normal text-slate-400 whitespace-nowrap cursor-pointer";

  return (
    <div className="flex items-center font-semibold gap-1">
      {showReviewCount && (
        <>
          <p className={clsx(textStyle, "text-sm")}>
            {value.toFixed(1)} {reviewCount > 0 && "•"}
          </p>
          <span className="w-1 h-1 bg-slate-400 rounded-full flex-shrink-0 mx-1" />
        </>
      )}

      <Rating
        defaultValue={value}
        disabled={readOnly}
        max={5}
        onChange={onChange}
        tooltips={tooltips}
        value={value}
      />
      {showReviewCount && (
        <>
          <span className="w-1 h-1 bg-slate-400 rounded-full flex-shrink-0 mx-1" />
          <p className={clsx(textStyle, "text-xs text-warning")}>
            {reviewCountText}
          </p>
        </>
      )}
    </div>
  );
};

export default ReviewRating;
