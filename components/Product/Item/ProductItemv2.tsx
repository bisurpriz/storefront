"use client";

import { Link } from "@/components/Link";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/AuthContext";
import { Product } from "@/graphql/generated-types";
import { getProductDetailUrl } from "@/lib/utils";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useState } from "react";
import AddToFavorite from "./components/AddToFavorite";
import { PriceTag } from "./components/PriceTag";
import { ProductImage } from "./components/ProductImage";

// Yıldız bileşenini ayrı bir bileşen olarak çıkaralım
const StarRating = memo(({ score }: { score: number }) => (
  <div className="mb-2 flex items-center gap-1">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < Math.floor(score) ? "text-yellow-400" : "text-gray-300"
            }`}
        >
          ★
        </span>
      ))}
    </div>
    <span className="text-sm text-gray-500">({Math.floor(score)})</span>
  </div>
));

StarRating.displayName = "StarRating";

// Ana bileşeni memo ile sarmalayalım
const ProductCard = memo(
  ({
    id,
    name,
    price,
    discount_price,
    image_url,
    score,
    slug,
    tenant,
    product_categories,
    product_customizable_areas,
    delivery_type,
  }: Product) => {
    const { user } = useUser();
    const [isFavorite, setIsFavorite] = useState(
      user?.favorites?.some((fav) => fav.product_id === id),
    );

    useEffect(() => {
      if (!user) return;
      setIsFavorite(
        user?.favorites?.some((fav) => Number(fav.product_id) === Number(id)),
      );
    }, [user, id]);

    const handleFavoriteChange = useCallback((newState: boolean) => {
      setIsFavorite(newState);
    }, []);

    const productUrl = getProductDetailUrl(
      product_categories?.[0].category.slug,
      slug!,
      Number(id),
    );

    return (
      <Link href={productUrl}>
        <Card className="relative flex h-auto flex-col">
          <AddToFavorite
            isFav={isFavorite}
            productId={id}
            user={user}
            onFavoriteChange={handleFavoriteChange}
          />
          <CardContent className="flex flex-grow flex-col p-0">
            <ProductImage
              imageUrl={image_url?.[0]}
              alt={name}
              isCustomizable={product_customizable_areas?.length > 0}
              isSameDayDelivery={delivery_type === "SAME_DAY"}
            />
            <div className="flex flex-grow flex-col p-2 sm:p-4">
              <div className="mb-2">
                <p className="line-clamp-2 h-10 w-full text-sm text-gray-600">
                  <span className="mr-1 inline-block text-sm font-semibold tracking-tight">
                    {tenant?.tenants[0].name}
                  </span>
                  {name}
                </p>
              </div>
              <StarRating score={score!} />
              <div className="mt-auto">
                <PriceTag
                  price={price!}
                  discountPrice={discount_price}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default dynamic(() => Promise.resolve(ProductCard), {
  ssr: true,
});
