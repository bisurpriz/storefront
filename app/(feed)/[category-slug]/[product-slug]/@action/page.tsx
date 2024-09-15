import ProductActions from "../../components/Detail/ProductActions";
import { FC } from "react";
import { getProductActions } from "./actions";
import ActionPageLoading from "./loading";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductActionsPage: FC<Props> = async ({ searchParams }) => {
  const productId = Number(searchParams["pid"]);

  const { product } = await getProductActions(productId);

  if (!product.user_favorites || !product.user_favorites_aggregate) {
    return <ActionPageLoading />;
  }

  const isFavorite = product?.user_favorites?.some(
    (fav) => fav.product_id === productId
  );
  const favoriteCount = product.user_favorites_aggregate.aggregate.count;

  return (
    <ProductActions
      productId={productId}
      isFavorite={isFavorite}
      favoriteCount={favoriteCount}
    />
  );
};

export default ProductActionsPage;
