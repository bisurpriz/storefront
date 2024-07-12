import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetVendorByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['bigint']['input']>;
}>;


export type GetVendorByIdQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, quantity?: number | null, category: { name: string }, questions: Array<{ created_at: any, id: any, question: string, updated_at: any, user: { firstname?: string | null, lastname?: string | null } }>, reviews: Array<{ comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null } }>, reviews_aggregate: { aggregate?: { count: number } | null } } | null };


export const GetVendorByIdDocument = gql`
    query getVendorById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    category {
      name
    }
    description
    id
    image_url
    name
    price
    quantity
    questions {
      created_at
      id
      question
      updated_at
      user {
        firstname
        lastname
      }
    }
    reviews {
      comment
      created_at
      score
      user {
        firstname
        lastname
      }
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
}
    `;
export type GetVendorByIdQueryResult = Apollo.QueryResult<GetVendorByIdQuery, GetVendorByIdQueryVariables>;