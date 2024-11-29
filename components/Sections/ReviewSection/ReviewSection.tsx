"use client";

import Rating from "@/components/ReviewRating/CustomRating";
import useScrollHorizontal from "@/hooks/useScrollHorizontal";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import React, { FC, useRef } from "react";

type ReviewSectionProps = {
  reviews: any;
};

const ReviewSection: FC<ReviewSectionProps> = ({ reviews }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ScrollButtons } = useScrollHorizontal(scrollRef, true);

  return (
    <div className="rounded-md bg-gradient-to-l from-white via-lime-100 to-white py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-start text-lg font-semibold text-gray-700">
          Müşterilerimiz ne diyor ?
        </h2>
        <ScrollButtons />
      </div>
      <div className="no-scrollbar flex overflow-x-auto" ref={scrollRef}>
        <div className="flex space-x-6 py-1 md:mx-8">
          {reviews?.map((review) => {
            if (!review.comment) return null;
            return (
              <div
                key={review.id}
                className="w-80 flex-none transform rounded-lg bg-gray-50 shadow-md transition-all duration-300 ease-in-out md:hover:scale-105"
              >
                <div className="p-3">
                  <div className="flex items-center">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={review.user.picture ?? getImageUrlFromPath()}
                      alt={review.id.toString()}
                      width={40}
                      height={40}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-700">
                        {review.user.firstname}
                      </div>
                      <Rating
                        defaultValue={review.score}
                        disabled={true}
                        max={5}
                      />
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-3 font-sans text-sm text-gray-500">
                    {review.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
