import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserFavoritesQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetUserFavoritesQuery = { user_favorite: Array<{ id: any, product: { name: string, id: any, image_url?: Array<string> | null, price: number, discount_price?: number | null, slug?: string | null, category: { name: string, slug?: string | null } } }>, user_favorite_aggregate: { aggregate?: { count: number } | null } };

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
      category {
        name
        slug
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

export function useGetUserFavoritesQuery(options?: Omit<Urql.UseQueryArgs<GetUserFavoritesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>({ query: GetUserFavoritesDocument, ...options });
};
export const AddToFavoritesDocument = gql`
    mutation addToFavorites($productId: bigint!) {
  insert_user_favorite_one(object: {product_id: $productId}) {
    id
  }
}
    `;

export function useAddToFavoritesMutation() {
  return Urql.useMutation<AddToFavoritesMutation, AddToFavoritesMutationVariables>(AddToFavoritesDocument);
};
export const RemoveFromFavoritesDocument = gql`
    mutation removeFromFavorites($productId: bigint!) {
  delete_user_favorite(where: {product_id: {_eq: $productId}}) {
    affected_rows
  }
}
    `;

export function useRemoveFromFavoritesMutation() {
  return Urql.useMutation<RemoveFromFavoritesMutation, RemoveFromFavoritesMutationVariables>(RemoveFromFavoritesDocument);
};