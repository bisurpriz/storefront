import React from "react";
import Rating from "./Rating";
import Popover from "@/components/Popover";
import RatingDetail from "./RatingDetail";
import { RatingProps } from "./RatingDetail";

type ProductInformationProps = {
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  promotion?: string;
  rateCounts: RatingProps["rateCounts"];
  discountRate?: number;
};

const ProductInformation = ({
  name,
  price,
  rateCounts,
  rating,
  reviewCount,
  discountPrice,
  promotion,
  discountRate,
}: ProductInformationProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 p-8 w-full h-full bg-4 rounded-md shadow-md max-md:w-full max-md:p-2 max-md:rounded-none max-md:shadow-none">
      <div className="rounded-lg w-full flex items-start justify-start gap-2 flex-col">
        <h1 className="text-2xl font-medium text-gray-800 max-w-lg mb-4">
          {name}
        </h1>
        <div className="flex items-end justify-start gap-2 max-xs:flex-col max-xs:items-start w-full">
          <div className="flex items-center justify-start gap-2 max-lg:flex-col max-lg:items-start">
            {discountRate && (
              <span className="text-xl font-medium text-slate-200 max-w-lg bg-red-500 p-2 rounded-xl w-max">
                {discountRate}%
              </span>
            )}
            <span className="flex flex-col gap-1">
              {discountPrice && (
                <h5 className="text-base leading-none font-light text-slate-500 max-w-lg mb-0 whitespace-nowrap">
                  <del>₺{price?.toFixed(2)}</del>
                </h5>
              )}
              <span className="flex items-end gap-2 max-xl:flex-col max-xl:items-start max-xl:text-start">
                <h1 className="text-2xl leading-none font-semibold max-w-lg mt-0 whitespace-nowrap">
                  {discountPrice ? discountPrice : price}
                </h1>
                {promotion && (
                  <p className="text-sm leading-none text-primary max-w-lg mt-0 whitespace-nowrap">
                    & {promotion}
                  </p>
                )}
              </span>
            </span>
          </div>
          <div className="rounded-lg text-end w-full max-xs:text-start max-xs:mt-4">
            <Popover
              content={
                <RatingDetail
                  rateCounts={rateCounts}
                  rating={rating}
                  totalRating={reviewCount}
                />
              }
              position="bottom"
            >
              <Rating
                value={rating}
                reviewCount={reviewCount}
                readOnly
                className="max-w-[100px] xs:ml-auto"
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
