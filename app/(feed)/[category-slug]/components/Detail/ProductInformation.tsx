"use client";

import { Link } from "@/components/Link";
import Promotions from "./Promotions";
import RatingDetail, { RatingProps } from "./RatingDetail";
import DaySelect from "@/components/DatePicker/DaySelect";
import { parseJson } from "@/utils/format";
import { DeliveryType, FILTER_KEYS } from "@/common/enums/Product/product";
import { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ShoppingBasketIcon } from "lucide-react";
import ProductVariantSelector from "./ProductVariantSelector";
import { GetProductInformationQuery } from "@/graphql/queries/products/getProductById.generated";

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
  productId: number;
  variants?: GetProductInformationQuery["product"]["variants"];
};

const DynamicGoogleLocationSelect = dynamic(
  () => import("@/components/QuarterSelector/GoogleLocationSelect"),
  {
    ssr: false,
    loading: () => (
      <div className="mb-2 h-16 w-full animate-pulse rounded-lg bg-gray-100" />
    ),
  },
);

const defaultRating = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const ProductInformation = ({
  productId,
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
  variants,
}: ProductInformationProps) => {
  const hasDeliveryTime = Boolean(parseJson(deliveryTimeRanges)?.length);
  const [productInCart, setProductInCart] = useState(null);

  const manipulatedRateCounts = Object.keys(defaultRating).reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: rateCounts[key] || 0,
      };
    },
    defaultRating,
  );

  const isSameDay = shippingType === "SAME_DAY";
  const showDaySelect = isSameDay && hasDeliveryTime;
  const showExactTime = isSameDay && !hasDeliveryTime;

  const { setDeliveryTimeHandler, deliveryTime, isProductInCart } = useCart();

  useEffect(() => {
    setProductInCart(isProductInCart(productId));
  }, [productId]);

  const isSettedDeliveryTime =
    !productInCart || !deliveryTime
      ? false
      : Boolean(
          new Date(productInCart.deliveryDate).getDay() !==
            new Date(deliveryTime.day).getDay(),
        ) || Boolean(productInCart.deliveryTime !== deliveryTime.hour);

  useEffect(() => {
    return () => {
      setDeliveryTimeHandler(null);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-md max-md:w-full max-md:rounded-none max-md:shadow-none">
      <div className="flex w-full flex-col items-start justify-start rounded-lg">
        <h1 className="mb-2 w-full text-2xl text-gray-700">{name}</h1>
        {vendor && (
          <div className="flex items-center text-xs max-md:mb-2">
            <label className="me-1 font-semibold text-gray-700">Satıcı:</label>
            <Link
              href={`/magaza/${stringToSlug(vendor.name)}?mid=${vendor.id}`}
              className="me-1 cursor-pointer font-bold text-sky-600"
            >
              {vendor.name}
            </Link>
          </div>
        )}

        <ProductVariantSelector
          variants={variants.map(({ variant }) => ({
            name: variant.name,
            imageUrl: variant.image_url[0],
            price: variant.price,
            variantId: variant.id,
            variantSlug: variant.slug,
            //@ts-ignore
            categorySlug: variant?.product_categories?.[0]?.category?.slug,
          }))}
        />

        <div className="mb-4 flex w-full items-end justify-start gap-2 max-xl:flex-col max-xl:items-start md:mt-4">
          <div className="flex items-center justify-start gap-2 max-xl:flex-row max-xl:items-center max-lg:items-start">
            {discountRate ? (
              <span className="w-max max-w-lg rounded-xl bg-red-500 p-2 text-2xl font-medium text-white">
                {discountRate}%
              </span>
            ) : null}
            <span className="flex flex-col gap-1">
              {discountPrice && discountPrice < price ? (
                <h5 className="mb-0 max-w-lg whitespace-nowrap text-base font-light leading-none text-slate-500">
                  <del>₺{price?.toFixed(2)}</del>
                </h5>
              ) : null}
              <span className="flex items-end gap-2 max-xl:flex-row max-xl:items-center max-xl:text-start">
                <h1 className="mt-0 max-w-lg whitespace-nowrap text-3xl font-semibold leading-none text-primary">
                  {getPriceTR(discountPrice)}
                </h1>
                {promotion && (
                  <p className="mt-0 max-w-lg whitespace-nowrap text-sm leading-none text-primary">
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
            <HoverCardContent className="w-full max-w-md">
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
        {isSameDay && <DynamicGoogleLocationSelect />}
        {showExactTime && (
          <div className="my-2 rounded-xl bg-purple-100 bg-opacity-50 p-1 px-4">
            <p className="text-xs text-gray-500">
              Ürün gün içinde herhangi bir saatte teslim edilecektir.
            </p>
          </div>
        )}
        {showDaySelect && (
          <div className="my-2 w-full">
            <DaySelect
              deliveryTimes={parseJson(deliveryTimeRanges)}
              onSelect={(date) => setDeliveryTimeHandler(date)}
              deliveryTime={deliveryTime}
              lastOrderTime={lastOrderTime}
            />
            {isSettedDeliveryTime && (
              <Alert variant="informative" className="mt-2">
                <ShoppingBasketIcon />
                <AlertTitle>
                  Bu ürünü daha önce sepetinize eklediniz!
                </AlertTitle>
                <AlertDescription>
                  Tarihi ve saati değiştirirseniz sepetinizdeki ürünün tarih ve
                  saati güncellenecektir.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
