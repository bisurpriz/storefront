import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetUserFavoritesQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetUserFavoritesQuery = { user_favorite: Array<{ id: any, product: { name: string, id: any, image_url?: Array<string> | null, price?: number | null, discount_price?: number | null, slug?: string | null, product_categories: Array<{ category: { name: string, slug?: string | null } }> } }>, user_favorite_aggregate: { aggregate?: { count: number } | null } };

export type AddToFavoritesMutationVariables = Types.Exact<{
  productId: Types.Scalars['bigint']['input'];
}>;


export type AddToFavoritesMutation = { insert_user_favorite_one?: { id: any } | null };

export type RemoveFromFavoritesMutationVariables = Types.Exact<{
  productId: Types.Scalars['bigint']['input'];
}>;


export type RemoveFromFavoritesMutation = { delete_user_favorite?: { affected_rows: number } | null };


export const GetUserFavoritesDocument = gql`
    query getUserFavorites($offset: Int = 0) {
  user_favorite(offset: $offset) {
    id
    product {
      name
      id
      image_url
      price
      discount_price
      slug
      product_categories {
        category {
          name
          slug
        }
      }
    }
  }
  user_favorite_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export type GetUserFavoritesQueryResult = Apollo.QueryResult<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>;
export const AddToFavoritesDocument = gql`
    mutation addToFavorites($productId: bigint!) {
  insert_user_favorite_one(object: {product_id: $productId}) {
    id
  }
}
    `;
export type AddToFavoritesMutationFn = Apollo.MutationFunction<AddToFavoritesMutation, AddToFavoritesMutationVariables>;
export type AddToFavoritesMutationResult = Apollo.MutationResult<AddToFavoritesMutation>;
export type AddToFavoritesMutationOptions = Apollo.BaseMutationOptions<AddToFavoritesMutation, AddToFavoritesMutationVariables>;
export const RemoveFromFavoritesDocument = gql`
    mutation removeFromFavorites($productId: bigint!) {
  delete_user_favorite(where: {product_id: {_eq: $productId}}) {
    affected_rows
  }
}
    `;
export type RemoveFromFavoritesMutationFn = Apollo.MutationFunction<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>;
export type RemoveFromFavoritesMutationResult = Apollo.MutationResult<RemoveFromFavoritesMutation>;
export type RemoveFromFavoritesMutationOptions = Apollo.BaseMutationOptions<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>;