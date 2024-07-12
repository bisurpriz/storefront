import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetVendorProductsWithPaginationQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  is_active?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  tenant_id: Types.Scalars['uuid']['input'];
}>;


export type GetVendorProductsWithPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, description?: string | null, name: string, image_url?: Array<string> | null, price: number, quantity?: number | null, category: { name: string, slug?: string | null } }> };


export const GetVendorProductsWithPaginationDocument = gql`
    query getVendorProductsWithPagination($limit: Int = 10, $offset: Int = 0, $is_active: Boolean = true, $tenant_id: uuid!) {
  product_aggregate(
    where: {is_active: {_eq: $is_active}, tenant_id: {_eq: $tenant_id}}
  ) {
    aggregate {
      count
    }
  }
  product(
    limit: $limit
    offset: $offset
    where: {is_active: {_eq: $is_active}, tenant_id: {_eq: $tenant_id}}
  ) {
    id
    description
    name
    image_url
    price
    quantity
    category {
      name
      slug
    }
  }
}
    `;

export function useGetVendorProductsWithPaginationQuery(options: Omit<Urql.UseQueryArgs<GetVendorProductsWithPaginationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVendorProductsWithPaginationQuery, GetVendorProductsWithPaginationQueryVariables>({ query: GetVendorProductsWithPaginationDocument, ...options });
};