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