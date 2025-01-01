"use server";

import {
  AddToFavoritesMutation,
  GetUserFavoritesQuery,
  RemoveFromFavoritesMutation,
} from "@/graphql/queries/account/favorites.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  AddToFavoritesDocument,
  GetUserFavoritesDocument,
  RemoveFromFavoritesDocument,
} from "@/service/product/favorites";

export const getUserFavorites = async ({ offset }: { offset: number }) => {
  return await BonnmarseApi.request<GetUserFavoritesQuery>({
    query: GetUserFavoritesDocument,
    variables: {
      offset,
    },
    tags: ["getUserFavorites"],
  });
};

export const removeFromFavorites = async ({
  productId,
}: {
  productId: number;
}) => {
  return await BonnmarseApi.request<RemoveFromFavoritesMutation>({
    query: RemoveFromFavoritesDocument,
    variables: {
      productId,
    },
    tags: ["removeFromFavorites"],
  });
};

export const addToFavorites = async ({ productId }: { productId: number }) => {
  return await BonnmarseApi.request<AddToFavoritesMutation>({
    query: AddToFavoritesDocument,
    variables: {
      productId,
    },
    tags: ["addToFavorites"],
  });
};
