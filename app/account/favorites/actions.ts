"use server";

import {
  AddToFavoritesDocument,
  AddToFavoritesMutation,
  GetUserFavoritesDocument,
  GetUserFavoritesQuery,
  GetUserFavoritesQueryVariables,
  RemoveFromFavoritesDocument,
  RemoveFromFavoritesMutation,
} from "@/graphql/generated";
import { getClient, query } from "@/graphql/lib/client";

export const getUserFavorites = async ({ offset }: { offset: number }) => {
  const { data, error } = await query<
    GetUserFavoritesQuery,
    GetUserFavoritesQueryVariables
  >({
    query: GetUserFavoritesDocument,
    variables: {
      offset,
    },
    fetchPolicy: "no-cache",
  });

  if (error) {
    return { user_favorite: [], totalCount: 0, message: error.message };
  }

  return {
    user_favorite: data?.user_favorite,
    totalCount: data.user_favorite_aggregate.aggregate.count,
  };
};

export const removeFromFavorites = async ({
  productId,
}: {
  productId: number;
}) => {
  const { data } = await getClient().mutate<RemoveFromFavoritesMutation>({
    mutation: RemoveFromFavoritesDocument,
    variables: {
      productId,
    },
  });
  return data;
};

export const addToFavorites = async ({ productId }: { productId: number }) => {
  const { data } = await getClient().mutate<AddToFavoritesMutation>({
    mutation: AddToFavoritesDocument,
    variables: {
      productId,
    },
  });
  return data;
};
