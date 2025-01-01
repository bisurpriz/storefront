import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { Link } from "@/components/Link";
import PriceTagv2 from "@/components/PriceTag/PriceTagV2";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/contexts/AuthContext";
import { Product } from "@/graphql/generated-types";
import useResponsive from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { goToProductDetail } from "@/utils/linkClickEvent";
import { Heart, LucideTruck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ProductCardStamps from "./components/Stamps";

interface ProductItemProps extends Partial<Product> {
  loading?: boolean;
  isFavorite?: boolean;
  totalReviewCount?: number;
}

export default function ProductItem2(props: ProductItemProps) {
  const {
    category_id,
    delivery_end_time,
    delivery_start_time,
    delivery_time_ranges,
    delivery_type,
    delivery_type_rel,
    description,
    discount_price,
    id,
    image_url,
    isFavorite: isFavoriteProp,
    is_active,
    is_approved,
    is_service_free,
    last_order_time,
    loading,
    name,
    order_items,
    order_items_aggregate,
    price,
    product_categories,
    product_categories_aggregate,
    product_customizable_areas,
    product_customizable_areas_aggregate,
    product_no,
    properties,
    quantity,
    questions,
    questions_aggregate,
    reviews,
    reviews_aggregate,
    score,
    slug,
    stock,
    stock_track,
    supplier_product_code,
    tenant,
    tenant_id,
    totalReviewCount,
    user_favorites,
    user_favorites_aggregate,
  } = props;
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const { push } = useRouter();
  const { isTablet } = useResponsive();

  useEffect(() => {
    setIsFavorite(isFavoriteProp);
  }, [isFavoriteProp]);

  const handleFavorite = () => {
    if (isPending) return;

    startTransition(() => {
      if (!user) {
        push("/login");
        return;
      }

      if (isFavorite) {
        removeFromFavorites({ productId: id });
        setIsFavorite(false);

        return;
      }

      addToFavorites({ productId: id }).catch(() => {
        setIsFavorite(false);
      });
      setIsFavorite(true);
    });
  };

  return (
    <Link
      href={goToProductDetail({
        category: {
          slug: product_categories?.[0]?.category?.slug,
        },
        id,
        slug,
      })}
      as="image"
      className="relative mx-auto w-full overflow-hidden rounded-xl shadow-md max-sm:grid max-sm:grid-cols-12 max-sm:gap-2"
      {...(!isTablet && { target: "_blank" })}
      rel={!isTablet ? "noopener noreferrer" : undefined}
    >
      <div className="relative col-span-4 row-span-full flex-1">
        <Image
          src={getImageUrlFromPath(image_url?.[hoveredImageIndex ?? 0])}
          alt={name}
          quality={70}
          className="h-80 w-full object-cover max-sm:h-full"
          sizes={"15vw"}
          width={250}
          height={250}
        />
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-0",
            {
              hidden:
                !(Array.isArray(image_url) && image_url.length > 1) || isTablet,
            },
          )}
          onMouseLeave={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setHoveredImageIndex(null);
          }}
        >
          {Array.from({ length: image_url.length }).map((_, i) => (
            <div
              key={i}
              className={cn("flex h-full w-full items-end")}
              onMouseEnter={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setHoveredImageIndex(i);
              }}
            />
          ))}
          <div
            className={cn(
              "absolute bottom-2 left-0 flex w-full items-center justify-center",
              {
                hidden: !(Array.isArray(image_url) && image_url.length > 1),
              },
            )}
          >
            {Array.from({ length: image_url.length }).map((_, i) => (
              <span
                key={i}
                className={cn("mx-1 h-2 w-2 rounded-full bg-white", {
                  "bg-gray-400": i !== hoveredImageIndex,
                })}
              />
            ))}
          </div>
        </div>

        <div className="max-sm:hidden">
          <ProductCardStamps
            id={id.toString()}
            stamps={[
              product_customizable_areas.length > 0 && {
                color: "orange",
                icon: "🎨",
                name: "Tasarlanabilir",
              },
              delivery_type === "SAME_DAY" && {
                color: "green",
                icon: "🚚",
                name: "Aynı Gün Teslimat",
              },
            ]}
          />
        </div>
      </div>

      <div className="col-span-8 space-y-4 p-4 pt-2 max-sm:space-y-1 max-sm:p-2">
        <div className="flex items-start justify-between">
          {isTablet ? (
            <h3 className="line-clamp-2 h-10 w-full overflow-hidden text-start font-mono text-base leading-tight text-gray-800 max-md:text-sm max-md:font-normal">
              {name}
            </h3>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <h3 className="line-clamp-2 h-10 w-full overflow-hidden text-start font-mono text-base leading-tight text-gray-800 max-md:text-sm max-md:font-normal">
                  {name}
                </h3>
              </TooltipTrigger>
              <TooltipContent avoidCollisions={true} sideOffset={10} side="top">
                {name}
              </TooltipContent>
            </Tooltip>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFavorite();
            }}
            className="h-fit max-sm:p-2"
          >
            <Heart
              className={`h-6 w-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>

        <div className="flex flex-col items-start justify-end max-sm:mb-2">
          <PriceTagv2 originalPrice={price} discountedPrice={discount_price} />
          <span className="mt-2 flex h-4 items-center gap-2 text-xs text-slate-400">
            {score > 0 ? (
              <>
                <ReviewRating
                  value={score ?? 0}
                  readOnly
                  showReviewCount={false}
                  reviewCount={totalReviewCount}
                />
                ({score})
              </>
            ) : (
              <span className="text-xs text-gray-400">
                Henüz Değerlendirme Yapılmamış
              </span>
            )}
          </span>
        </div>

        {is_active ? (
          <div>
            {is_service_free && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs text-green-500",
                  "max-sm:text-xs",
                )}
              >
                <LucideTruck className="block h-4 w-4" />
                Ücretsiz Kargo
              </span>
            )}
          </div>
        ) : (
          <div className="mt-auto flex space-x-2">
            <Button className="flex-1" variant="outline">
              Stokta Yok
            </Button>
          </div>
        )}

        {/* <div className={cn("pt-4 border-t border-gray-200")}>
          <h4 className="font-semibold text-gray-700 mb-2">
            Müşteri Yorumları
          </h4>
          <div className="space-y-2">
            {reviews?.map((review, index) => {
              if (!review.comment) return null;

              return (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{review.user.firstname}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500">{review.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* <div className="flex items-center justify-center space-x-2 text-xs text-gray-700 border-t max-sm:hidden pt-4 !m-0">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <span>Bu ürün %30 daha az karbon ayak izi bırakır</span>
        </div> */}
      </div>
    </Link>
  );
}
