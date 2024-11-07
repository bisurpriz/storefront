"use client";

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
  const reviewCountText =
    reviewCount > 0
      ? `${reviewCount} Değerlendirme`
      : "Henüz Değerlendirme Yapılmamış";

  const textStyle =
    "leading-normal text-slate-400 whitespace-nowrap cursor-pointer";

  return (
    <div className="flex items-center gap-1 font-semibold max-sm:flex-wrap">
      {showReviewCount && (
        <>
          <p className={clsx(textStyle, "text-sm")}>{value.toFixed(1)}</p>
          <span className="mx-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
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
          <span className="mx-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
          <p className={clsx(textStyle, "text-warning text-xs")}>
            {reviewCountText}
          </p>
        </>
      )}
    </div>
  );
};

export default ReviewRating;
