"use client";

import { Link } from "@/components/Link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/AuthContext";
import { Product } from "@/graphql/generated-types";
import { cn, getProductDetailUrl } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddToFavorite from "./components/AddToFavorite";

const ProductCard = (product: Product) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((fav) => fav.product_id === product.id),
  );

  const {
    id,
    name,
    price,
    discount_price,
    image_url,
    score,
    slug,
    tenant,
    reviews_aggregate,
    properties,
    description,
  } = product;

  useEffect(() => {
    if (!user) return;
    setIsFavorite(
      user?.favorites?.some((fav) => Number(fav.product_id) === Number(id)),
    );
  }, [user]);

  const discountRate = Math.floor(((price! - discount_price!) / price!) * 100);

  return (
    <Link
      href={getProductDetailUrl(
        product.product_categories[0].category.slug,
        slug!,
        Number(id),
      )}
    >
      <Card className="relative flex h-auto flex-col">
        <AddToFavorite isFav={isFavorite} productId={id} user={user} />
        <CardContent className="flex flex-grow flex-col p-0">
          <div className="relative aspect-[3/4] h-52 w-full flex-shrink-0 lg:h-56 2xl:h-60">
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
              {product.product_customizable_areas.length > 0 && (
                <Badge variant="new" size="sm" className="w-fit justify-start">
                  🎨 Tasarlanabilir
                </Badge>
              )}
              {product.delivery_type === "SAME_DAY" && (
                <Badge
                  variant="freeShipping"
                  size="sm"
                  className="w-fit justify-start"
                >
                  🚚 Aynı Gün Teslimat
                </Badge>
              )}
            </div>
            <Image
              src={getImageUrlFromPath(image_url![0], 300)}
              alt={name}
              className="h-full w-full rounded-t-lg object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-grow flex-col p-2 sm:p-4">
            <div className="mb-2">
              <p className="line-clamp-2 h-10 w-full text-sm text-gray-600">
                <span className="mr-1 inline-block text-sm font-semibold tracking-tight">
                  {tenant.tenants[0].name}
                </span>
                {name}
              </p>
            </div>
            <div className="mb-2 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(score!)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({score})</span>
            </div>
            <div className="mt-auto">
              <div className="flex items-end justify-between">
                <div className="flex h-9 flex-wrap-reverse items-start gap-1">
                  <span className={cn("text-xl font-bold leading-none")}>
                    {discount_price ?? price}₺
                  </span>
                  {discount_price !== price && (
                    <span className="text-sm leading-none text-gray-500 line-through">
                      {price}₺
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default dynamic(() => Promise.resolve(ProductCard));
