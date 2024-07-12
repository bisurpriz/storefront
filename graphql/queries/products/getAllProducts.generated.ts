import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;