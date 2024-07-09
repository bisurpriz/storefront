import ProductActions from "../../components/Detail/ProductActions";
import { FC } from "react";
import { query } from "@/graphql/lib/client";
import {
  GetProductActionDataDocument,
  GetProductActionDataQuery,
  GetProductActionDataQueryVariables,
} from "@/graphql/generated";
import { getProductActions } from "./actions";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductActionsPage: FC<Props> = async ({ searchParams }) => {
  const productId = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await getProductActions(productId);

  const isFavorite = (
    product[0] as GetProductActionDataQuery["product"][0]
  )?.user_favorites?.some((fav) => fav.product_id === productId);

  const favoriteCount = product[0]?.user_favorites_aggregate.aggregate.count;

  return (
    <ProductActions
      productId={productId}
      isFavorite={isFavorite}
      favoriteCount={favoriteCount}
    />
  );
};

export default ProductActionsPage;
