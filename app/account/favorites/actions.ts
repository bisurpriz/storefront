"use server";

import { mutate, query } from "@/graphql/lib/client";
import {
  AddToFavoritesDocument,
  AddToFavoritesMutation,
  AddToFavoritesMutationVariables,
  GetUserFavoritesDocument,
  GetUserFavoritesQuery,
  GetUserFavoritesQueryVariables,
  RemoveFromFavoritesDocument,
  RemoveFromFavoritesMutation,
  RemoveFromFavoritesMutationVariables,
} from "@/graphql/queries/account/favorites.generated";

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
  const { data } = await mutate<
    RemoveFromFavoritesMutation,
    RemoveFromFavoritesMutationVariables
  >({
    mutation: RemoveFromFavoritesDocument,
    variables: {
      productId,
    },
    fetchPolicy: "no-cache",
  });
  return data;
};

export const addToFavorites = async ({ productId }: { productId: number }) => {
  const { data } = await mutate<
    AddToFavoritesMutation,
    AddToFavoritesMutationVariables
  >({
    mutation: AddToFavoritesDocument,
    variables: {
      productId,
    },
    fetchPolicy: "no-cache",
  });
  return data;
};
