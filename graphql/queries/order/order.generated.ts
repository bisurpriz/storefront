import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetSingleTenantOrderItemQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['bigint']['input']>;
}>;


export type GetSingleTenantOrderItemQuery = { order_tenant: Array<{ id: any, tenant: { id: any } }> };

export type CreateOrderMutationVariables = Types.Exact<{
  object: Types.Order_Insert_Input;
}>;


export type CreateOrderMutation = { insert_order_one?: { id: any } | null };

export type GetOrderApproveImagesQueryVariables = Types.Exact<{
  token?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetOrderApproveImagesQuery = { order_item: Array<{ images_to_approve?: Array<string> | null, is_images_approved?: boolean | null, image_approve_expiry?: any | null }> };

export type UpdateOrderItemApproveMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  status?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  note?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateOrderItemApproveMutation = { update_order_item?: { affected_rows: number, returning: Array<{ is_images_approved?: boolean | null }> } | null };

export type GetOrderForTrackingQueryVariables = Types.Exact<{
  orderNo: Types.Scalars['bigint']['input'];
}>;


export type GetOrderForTrackingQuery = { order: Array<{ created_at: any, order_no?: any | null, tenant_orders: Array<{ id: any, status?: Types.Order_Status_Enum | null, order_items: Array<{ quantity: number, id: any, delivery_date?: any | null, delivery_time?: string | null, product: { name: string, id: any, slug?: string | null, product_categories: Array<{ category: { name: string, id: number, slug?: string | null } }> } }> }> }> };

export type GetOrderByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['uuid']['input']>;
}>;


export type GetOrderByIdQuery = { order_by_pk?: { created_at: any, tenant_orders: Array<{ tenant: { tenants: Array<{ logo?: string | null, name?: string | null }> }, order_items: Array<{ id: any, sell_price?: number | null, quantity: number, order_item_special_images: Array<{ image_url: string, order_item_id: any, quantity_index?: number | null }>, order_item_special_texts: Array<{ id: any, order_item_id: any, quantity_index?: number | null, content: string }>, product: { image_url?: Array<string> | null, slug?: string | null, name: string, product_customizable_areas: Array<{ id: any, max_character?: number | null, count: number, customizable_area: { id: number, type: string } }> } }> }> } | null };


export const GetSingleTenantOrderItemDocument = gql`
    query getSingleTenantOrderItem($id: bigint) {
  order_tenant(where: {id: {_eq: $id}}) {
    id
    tenant {
      id
    }
  }
}
    `;
export type GetSingleTenantOrderItemQueryResult = Apollo.QueryResult<GetSingleTenantOrderItemQuery, GetSingleTenantOrderItemQueryVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($object: order_insert_input!) {
  insert_order_one(object: $object) {
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetOrderApproveImagesDocument = gql`
    query getOrderApproveImages($token: String) {
  order_item(where: {image_approve_token: {_eq: $token}}) {
    images_to_approve
    is_images_approved
    image_approve_expiry
  }
}
    `;
export type GetOrderApproveImagesQueryResult = Apollo.QueryResult<GetOrderApproveImagesQuery, GetOrderApproveImagesQueryVariables>;
export const UpdateOrderItemApproveDocument = gql`
    mutation updateOrderItemApprove($token: String!, $status: Boolean, $note: String) {
  update_order_item(
    where: {image_approve_token: {_eq: $token}}
    _set: {is_images_approved: $status, approve_note: $note}
  ) {
    affected_rows
    returning {
      is_images_approved
    }
  }
}
    `;
export type UpdateOrderItemApproveMutationFn = Apollo.MutationFunction<UpdateOrderItemApproveMutation, UpdateOrderItemApproveMutationVariables>;
export type UpdateOrderItemApproveMutationResult = Apollo.MutationResult<UpdateOrderItemApproveMutation>;
export type UpdateOrderItemApproveMutationOptions = Apollo.BaseMutationOptions<UpdateOrderItemApproveMutation, UpdateOrderItemApproveMutationVariables>;
export const GetOrderForTrackingDocument = gql`
    query getOrderForTracking($orderNo: bigint!) {
  order(where: {order_no: {_eq: $orderNo}, payment_status: {_eq: PAID}}) {
    created_at
    order_no
    tenant_orders {
      id
      status
      order_items {
        quantity
        id
        delivery_date
        delivery_time
        product {
          name
          id
          slug
          product_categories {
            category {
              name
              id
              slug
            }
          }
        }
      }
    }
  }
}
    `;
export type GetOrderForTrackingQueryResult = Apollo.QueryResult<GetOrderForTrackingQuery, GetOrderForTrackingQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: uuid = "") {
  order_by_pk(id: $id) {
    created_at
    tenant_orders {
      tenant {
        tenants {
          logo
          name
        }
      }
      order_items {
        id
        order_item_special_images {
          image_url
          order_item_id
          quantity_index
        }
        order_item_special_texts {
          id
          order_item_id
          quantity_index
          content
        }
        sell_price
        quantity
        product {
          image_url
          slug
          name
          product_customizable_areas {
            customizable_area {
              id
              type
            }
            id
            max_character
            count
          }
        }
      }
    }
  }
}
    `;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;