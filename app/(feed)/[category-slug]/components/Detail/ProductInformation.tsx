"use client";

import { Link } from "@/components/Link";
import Promotions from "./Promotions";
import RatingDetail, { RatingProps } from "./RatingDetail";
import DaySelect from "@/components/DatePicker/DaySelect";
import { parseJson } from "@/utils/format";
import { DeliveryType, FILTER_KEYS } from "@/common/enums/Product/product";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { stringToSlug } from "@/utils/stringToSlug";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { useCart } from "@/contexts/CartContext";
import Error from "@/components/Icons/Error";
import SevenOclock from "@/components/Icons/SevenOclock";
import FreeTruck from "@/components/Icons/FreeTruck";
import Palette from "@/components/Icons/Palette";
import { getPriceTR } from "@/utils/getPriceTR";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  isCustomizable?: boolean;
  lastOrderTime?: string;
};

const defaultRating = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
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
  isCustomizable,
  lastOrderTime,
}: ProductInformationProps) => {
  const hasDeliveryTime = useMemo(
    () => Boolean(parseJson(deliveryTimeRanges)?.length),
    [deliveryTimeRanges]
  );

  const manipulatedRateCounts = useMemo(() => {
    return Object.keys(defaultRating).reduce((acc, key) => {
      return {
        ...acc,
        [key]: rateCounts[key] || 0,
      };
    }, defaultRating);
  }, [rateCounts]);

  const isSameDay = shippingType === "SAME_DAY";
  const showDaySelect = useMemo(
    () => isSameDay && hasDeliveryTime,
    [isSameDay, hasDeliveryTime]
  );
  const showExactTime = useMemo(
    () => isSameDay && !hasDeliveryTime,
    [isSameDay, hasDeliveryTime]
  );

  const { setDeliveryTimeHandler, deliveryTime, isProductInCart } = useCart();

  const isSettedDeliveryTime = useMemo(() => {
    if (!isProductInCart || !deliveryTime) return false;

    return (
      Boolean(
        new Date(isProductInCart.deliveryDate).getDay() !==
          new Date(deliveryTime.day).getDay()
      ) || Boolean(isProductInCart.deliveryTime !== deliveryTime.hour)
    );
  }, [deliveryTime?.day, deliveryTime?.hour]);

  useEffect(() => {
    return () => {
      setDeliveryTimeHandler(null);
    };
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full rounded-md max-md:w-full  max-md:rounded-none max-md:shadow-none">
      <div className="rounded-lg w-full flex items-start justify-start flex-col">
        <h1 className="text-2xl text-gray-700 max-w-lg mb-2">{name}</h1>
        {vendor && (
          <div className="text-xs flex items-center max-md:mb-2">
            <label className="text-gray-700 me-1 font-semibold">Satıcı:</label>
            <Link
              href={`/magaza/${stringToSlug(vendor.name)}?mid=${vendor.id}`}
              className="text-sky-600 font-bold cursor-pointer me-1"
            >
              {vendor.name}
            </Link>
          </div>
        )}

        <div className="flex items-end justify-start gap-2 max-xl:flex-col max-xl:items-start w-full mb-4 md:mt-4">
          <div className="flex items-center justify-start gap-2 max-lg:items-start max-xl:flex-row max-xl:items-center">
            {discountRate ? (
              <span className="text-2xl font-medium text-white max-w-lg bg-red-500 p-2 rounded-xl w-max">
                {discountRate}%
              </span>
            ) : null}
            <span className="flex flex-col gap-1">
              {discountPrice && discountPrice < price ? (
                <h5 className="text-base leading-none font-light text-slate-500 max-w-lg mb-0 whitespace-nowrap">
                  <del>₺{price?.toFixed(2)}</del>
                </h5>
              ) : null}
              <span className="flex items-end gap-2 max-xl:text-start max-xl:flex-row max-xl:items-center">
                <h1 className="text-3xl leading-none text-primary font-semibold max-w-lg mt-0 whitespace-nowrap">
                  {getPriceTR(discountPrice)}
                </h1>
                {promotion && (
                  <p className="text-sm leading-none text-primary max-w-lg mt-0 whitespace-nowrap">
                    & {promotion}
                  </p>
                )}
              </span>
            </span>
          </div>
          <HoverCard>
            <HoverCardTrigger className="xl:ml-auto">
              <ReviewRating
                value={rating}
                reviewCount={reviewCount}
                showReviewCount
                readOnly
              />
            </HoverCardTrigger>
            <HoverCardContent className="max-w-md w-full">
              <RatingDetail
                rateCounts={manipulatedRateCounts}
                rating={rating}
                totalRating={reviewCount}
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <Promotions
          promotions={[
            {
              description: DeliveryType.SAME_DAY,
              icon: <SevenOclock />,
              filterKey: FILTER_KEYS["SAME_DAY_DELIVERY"],
              show: isSameDay,
              color: "info",
            },
            {
              description: freeShipping ? "Ücretsiz kargo" : "Ücretli gönderim",
              icon: <FreeTruck />,
              filterKey: FILTER_KEYS["FREE_SHIPPING"],
              show: freeShipping,
              color: "warning",
            },
            {
              description: "Tasarlanabilir",
              icon: <Palette />,
              filterKey: FILTER_KEYS["CUSTOMIZABLE"],
              show: isCustomizable,
              color: "secondary",
            },
          ]}
        />
        {showExactTime && (
          <div className="p-1 px-4 bg-purple-100 bg-opacity-50 rounded-xl my-2">
            <p className="text-xs text-gray-500">
              Ürün gün içinde herhangi bir saatte teslim edilecektir.
            </p>
          </div>
        )}
        {showDaySelect && (
          <div className="w-full my-2">
            <DaySelect
              deliveryTimes={parseJson(deliveryTimeRanges)}
              onSelect={(date) => setDeliveryTimeHandler(date)}
              deliveryTime={deliveryTime}
              lastOrderTime={lastOrderTime}
            />
            {isSettedDeliveryTime && (
              <div className="w-full flex space-x-4 items-center py-1 px-4 font-semibold rounded-xl my-2 bg-red-50 border border-red-300">
                <span className="text-xl text-red-500">
                  <Error className="inline-block" />
                </span>
                <p className="text-xs text-slate-700 leading-5">
                  Bu ürünü daha önce sepetinize eklediniz! <br /> Tarihi ve
                  saati değiştirirseniz sepetinizdeki ürünün tarih ve saati
                  güncellenecektir.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
