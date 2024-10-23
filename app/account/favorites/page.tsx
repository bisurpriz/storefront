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
      <h1 className="text-3xl font-bold mb-2">Favorilerim</h1>
      <p className="text-gray-600 mb-6">{totalCount} ürün</p>

      {totalCount === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Favori Listeniz Boş</h2>
          <p className="text-gray-600">
            Henüz favori ürününüz yok. Alışverişe devam etmek için ürünleri
            keşfedin.
          </p>
          <Button className="mt-4">Ürünleri Keşfet</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user_favorite.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="mb-4">
                <Image
                  src={getImageUrlFromPath(product.product.image_url[0])}
                  alt={product.product.name}
                  width={300}
                  height={300}
                  className="rounded-md object-cover w-full h-48"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold mb-1 line-clamp-2 h-14 w-full">
                  {product.product.name}
                </h2>
                <PriceTagv2
                  discountedPrice={product.product.discount_price}
                  originalPrice={product.product.price}
                />

                <Button variant="outline" className="w-full mt-auto">
                  <ShoppingCart className="w-4 h-4 mr-2" />
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
