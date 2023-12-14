"use client";

import React from "react";
import { Rating as RatingPackage } from "@smastrom/react-rating";

export const CustomStar = (
  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
);

const Rating = ({
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
  const reviewCountText = reviewCount > 0 ? `${reviewCount} Değerlendirme` : "Henüz Değerlendirme Yapılmamış";

  return (
    <>
      <RatingPackage
        className={`max-w-[80px] ${className}`}
        value={value}
        halfFillMode="svg"
        spaceInside={"small"}
        onChange={(value: number) => onChange?.(value)}
        readOnly={readOnly}
        visibleItemLabelIds={["1", "2", "3", "4", "5"]}
        visibleLabelId="rating"
        radius="none"
        itemStyles={{
          itemShapes: CustomStar,
          activeFillColor: "#ffb23f",
          activeStrokeColor: "#e17b21",
          inactiveFillColor: "#fff7ed",
          inactiveStrokeColor: "#e17b21",
          itemStrokeWidth: 1,
        }}
      />
      {showReviewCount && (
        <p className="text-sm m-0 leading-none text-slate-500 max-w-lg mt-0 whitespace-nowrap">{reviewCountText}</p>
      )}
    </>
  );
};

export default Rating;
