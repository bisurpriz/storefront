"use server";

import { getClient, query } from "@/graphql/lib/client";
import { GET_USER_FAVORITES, REMOVE_FROM_FAVORITES } from "@/graphql/queries/account/favorites";

export const getUserFavorites = async <T>({ offset }: { offset: number }) => {
  const { data } = await query({
    query: GET_USER_FAVORITES,
    variables: {
      offset,
    },
  });

  return {
    user_favorite: data.user_favorite,
    totalCount: data.user_favorite_aggregate.aggregate.count,
  } as T;
};

export const removeFromFavorites = async ({ id }: { id: number }) => {
  const { data } = await getClient().mutate({
    mutation: REMOVE_FROM_FAVORITES,
    variables: {
      id,
    },
  });

  return data;
};
