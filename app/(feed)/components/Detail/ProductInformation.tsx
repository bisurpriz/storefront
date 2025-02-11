"use client";

import { DeliveryType, FILTER_KEYS } from "@/common/enums/Product/product";
import DaySelect from "@/components/DatePicker/DaySelect";
import { Link } from "@/components/Link";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { GetProductInformationQuery } from "@/graphql/queries/products/getProductById.generated";
import useResponsive from "@/hooks/useResponsive";
import { getTenantUrl } from "@/lib/utils";
import { parseJson } from "@/utils/format";
import { getPriceTR } from "@/utils/getPriceTR";
import { Clock, Palette, ShoppingBasketIcon, Truck } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import ProductVariantSelector from "../ProductVariantSelector";
import Promotions from "./Promotions";
import RatingDetail from "./RatingDetail";

interface Vendor {
  name?: string;
  id: string | number;
}

interface ProductInformationProps {
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  promotion?: string;
  rateCounts: Record<string, number>;
  discountRate?: number;
  vendor?: Vendor;
  shippingType?: string;
  freeShipping?: boolean;
  deliveryTimeRanges: string;
  isCustomizable?: boolean;
  lastOrderTime?: string;
  productId: number;
  variants?: GetProductInformationQuery["product"]["variants"];
}

const DynamicGoogleLocationSelect = dynamic(
  () => import("@/components/QuarterSelector/GoogleLocationSelect"),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="w-full mb-2 rounded-lg h-14 bg-primary/20" />
    ),
  },
);

const DEFAULT_RATING_COUNTS = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const PROMOTIONS = [
  {
    description: DeliveryType.SAME_DAY,
    icon: <Clock />,
    filterKey: FILTER_KEYS["SAME_DAY_DELIVERY"],
    color: "info" as const,
  },
  {
    description: "Ücretsiz kargo",
    icon: <Truck />,
    filterKey: FILTER_KEYS["FREE_SHIPPING"],
    color: "warning" as const,
  },
  {
    description: "Tasarlanabilir",
    icon: <Palette />,
    filterKey: FILTER_KEYS["CUSTOMIZABLE"],
    color: "secondary" as const,
  },
];

const ProductHeader = ({ name, vendor }: { name: string; vendor?: Vendor }) => {
  const { isMobile } = useResponsive();

  return (
    <div>
      <h1 className="w-full text-2xl text-gray-700 capitalize">{name}</h1>
      {vendor && (
        <div className="flex items-center text-xs">
          <span className="font-semibold text-gray-700 me-1">Satıcı:</span>
          <Link
            href={getTenantUrl(vendor.name, vendor.id.toString())}
            className="font-bold cursor-pointer me-1 text-sky-600"
            aria-label={vendor.name}
            title={vendor.name}
            target={isMobile ? "_self" : "_blank"}
            rel="noopener noreferrer"
          >
            {vendor.name}
          </Link>
        </div>
      )}
    </div>
  );
};

const PriceDisplay = ({
  price,
  discountPrice,
  discountRate,
  promotion,
}: Pick<
  ProductInformationProps,
  "price" | "discountPrice" | "discountRate" | "promotion"
>) => (
  <div className="flex items-end justify-start gap-2 max-xl:flex-row max-xl:items-center max-lg:items-start">
    {discountRate ? (
      <span className="max-w-lg p-2 text-2xl font-medium text-white bg-red-500 w-max rounded-xl">
        {discountRate}%
      </span>
    ) : null}
    <span className="flex flex-col gap-1">
      {discountPrice && discountPrice < price && (
        <h5 className="max-w-lg text-base font-light leading-none whitespace-nowrap text-slate-500">
          <del>₺{price?.toFixed(2)}</del>
        </h5>
      )}
      <span className="flex items-end gap-2 max-xl:flex-row max-xl:items-center max-xl:text-start">
        <h1 className="max-w-lg text-3xl font-semibold leading-none whitespace-nowrap text-primary">
          {getPriceTR(discountPrice)}
        </h1>
        {promotion && (
          <p className="max-w-lg text-sm leading-none whitespace-nowrap text-primary">
            & {promotion}
          </p>
        )}
      </span>
    </span>
  </div>
);

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
  const {
    setDeliveryTimeHandler,
    deliveryTime,
    isProductInCart,
    syncDeliveryTimeWithProduct,
  } = useCart();
  const parsedDeliveryTimes = parseJson(deliveryTimeRanges);
  const hasDeliveryTime = Boolean(parsedDeliveryTimes?.length);
  const isSameDay = shippingType === "SAME_DAY";
  const showDaySelect = isSameDay && hasDeliveryTime;
  const showExactTime = isSameDay && !hasDeliveryTime;

  const productInCart = isProductInCart(productId);

  const isDeliveryTimeChanged =
    productInCart &&
    deliveryTime &&
    (new Date(productInCart.deliveryDate).getDay() !==
      new Date(deliveryTime.day).getDay() ||
      productInCart.deliveryTime !== deliveryTime.hour);

  useEffect(() => {
    syncDeliveryTimeWithProduct(productId);
    return () => setDeliveryTimeHandler({ day: null, hour: "" });
  }, [productId]);

  const normalizedRateCounts = Object.keys(DEFAULT_RATING_COUNTS).reduce(
    (acc, key) => ({
      ...acc,
      [key]: rateCounts[key] || 0,
    }),
    DEFAULT_RATING_COUNTS,
  );

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 rounded-md max-md:w-full max-md:rounded-none max-md:shadow-none">
      <div className="flex flex-col items-start justify-start w-full space-y-4 rounded-lg">
        <ProductHeader name={name} vendor={vendor} />

        <div className="flex items-end justify-start w-full gap-2 max-xl:flex-col max-xl:items-start md:mt-4">
          <PriceDisplay
            price={price}
            discountPrice={discountPrice}
            discountRate={discountRate}
            promotion={promotion}
          />

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
                rateCounts={normalizedRateCounts}
                rating={rating}
                totalRating={reviewCount}
              />
            </HoverCardContent>
          </HoverCard>
        </div>

        <Promotions
          promotions={PROMOTIONS.map((promo) => ({
            ...promo,
            show:
              (promo.filterKey === FILTER_KEYS["SAME_DAY_DELIVERY"] &&
                isSameDay) ||
              (promo.filterKey === FILTER_KEYS["FREE_SHIPPING"] &&
                freeShipping) ||
              (promo.filterKey === FILTER_KEYS["CUSTOMIZABLE"] &&
                isCustomizable),
          }))}
        />

        {variants && (
          <ProductVariantSelector
            variants={variants.map(({ variant }) => ({
              name: variant.name,
              imageUrl: variant.image_url[0],
              price: variant.price,
              variantId: variant.id,
              variantSlug: variant.slug,
              categorySlug: variant?.product_categories?.[0]?.category.slug,
              discountPrice: variant.discount_price,
            }))}
          />
        )}

        {isSameDay && <DynamicGoogleLocationSelect />}

        {showExactTime && (
          <div className="p-1 px-4 my-2 bg-purple-100 bg-opacity-50 rounded-xl">
            <p className="text-xs text-gray-500">
              Ürün gün içinde herhangi bir saatte teslim edilecektir.
            </p>
          </div>
        )}

        {showDaySelect && (
          <div className="w-full my-2">
            <DaySelect
              deliveryTimes={parsedDeliveryTimes}
              onSelect={setDeliveryTimeHandler}
              deliveryTime={deliveryTime}
              lastOrderTime={lastOrderTime}
            />
            {isDeliveryTimeChanged && (
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
