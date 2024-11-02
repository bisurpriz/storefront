"use server";

import { readIdFromCookies } from "@/app/actions";

import { query } from "@/graphql/lib/client";
import {
  GetProductActionDataDocument,
  GetProductActionDataForAnonymousDocument,
  GetProductActionDataForAnonymousQuery,
  GetProductActionDataForAnonymousQueryVariables,
  GetProductActionDataQuery,
  GetProductActionDataQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";

export const getProductActions = async (
  productId: number
): Promise<GetProductActionDataQuery> => {
  const userId = await readIdFromCookies();

  if (userId) {
    const favs = await query<
      GetProductActionDataQuery,
      GetProductActionDataQueryVariables
    >({
      query: GetProductActionDataDocument,
      variables: {
        id: productId,
      },
    });

    return {
      product: {
        user_favorites: favs?.data?.product?.user_favorites,
        user_favorites_aggregate: favs?.data?.product?.user_favorites_aggregate,
        tenant: favs.data.product.tenant,
        delivery_type: favs.data.product.delivery_type,
      },
    };
  } else {
    const anon = await query<
      GetProductActionDataForAnonymousQuery,
      GetProductActionDataForAnonymousQueryVariables
    >({
      query: GetProductActionDataForAnonymousDocument,
      variables: {
        id: productId,
      },
    });

    return {
      product: {
        user_favorites: [],
        user_favorites_aggregate: anon?.data?.product?.user_favorites_aggregate,
        tenant: anon.data.product.tenant,
        delivery_type: anon.data.product.delivery_type,
      },
    };
  }
};
