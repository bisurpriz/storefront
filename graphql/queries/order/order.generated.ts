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