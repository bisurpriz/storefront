import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateDbCartMutationVariables = Types.Exact<{
  payload: Array<Types.Cart_Insert_Input> | Types.Cart_Insert_Input;
  CONSTRAINT: Types.Cart_Constraint;
}>;


export type UpdateDbCartMutation = { insert_cart?: { affected_rows: number, returning: Array<{ id: any }> } | null };

export type GetDbCartQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDbCartQuery = { cart: Array<{ id: any, content?: any | null }> };

export type GetProductByIdForCartQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductByIdForCartQuery = { product_by_pk?: { id: any, image_url?: Array<string> | null, name: string, price: number, discount_price?: number | null, category: { id: number, name: string, slug?: string | null }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, commision_rate?: number | null }> }, product_customizable_areas: Array<{ count: number, max_character?: number | null, customizable_area: { id: number, type: string } }> } | null };


export const UpdateDbCartDocument = gql`
    mutation updateDbCart($payload: [cart_insert_input!]!, $CONSTRAINT: cart_constraint!) {
  insert_cart(
    objects: $payload
    on_conflict: {constraint: $CONSTRAINT, update_columns: [content]}
  ) {
    returning {
      id
    }
    affected_rows
  }
}
    `;

export function useUpdateDbCartMutation() {
  return Urql.useMutation<UpdateDbCartMutation, UpdateDbCartMutationVariables>(UpdateDbCartDocument);
};
export const GetDbCartDocument = gql`
    query getDbCart {
  cart {
    id
    content
  }
}
    `;

export function useGetDbCartQuery(options?: Omit<Urql.UseQueryArgs<GetDbCartQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDbCartQuery, GetDbCartQueryVariables>({ query: GetDbCartDocument, ...options });
};
export const GetProductByIdForCartDocument = gql`
    query getProductByIdForCart($id: bigint!) {
  product_by_pk(id: $id) {
    id
    image_url
    name
    price
    category {
      id
      name
      slug
    }
    tenant {
      id
      tenants {
        id
        name
        commision_rate
      }
    }
    discount_price
    product_customizable_areas {
      count
      max_character
      customizable_area {
        id
        type
      }
    }
  }
}
    `;

export function useGetProductByIdForCartQuery(options: Omit<Urql.UseQueryArgs<GetProductByIdForCartQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductByIdForCartQuery, GetProductByIdForCartQueryVariables>({ query: GetProductByIdForCartDocument, ...options });
};