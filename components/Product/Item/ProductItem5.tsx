import React from "react";
import { ProductItemProps } from ".";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import PriceTag from "@/components/PriceTag";
import Rating from "@/components/Rating/Rating";
import AddCartButton2 from "./components/AddCartButton2";
import Link from "next/link";
import ProductCardStamps, { Stamp } from "./components/Stamps";
import { goToProductDetail } from "@/utils/linkClickEvent";
import clsx from "clsx";

const ProductItem5 = ({
  name,
  image_url: image,
  price,
  id,
  loading = false,
  discount_price,
  product_customizable_areas,
  category,
  slug,
  totalReviewCount,
  tenant,
}: ProductItemProps) => {
  const stamps = !product_customizable_areas?.length
    ? null
    : ([
        {
          name: "Özelleştirilebilir",
          icon: "🎨",
          color: "orange",
        },
      ] as Stamp[]);

  return (
    <div
      className={clsx(
        "rounded-md bg-white shadow-sm",
        "flex flex-col justify-between",
        "overflow-hidden",
        "cursor-pointer",
        "hover:shadow-md",
        "transition-shadow duration-300 ease-in-out",
        "group",
        "relative"
      )}
      id={id.toString()}
    >
      <Link
        href={goToProductDetail({
          category: {
            slug: category.slug,
          },
          id,
          slug,
        })}
        scroll={true}
        // target="_blank"
        className="relative"
      >
        <Image
          src={`${getImageUrlFromPath(image?.[0])}${
            image?.[0] ? "?width=500&height=500&format=webp&quality=70" : ""
          }`}
          alt={name}
          width={500}
          height={500}
          className="aspect-square object-cover rounded-md cursor-pointer rounded-b-none w-full h-auto"
          quality={70}
          priority={true}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        <div className="px-2 pb-6 pt-4">
          <div className="flex flex-col gap-2 justify-between flex-grow">
            <span className="text-xs flex text-slate-400 gap-2 items-center">
              <Rating
                value={4}
                readOnly
                showReviewCount={false}
                reviewCount={totalReviewCount}
              />
              {`(${4})`}
            </span>
            <h1
              className="text-sm font-normal text-gray-500 h-10 line-clamp-2 capitalize group-hover:text-gray-600"
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
