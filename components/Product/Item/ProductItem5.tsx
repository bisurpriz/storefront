import React from "react";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import PriceTag from "@/components/PriceTag";
import { Link } from "@/components/Link";
import ProductCardStamps, { Stamp } from "./components/Stamps";
import { goToProductDetail } from "@/utils/linkClickEvent";
import clsx from "clsx";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { motion } from "framer-motion";
import Chip from "@/components/Chip";
import { Product } from "@/common/types/Product/product";

export interface ProductItemProps extends Partial<Product> {
  loading?: boolean;
  isFavorite?: boolean;
  totalReviewCount?: number;
}

const ProductItem5 = ({
  name,
  image_url: image,
  price,
  id,
  loading = false,
  discount_price,
  product_customizable_areas,
  product_categories,
  slug,
  totalReviewCount,
  tenant,
  score,
  is_service_free,
  delivery_type,
}: ProductItemProps) => {
  const stamps = !product_customizable_areas?.length
    ? null
    : ([
        {
          name: "Tasarlanabilir",
          icon: "🎨",
          color: "orange",
        },
      ] as Stamp[]);

  const isSameDayDelivery =
    delivery_type === "SAME_DAY" || delivery_type === "SAME_DAY_CARGO";

  return (
    <div
      className={clsx(
        "min-h-[320px] rounded-md bg-white shadow-sm",
        "flex flex-col justify-between",
        "overflow-hidden",
        "cursor-pointer",
        "hover:shadow-md",
        "transition-shadow duration-300 ease-in-out",
        "group",
        "relative",
      )}
      id={id.toString()}
    >
      <Link
        href={goToProductDetail({
          category: {
            slug: product_categories?.[0]?.category?.slug,
          },
          id,
          slug,
        })}
        className="relative"
      >
        <motion.div
          layoutId={`image-${id}`}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={`${getImageUrlFromPath(image?.[0])}${
              image?.[0] ? "?format=webp" : ""
            }`}
            alt={name}
            width={250}
            height={250}
            className="aspect-square h-auto w-full cursor-pointer rounded-md rounded-b-none object-cover"
            quality={70}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            sizes="(max-width: 576px) 30vw,
          (max-width: 768px) 30vw,
          (max-width: 992px) 30vw,
          (max-width: 1200px) 20vw,
          20vw"
          />
        </motion.div>

        <div className="max:sm:px-0 px-2 pb-6 pt-2">
          <div className="flex flex-grow flex-col justify-between gap-2 max-sm:gap-1">
            {is_service_free && isSameDayDelivery && (
              <Chip
                size="small"
                label={
                  is_service_free &&
                  isSameDayDelivery &&
                  "Ücretsiz /" + isSameDayDelivery &&
                  " Aynı gün teslimat"
                }
                rounded="low"
                variant="filled"
              />
            )}
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <ReviewRating
                value={score ?? 0}
                readOnly
                showReviewCount={false}
                reviewCount={totalReviewCount}
              />
              {score > 0 && `(${score})`}
            </span>
            <h1
              className="line-clamp-2 h-10 text-sm font-semibold capitalize text-gray-500 group-hover:text-gray-600"
              title={name}
            >
              {name}
            </h1>
            <PriceTag price={price} discount={discount_price} />
          </div>

          <ProductCardStamps id={id.toString()} stamps={stamps} />
        </div>
      </Link>
    </div>
  );
};

export default ProductItem5;
