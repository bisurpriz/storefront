import AnimatedPricing from "@/components/AnimatedPromotion";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import { getImageUrlFromPath, getProductDetailUrl } from "@/lib/utils";
import { Heart, Star, View, X } from "lucide-react";
import Image from "next/image";
import { getUserFavorites } from "./actions";

const FavoritesPage = async () => {
  const { user_favorite, user_favorite_aggregate } = await getUserFavorites({
    offset: 0,
  });

  const totalCount = user_favorite_aggregate.aggregate.count;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">Favorilerim</h1>
      <p className="mb-6 text-gray-600">{totalCount} ürün</p>

      {totalCount === 0 ? (
        <div className="py-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
              className="relative p-4 transition-shadow border rounded-lg group hover:shadow-lg"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute transition-opacity opacity-0 right-2 top-2 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="mb-4">
                <Image
                  src={getImageUrlFromPath(product.product.image_url[0])}
                  alt={product.product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-48 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="w-full h-10 mb-1 text-sm font-semibold line-clamp-2">
                  {product.product.name}
                </h2>
                <div className="flex items-end justify-between flex-1">
                  {product.product.price && (
                    <div className="flex items-end space-x-1">
                      <span className="text-lg font-bold leading-none text-primary">
                        ₺
                        {product.product.discount_price ||
                          product.product.price}
                      </span>
                      {product.product.discount_price && (
                        <span className="text-sm leading-none line-through text-muted-foreground">
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
                        {product.product.score > 5
                          ? "5.0"
                          : product.product.score.toFixed(1)}
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
                  <Button variant="outline" className="w-full mt-auto">
                    <View className="w-4 h-4 mr-2" />
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
