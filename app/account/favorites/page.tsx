import ProductItem from "@/components/Product/Item";
import { IMAGE_URL } from "@/contants/urls";
import { getUserFavorites } from "./actions";
import { Product } from "@/common/types/Product/product";

interface FavoritesResponse {
  user_favorite: {
    id: number;
    product: Product;
  }[];
  totalCount: number;
}

const FavoritesPage = async () => {
  const { user_favorite, totalCount } =
    await getUserFavorites<FavoritesResponse>({
      offset: 0,
    });

  return (
    <div>
      <h1 className="text-2xl font-mono font-semibold tracking-wide mb-4">
        Favorilerim ({totalCount})
      </h1>
      <div className="grid max-xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {user_favorite?.map((item) => (
          <ProductItem
            key={item.id}
            id={item.product.id}
            name={item.product.name}
            description={item.product.description}
            image_url={IMAGE_URL + "/" + item.product.image_url?.[0]}
            price={item.product.price}
            isFavorite={true}
            category={item.product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
