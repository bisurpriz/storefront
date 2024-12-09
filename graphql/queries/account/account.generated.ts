import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetUserByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['uuid']['input']>;
}>;


export type GetUserByIdQuery = { user_by_pk?: { id: any, created_at?: any | null, email?: string | null, firstname?: string | null, lastname?: string | null, picture?: string | null, phone?: string | null, reference_code?: string | null, user_addresses: Array<{ address_title: string, address: string }>, carts: Array<{ id: any, content?: any | null }>, favorites: Array<{ product_id: any }> } | null };

export type UpdateUserByIdMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  firstname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  lastname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
  picture?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateUserByIdMutation = { update_user_by_pk?: { email?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, picture?: string | null } | null };

export type GetUserOrdersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserOrdersQuery = { order: Array<{ created_at: any, id: any, order_no?: any | null, total_amount: number, tenant_orders: Array<{ id: any, tenant: { id: any, tenants: Array<{ name?: string | null, id: any }> }, order_items: Array<{ id: any, order_item_no?: string | null, product_id: any, quantity: number, order_item_special_images: Array<{ image_url: string, quantity_index?: number | null, id: any }>, order_item_special_texts: Array<{ content: string, quantity_index?: number | null, id: any }>, product: { slug?: string | null, image_url?: Array<string> | null, name: string, quantity?: number | null, product_categories: Array<{ category: { name: string, slug?: string | null } }>, product_customizable_areas: Array<{ count: number, max_character?: number | null, customizable_area: { id: number, type: string } }> } }>, order_status?: { value: string } | null, order_items_aggregate: { aggregate?: { count: number } | null } }> }> };

export type GetUserByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { user: Array<{ id: any, provider_id?: string | null }> };

export type UpdateOrderItemSpecialTextMutationVariables = Types.Exact<{
  object: Array<Types.Order_Item_Special_Text_Insert_Input> | Types.Order_Item_Special_Text_Insert_Input;
}>;


export type UpdateOrderItemSpecialTextMutation = { insert_order_item_special_text?: { affected_rows: number } | null };


export const GetUserByIdDocument = gql`
    query getUserById($id: uuid = "") {
  user_by_pk(id: $id) {
    id
    created_at
    email
    firstname
    lastname
    picture
    phone
    reference_code
    user_addresses {
      address_title
      address
    }
    carts {
      id
      content
    }
    favorites {
      product_id
    }
  }
}
    `;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserByIdDocument = gql`
    mutation updateUserById($id: uuid!, $firstname: String, $lastname: String, $phone: String, $picture: String) {
  update_user_by_pk(
    pk_columns: {id: $id}
    _set: {firstname: $firstname, lastname: $lastname, phone: $phone, picture: $picture}
  ) {
    email
    firstname
    lastname
    phone
    picture
  }
}
    `;
export type UpdateUserByIdMutationFn = Apollo.MutationFunction<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;
export type UpdateUserByIdMutationResult = Apollo.MutationResult<UpdateUserByIdMutation>;
export type UpdateUserByIdMutationOptions = Apollo.BaseMutationOptions<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;
export const GetUserOrdersDocument = gql`
    query getUserOrders {
  order(where: {payment_status: {_eq: PAID}}) {
    created_at
    id
    order_no
    total_amount
    tenant_orders {
      id
      tenant {
        id
        tenants {
          name
          id
        }
      }
      order_items {
        id
        order_item_no
        product_id
        quantity
        order_item_special_images {
          image_url
          quantity_index
          id
        }
        order_item_special_texts {
          content
          quantity_index
          id
        }
        product {
          product_categories {
            category {
              name
              slug
            }
          }
          slug
          image_url
          name
          quantity
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
      order_status {
        value
      }
      order_items_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
}
    `;
export type GetUserOrdersQueryResult = Apollo.QueryResult<GetUserOrdersQuery, GetUserOrdersQueryVariables>;
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    provider_id
  }
}
    `;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const UpdateOrderItemSpecialTextDocument = gql`
    mutation UpdateOrderItemSpecialText($object: [order_item_special_text_insert_input!]!) {
  insert_order_item_special_text(
    objects: $object
    on_conflict: {constraint: order_item_special_text_pkey, update_columns: [content]}
  ) {
    affected_rows
  }
}
    `;
export type UpdateOrderItemSpecialTextMutationFn = Apollo.MutationFunction<UpdateOrderItemSpecialTextMutation, UpdateOrderItemSpecialTextMutationVariables>;
export type UpdateOrderItemSpecialTextMutationResult = Apollo.MutationResult<UpdateOrderItemSpecialTextMutation>;
export type UpdateOrderItemSpecialTextMutationOptions = Apollo.BaseMutationOptions<UpdateOrderItemSpecialTextMutation, UpdateOrderItemSpecialTextMutationVariables>;