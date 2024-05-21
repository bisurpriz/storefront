import Link from "next/link";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { Product } from "@/common/types/Product/product";
import clsx from "clsx";
import ProductItemImage from "../ProductItemImage/ProductItemImage";
import Rating from "@/components/Rating/Rating";
import AddCartButton from "./components/AddCartButton";
import AddToFavorite from "./components/AddToFavorite";
import PriceTag from "@/components/PriceTag";
import { Suspense } from "react";

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
  const maxXsClasses = {
    container: "overflow-hidden rounded-lg border relative flex flex-col",
    image: "flex-1 grow",
  };

  return (
    <div className="border rounded-lg border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 relative flex flex-col">
      <Link href={`/${category.slug}/${slug}?pid=${id}`}>
        <Image
          src={getImageUrlFromPath(image[0])}
          alt={name}
          width={500}
          height={500}
          className="aspect-square object-cover rounded-md cursor-pointer rounded-b-none w-full h-auto"
          loading="eager"
          quality={70}
          priority
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

          {false && <ProductCardStamps />}
        </div>
      </Link>
      <AddCartButton2
        product={{
          category,
          discount_price,
          id,
          image_url: image as string[],
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
