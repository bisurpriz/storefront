"use client";

import Popover from "@/components/Popover";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import Promotions from "./Promotions";
import RatingDetail, { RatingProps } from "./RatingDetail";
import DaySelect from "@/components/DatePicker/DaySelect";
import { parseJson } from "@/utils/format";
import { DeliveryType } from "@/common/enums/Product/product";
import Ticket from "@/components/Icons/Ticket";
import OutlineArchive from "@/components/Icons/OutlineArchive";
import { useEffect, useState } from "react";
import { useDeliveryTime } from "@/contexts/DeliveryTimeContext";

type ProductInformationProps = {
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  promotion?: string;
  rateCounts: RatingProps["rateCounts"];
  discountRate?: number;
  vendor?: {
    name?: string;
    id: any;
  };
  shippingType?: string;
  freeShipping?: boolean;
  deliveryTimeRanges: string;
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
  vendor,
  freeShipping,
  shippingType,
  deliveryTimeRanges,
}: ProductInformationProps) => {
  const hasDeliveryTime = Boolean(parseJson(deliveryTimeRanges)?.length);

  const isSameDay = Boolean(shippingType?.includes(DeliveryType.SAME_DAY));

  const showDaySelect = isSameDay && hasDeliveryTime;
  const showExactTime = isSameDay && !hasDeliveryTime;

  const { setDeliveryTimeHandler } = useDeliveryTime();

  useEffect(() => {
    return () => {
      setDeliveryTimeHandler(null);
    };
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full rounded-md max-md:w-full max-md:p-2 max-md:rounded-none max-md:shadow-none">
      <div className="rounded-lg w-full flex items-start justify-start flex-col">
        <h1 className="text-3xl text-gray-800 max-w-lg mb-2">{name}</h1>
        {vendor && (
          <div className="text-xs flex items-center max-md:mb-2">
            <label className="text-gray-800 me-1">Satıcı:</label>
            <Link
              href={`/vendor/${vendor.id}`}
              className="text-sky-600 font-bold cursor-pointer me-1"
            >
              {vendor.name}
            </Link>
          </div>
        )}

        <div className="flex items-end justify-start gap-2 max-xs:flex-col max-xs:items-start w-full mb-4 md:mt-4">
          <div className="flex items-center justify-start gap-2 max-lg:flex-col max-lg:items-start max-xs:flex-row max-xs:items-center">
            {discountRate ? (
              <span className="text-2xl font-medium text-slate-200 max-w-lg bg-red-500 p-2 rounded-xl w-max">
                {discountRate}%
              </span>
            ) : null}
            <span className="flex flex-col gap-1">
              {discountPrice ? (
                <h5 className="text-base leading-none font-light text-slate-500 max-w-lg mb-0 whitespace-nowrap">
                  <del>₺{price?.toFixed(2)} ₺</del>
                </h5>
              ) : null}
              <span className="flex items-end gap-2 max-xl:flex-col max-xl:items-start max-xl:text-start max-xs:flex-row max-xs:items-center">
                <h1 className="text-3xl leading-none font-semibold max-w-lg mt-0 whitespace-nowrap">
                  {discountPrice ? discountPrice : price}₺
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
                <span>
                  <RatingDetail
                    rateCounts={rateCounts}
                    rating={rating}
                    totalRating={reviewCount}
                  />
                </span>
              }
              placement="bottom"
            >
              <span>
                <Rating
                  value={rating}
                  reviewCount={reviewCount}
                  readOnly
                  className="max-w-[100px] xs:ml-auto"
                />
              </span>
            </Popover>
          </div>
        </div>
        <Promotions
          promotions={[
            {
              description: DeliveryType.SAME_DAY,
              icon: <Ticket />,
              filterKey: "SAME_DAY",
            },
            {
              description: freeShipping ? "Ücretsiz kargo" : "Ücretli gönderim",
              icon: <OutlineArchive />,
              filterKey: "FREE_SHIPPING",
            },
          ]}
        />
        {showExactTime && (
          <div className="p-1 px-4 bg-1 bg-opacity-50 rounded-xl my-2">
            <p className="text-xs text-gray-500">
              Ürün gün içinde herhangi bir saatte teslim edilecektir.
            </p>
          </div>
        )}
        {showDaySelect && (
          <DaySelect
            deliveryTimes={parseJson(deliveryTimeRanges)}
            onSelect={(date) => setDeliveryTimeHandler(date)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
