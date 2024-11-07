import { getUserFavorites, removeFromFavorites } from "./actions";
import clsx from "clsx";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { Link } from "@/components/Link";
import { goToProductDetail } from "@/utils/linkClickEvent";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingDetail from "@/app/(feed)/[category-slug]/components/Detail/RatingDetail";
import PriceTagv2 from "@/components/PriceTag/PriceTagV2";

export const dynamic = "force-dynamic";

const FavoritesPage = async () => {
  const {
    data: { user_favorite, user_favorite_aggregate },
  } = await getUserFavorites({
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="space-y-2">
                <h2 className="mb-1 line-clamp-2 h-14 w-full text-lg font-semibold">
                  {product.product.name}
                </h2>
                <PriceTagv2
                  discountedPrice={product.product.discount_price}
                  originalPrice={product.product.price}
                />

                <Button variant="outline" className="mt-auto w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Sepete Ekle
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
