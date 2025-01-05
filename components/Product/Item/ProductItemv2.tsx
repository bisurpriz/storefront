"use client";

import { Link } from "@/components/Link";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/AuthContext";
import { Product } from "@/graphql/generated-types";
import { getProductDetailUrl } from "@/lib/utils";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import AddToFavorite from "./components/AddToFavorite";
import { PriceTag } from "./components/PriceTag";
import { ProductImage } from "./components/ProductImage";
import StarRating from "./components/StarRating";

interface ProductCardProps extends Product {
  className?: string;
}

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
    className,
  }: ProductCardProps) => {
    const { user } = useUser();
    const [isFavorite, setIsFavorite] = useState(() =>
      user?.favorites?.some((fav) => Number(fav.product_id) === Number(id)),
    );

    useEffect(() => {
      if (!user) return;
      setIsFavorite(
        user.favorites?.some((fav) => Number(fav.product_id) === Number(id)),
      );
    }, [user, id]);

    const handleFavoriteChange = useCallback((newState: boolean) => {
      setIsFavorite(newState);
    }, []);

    const productUrl = useMemo(
      () => getProductDetailUrl(slug!, Number(id)),
      [product_categories, slug, id],
    );

    const tenantName = tenant?.tenants[0].name;
    const isCustomizable = product_customizable_areas?.length > 0;
    const isSameDayDelivery = delivery_type === "SAME_DAY";

    return (
      <Link href={productUrl} className={className}>
        <Card className="group relative">
          <CardContent className="flex flex-col p-0">
            <ProductImage
              imageUrl={image_url?.[0]}
              alt={name}
              isCustomizable={isCustomizable}
              isSameDayDelivery={isSameDayDelivery}
            />

            <div className="flex flex-col p-2 sm:p-4">
              <div className="mb-2">
                <p className="line-clamp-2 h-10 text-sm text-gray-600">
                  {tenantName && (
                    <span className="mr-1 inline-block font-medium text-gray-900">
                      {tenantName}
                    </span>
                  )}
                  {name}
                </p>
              </div>

              <StarRating score={score!} reviewCount={0} size="sm" />

              <div className="mt-auto">
                <PriceTag
                  price={price!}
                  discountPrice={discount_price}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>

          <AddToFavorite
            isFav={isFavorite}
            productId={id}
            user={user}
            onFavoriteChange={handleFavoriteChange}
          />
        </Card>
      </Link>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default dynamic(() => Promise.resolve(ProductCard), {
  ssr: true,
});
