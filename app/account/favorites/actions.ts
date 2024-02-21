'use server';

import { AddToFavoritesDocument, AddToFavoritesMutation, GetUserFavoritesDocument, GetUserFavoritesQuery, RemoveFromFavoritesDocument, RemoveFromFavoritesMutation } from '@/graphql/generated';
import { getClient, query } from '@/graphql/lib/client';


export const getUserFavorites = async <T>({ offset }: { offset: number }) => {
  const { data } = await query<GetUserFavoritesQuery>({
    query: GetUserFavoritesDocument,
    variables: {
      offset,
    },
    fetchPolicy: 'no-cache',
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
