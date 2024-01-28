import { getUserFavorites } from "./actions";
import { Product } from "@/common/types/Product/product";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import ProductItem5 from "@/components/Product/Item/ProductItem5";

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
      <h1 className='text-2xl font-mono font-semibold tracking-wide mb-4'>
        Favorilerim ({totalCount})
      </h1>
      <div className='grid max-xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {user_favorite?.map((item) => (
          <ProductItem5
            key={item.id}
            id={item.product.id}
            name={item.product.name}
            description={item.product.description}
            image_url={item.product.image_url}
            price={item.product.price}
            isFavorite={true}
            category={item.product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default withPageAuthRequired(FavoritesPage);
