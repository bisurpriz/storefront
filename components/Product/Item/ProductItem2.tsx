import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Leaf, LucideTruck, Truck, TruckIcon, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chip from "@/components/Chip";
import { Product } from "@/graphql/generated-types";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { cn } from "@/lib/utils";
import ReviewRating from "@/components/ReviewRating/ReviewRating";
import { Link } from "@/components/Link";
import { goToProductDetail } from "@/utils/linkClickEvent";
import ProductCardStamps from "./components/Stamps";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import PriceTagv2 from "@/components/PriceTag/PriceTagV2";

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
  const { openDialog, closeDialog } = useResponsiveDialog();

  useEffect(() => {
    setIsFavorite(isFavoriteProp);
  }, [isFavoriteProp]);

  return (
    <Link
      href={goToProductDetail({
        category: {
          slug: product_categories?.[0]?.category?.slug,
        },
        id,
        slug,
      })}
      className="w-full relative mx-auto shadow-md rounded-xl overflow-hidden max-sm:grid max-sm:gap-2 max-sm:grid-cols-12"
    >
      <div className="relative flex-1 col-span-4">
        <motion.div
          key={id}
          className="w-full h-80 max-sm:h-fit"
          layoutId={`image-${id}`}
          animate={{ opacity: 1 }}
        >
          <Image
            src={getImageUrlFromPath(image_url[hoveredImageIndex ?? 0])}
            alt={name}
            className="w-full h-full object-cover"
            fill
            sizes={
              "(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
            }
          />
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-full bg-opacity-0 flex items-center justify-center",
              {
                hidden: !(Array.isArray(image_url) && image_url.length > 1),
              }
            )}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setHoveredImageIndex(null);
            }}
          >
            {Array.from({ length: image_url.length }).map((_, i) => (
              <div
                key={i}
                className={cn("h-full w-full flex items-end")}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setHoveredImageIndex(i);
                }}
              >
                <span
                  className={cn(
                    "block mt-auto bg-black/20 w-full h-1 last:border-r-0 border-r transition-all duration-200",
                    {
                      "bg-black": i === hoveredImageIndex,
                    }
                  )}
                />
              </div>
            ))}
          </div>
        </motion.div>

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

      <div className="p-4 pt-2 space-y-4 max-sm:space-y-1 max-sm:p-2 col-span-8">
        <div className="flex justify-between items-start">
          <Tooltip>
            <TooltipTrigger>
              <h3 className="font-mono overflow-hidden max-md:text-sm text-base text-start !leading-none max-md:h-7 h-8 max-md:font-normal text-gray-800 line-clamp-2">
                {name}
              </h3>
            </TooltipTrigger>
            <TooltipContent avoidCollisions={true} sideOffset={10} side="top">
              {name}
            </TooltipContent>
          </Tooltip>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="max-sm:p-2 h-fit"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>

        <div className="flex flex-col items-start justify-end max-sm:mb-2">
          <PriceTagv2 originalPrice={price} discountedPrice={discount_price} />
          <span className="text-xs h-4 flex text-slate-400 gap-2 items-center mt-2">
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
            {/* <div className="flex space-x-2 mt-auto max-sm:space-x-1">
              <Button
                className="flex-1 max-sm:p-2 h-fit"
                variant="default"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log("Sepete Eklendi");
                }}
              >
                Hemen Al
              </Button>

              <Button
                variant="outline"
                className="flex-1 max-sm:p-2 h-fit"
                icon={<View className="w-5 h-5 mr-2" />}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                Hızlı Bakış
              </Button>
            </div> */}

            {is_service_free && (
              <span
                className={cn(
                  "inline-flex items-center text-xs gap-1 text-green-500",
                  "max-sm:text-xs"
                )}
              >
                <LucideTruck className="w-4 h-4 block" />
                Ücretsiz Kargo
              </span>
            )}
          </div>
        ) : (
          <div className="flex space-x-2 mt-auto">
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
