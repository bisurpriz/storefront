import AnimatedPricing from "@/components/AnimatedPromotion";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { getProductDetailUrl } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { Heart, Star, View, X } from "lucide-react";
import Image from "next/image";
import { getUserFavorites } from "./actions";

export const dynamic = "force-dynamic";

const FavoritesPage = async () => {
  const { user_favorite, user_favorite_aggregate } = await getUserFavorites({
    offset: 0,
  });

  const totalCount = user_favorite_aggregate.aggregate.count;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Favorilerim</h1>
      <p className="mb-6 text-gray-600">{totalCount} ürün</p>

      {totalCount === 0 ? (
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-2xl font-semibold">Favori Listeniz Boş</h2>
          <p className="text-gray-600">
            Henüz favori ürününüz yok. Alışverişe devam etmek için ürünleri
            keşfedin.
          </p>
          <Button className="mt-4">Ürünleri Keşfet</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {user_favorite.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg border p-4 transition-shadow hover:shadow-lg"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="mb-4">
                <Image
                  src={getImageUrlFromPath(product.product.image_url[0])}
                  alt={product.product.name}
                  width={300}
                  height={300}
                  className="h-48 w-full rounded-md object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="mb-1 line-clamp-2 h-10 w-full text-sm font-semibold">
                  {product.product.name}
                </h2>
                <div className="flex flex-1 items-end justify-between">
                  {product.product.price && (
                    <div className="flex items-end space-x-1">
                      <span className="text-lg font-bold leading-none text-primary">
                        ₺
                        {product.product.discount_price ||
                          product.product.price}
                      </span>
                      {product.product.discount_price && (
                        <span className="text-sm leading-none text-muted-foreground line-through">
                          ₺{product.product.price}
                        </span>
                      )}
                    </div>
                  )}
                  {product.product.score && (
                    <div className="flex items-center space-x-1 leading-none">
                      <div className="flex items-end">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-3 w-3 ${
                              index < product.product.score
                                ? "fill-current text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {product.product.score.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <AnimatedPricing
                  items={[
                    ...(product.product.product_customizable_areas.length > 0
                      ? [{ text: "Tasarlanabilir", icon: "🎨" }]
                      : []),
                    ...(product.product.delivery_type === "SAME_DAY"
                      ? [{ text: "Aynı Gün Teslimat", icon: "🚚" }]
                      : []),
                  ]}
                  timeout={2000}
                />
                <Link
                  href={getProductDetailUrl(
                    product.product.slug!,
                    product.product.id,
                  )}
                >
                  <Button variant="outline" className="mt-auto w-full">
                    <View className="mr-2 h-4 w-4" />
                    Ürüne Git
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
