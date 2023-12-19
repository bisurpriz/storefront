"use server";

import { getClient, query } from "@/graphql/lib/client";
import {
  ADD_TO_FAVORITES,
  GET_USER_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "@/graphql/queries/account/favorites";

export const getUserFavorites = async <T>({ offset }: { offset: number }) => {
  const { data } = await query({
    query: GET_USER_FAVORITES,
    variables: {
      offset,
    },
    fetchPolicy: "no-cache",
  });

  return {
    user_favorite: data.user_favorite,
    totalCount: data.user_favorite_aggregate.aggregate.count,
  } as T;
};

export const removeFromFavorites = async ({
  productId,
}: {
  productId: number;
}) => {
  const { data } = await getClient().mutate({
    mutation: REMOVE_FROM_FAVORITES,
    variables: {
      productId,
    },
  });
  return data;
};

export const addToFavorites = async ({ productId }: { productId: number }) => {
  const { data } = await getClient().mutate({
    mutation: ADD_TO_FAVORITES,
    variables: {
      productId,
    },
  });
  return data;
};
