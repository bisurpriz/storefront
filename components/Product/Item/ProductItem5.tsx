import React from "react";
import { ProductItemProps } from ".";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import PriceTag from "@/components/PriceTag";
import Tooltip from "@/components/Tooltip";
import Rating from "@/components/Rating/Rating";
import AddCartButton2 from "./components/AddCartButton2";

const ProductItem5 = ({
  name,
  image_url: image,
  price,
  id,
  loading = false,
  reviews,
  delivery_type,
  discount_price,
  isFavorite,
  product_customizable_areas,
  category,
  slug,
  totalReviewCount,
  properties,
  description,
  tenant,
}: ProductItemProps) => {
  return (
    <div className="border rounded-lg border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 relative flex flex-col">
      <Image
        src={getImageUrlFromPath(image[0])}
        alt={name}
        width={500}
        height={500}
        className="aspect-square object-cover rounded-md cursor-pointer rounded-b-none w-auto h-auto"
        loading="eager"
        quality={70}
        priority
      />
      <div className="p-2">
        <article className="flex flex-col justify-between flex-grow mb-2">
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
            className="text-md font-semibold text-gray-800 h-12 line-clamp-2 mb-2 capitalize"
            title={name}
          >
            {name}
          </h1>
          <PriceTag price={price} discount={discount_price} />
        </article>

        <div className="flex items-center justify-start gap-3 rounded-md ps-2">
          {[
            {
              description: "Kargo Bedava",
              icon: "🚚",
            },
            {
              description: "İade Garantisi",
              icon: "🔄",
            },
            {
              description: "Taksit Seçenekleri",
              icon: "💳",
            },
          ].map((item) => (
            <div
              key={item.description}
              className="flex items-center gap-2 text-base text-gray-500 mt-2"
            >
              <Tooltip text={item.description} position="top">
                <span>{item.icon}</span>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      <AddCartButton2
        product={{
          category,
          discount_price,
          id,
          image_url: image,
          name,
          price,
          product_customizable_areas,
          tenant,
          quantity: 1,
        }}
        loading={loading}
      />
    </div>
  );
};

export default ProductItem5;
