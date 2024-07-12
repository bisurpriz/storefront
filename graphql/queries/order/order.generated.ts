import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useGetSingleTenantOrderItemQuery(options?: Omit<Urql.UseQueryArgs<GetSingleTenantOrderItemQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSingleTenantOrderItemQuery, GetSingleTenantOrderItemQueryVariables>({ query: GetSingleTenantOrderItemDocument, ...options });
};
export const CreateOrderDocument = gql`
    mutation createOrder($object: order_insert_input!) {
  insert_order_one(object: $object) {
    id
  }
}
    `;

export function useCreateOrderMutation() {
  return Urql.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument);
};