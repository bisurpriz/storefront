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
      className="border rounded-lg border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 relative flex flex-col"
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
        target="_blank"
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
        />
        <div className="p-2">
          <article className="flex flex-col justify-between flex-grow">
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
              className="text-sm font-normal text-gray-800 h-10 line-clamp-2 mb-1 capitalize"
              title={name}
            >
              {name}
            </h1>
            <PriceTag price={price} discount={discount_price} />
          </article>

          <ProductCardStamps id={id.toString()} stamps={stamps} />
        </div>
      </Link>
      {/* <AddCartButton2
        product={{
          id,
          category,
          discount_price,
          image_url: image,
          name,
          price,
          product_customizable_areas,
          tenant,
          quantity: 1,
        }}
      /> */}
    </div>
  );
};

export default ProductItem5;
