"use client";
import ProductItem from "@/components/Product/Item";
import { IMAGE_URL } from "@/contants/urls";
import { useEffect, useState } from "react";
import { getUserFavorites, removeFromFavorites } from "./actions";
import { Product } from "@/common/types/Product/product";
import { refetchQueries } from "@/graphql/lib/client";

interface FavoritesResponse {
  user_favorite: {
    id: number;
    product: Product;
  }[];
  totalCount: number;
}

const FavoritesPage = () => {
  const [userFavorites, setUserFavorites] = useState<FavoritesResponse>(null);

  const getData = async () => {
    const result = await getUserFavorites<FavoritesResponse>({
      offset: 0,
    });
    setUserFavorites(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const onToggleFavorite = async (productId: number) => {
    const favoriteId = userFavorites?.user_favorite?.find((item) => item.product.id === productId)?.id;
    const response = await removeFromFavorites({ id: favoriteId });
    console.log(response, "response");
    getData();
  };

  return (
    <div>
      <h1 className="text-2xl font-mono font-semibold tracking-wide mb-4">Favorilerim</h1>
      <div className="grid max-xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {userFavorites?.user_favorite?.map((item) => (
          <ProductItem
            key={item.id}
            id={item.product.id}
            name={item.product.name}
            description={item.product.description}
            image_url={IMAGE_URL + "/" + item.product.image_url?.[0]}
            price={item.product.price}
            isFavorite={true}
            handleToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
