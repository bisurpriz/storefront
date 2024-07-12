import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAllProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { product: Array<{ id: any, image_url?: Array<string> | null, description?: string | null, name: string, price: number, quantity?: number | null }>, product_aggregate: { aggregate?: { count: number } | null } };


export const GetAllProductsDocument = gql`
    query getAllProducts {
  product {
    id
    image_url
    description
    name
    price
    quantity
  }
  product_aggregate {
    aggregate {
      count
    }
  }
}
    `;

export function useGetAllProductsQuery(options?: Omit<Urql.UseQueryArgs<GetAllProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>({ query: GetAllProductsDocument, ...options });
};