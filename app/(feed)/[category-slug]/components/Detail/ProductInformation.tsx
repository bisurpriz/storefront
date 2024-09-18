"use client";

import Link from "next/link";
import Promotions from "./Promotions";
import RatingDetail, { RatingProps } from "./RatingDetail";
import DaySelect from "@/components/DatePicker/DaySelect";
import { parseJson } from "@/utils/format";
import { DeliveryType } from "@/common/enums/Product/product";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { stringToSlug } from "@/utils/stringToSlug";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { Popper } from "@mui/base/Popper";
import { useCart } from "@/contexts/CartContext";
import Error from "@/components/Icons/Error";
import SevenOclock from "@/components/Icons/SevenOclock";
import FreeTruck from "@/components/Icons/FreeTruck";
import Palette from "@/components/Icons/Palette";
import { format } from "date-fns";
import { getPriceTR } from "@/utils/getPriceTR";

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

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "rating-popper" : undefined;

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full rounded-md max-md:w-full  max-md:rounded-none max-md:shadow-none">
      <div className="rounded-lg w-full flex items-start justify-start flex-col">
        <h1 className="text-3xl text-gray-800 max-w-lg mb-2">{name}</h1>
        {vendor && (
          <div className="text-xs flex items-center max-md:mb-2">
            <label className="text-gray-800 me-1">Satıcı:</label>
            <Link
              href={`/magaza/${stringToSlug(vendor.name)}?mid=${vendor.id}`}
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
                  {getPriceTR(discountPrice ? discountPrice : price)}
                </h1>
                {promotion && (
                  <p className="text-sm leading-none text-primary max-w-lg mt-0 whitespace-nowrap">
                    & {promotion}
                  </p>
                )}
              </span>
            </span>
          </div>
          <div
            className="xs:ml-auto max-xs:text-start max-xs:mt-4"
            onMouseLeave={() => setAnchorEl(null)}
            onMouseEnter={(event: MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
          >
            <ReviewRating
              value={rating}
              reviewCount={reviewCount}
              showReviewCount
              readOnly
            />
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom"
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
              ]}
            >
              <div ref={wrapperRef}>
                <RatingDetail
                  rateCounts={manipulatedRateCounts}
                  rating={rating}
                  totalRating={reviewCount}
                />
              </div>
            </Popper>
          </div>
        </div>
        <Promotions
          promotions={[
            {
              description: DeliveryType.SAME_DAY,
              icon: <SevenOclock />,
              filterKey: "SAME_DAY",
              show: isSameDay,
              color: "info",
            },
            {
              description: freeShipping ? "Ücretsiz kargo" : "Ücretli gönderim",
              icon: <FreeTruck />,
              filterKey: "FREE_SHIPPING",
              show: freeShipping,
              color: "warning",
            },
            {
              description: "Tasarlanabilir",
              icon: <Palette />,
              filterKey: "CUSTOMIZABLE",
              show: isCustomizable,
              color: "secondary",
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
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
