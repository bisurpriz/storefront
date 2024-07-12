import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SendMessageAloneMutationVariables = Types.Exact<{
  message: Types.Scalars['String']['input'];
  receiver_id: Types.Scalars['uuid']['input'];
  order_tenant_id: Types.Scalars['bigint']['input'];
  user_id: Types.Scalars['uuid']['input'];
}>;


export type SendMessageAloneMutation = { insert_message_one?: { created_at: any, chat_thread: { tenat_id: any, order_tenant_id: any } } | null };

export type SendMessageMutationVariables = Types.Exact<{
  message: Types.Scalars['String']['input'];
  receiver_id: Types.Scalars['uuid']['input'];
  chat_thread_id: Types.Scalars['uuid']['input'];
}>;


export type SendMessageMutation = { insert_message_one?: { created_at: any } | null };

export type MarkAsReadMutationVariables = Types.Exact<{
  chat_thread_id: Types.Scalars['uuid']['input'];
}>;


export type MarkAsReadMutation = { update_message_many?: Array<{ affected_rows: number } | null> | null };


export const SendMessageAloneDocument = gql`
    mutation sendMessageAlone($message: String!, $receiver_id: uuid!, $order_tenant_id: bigint!, $user_id: uuid!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread: {data: {order_tenant_id: $order_tenant_id, tenat_id: $receiver_id, user_id: $user_id}, on_conflict: {constraint: chat_thread_order_tenant_id_key, update_columns: [order_tenant_id]}}}
  ) {
    created_at
    chat_thread {
      tenat_id
      order_tenant_id
    }
  }
}
    `;

export function useSendMessageAloneMutation() {
  return Urql.useMutation<SendMessageAloneMutation, SendMessageAloneMutationVariables>(SendMessageAloneDocument);
};
export const SendMessageDocument = gql`
    mutation sendMessage($message: String!, $receiver_id: uuid!, $chat_thread_id: uuid!) {
  insert_message_one(
    object: {receiver_id: $receiver_id, message: $message, chat_thread_id: $chat_thread_id}
  ) {
    created_at
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const MarkAsReadDocument = gql`
    mutation markAsRead($chat_thread_id: uuid!) {
  update_message_many(
    updates: {_set: {is_read: true}, where: {chat_thread_id: {_eq: $chat_thread_id}, is_read: {_eq: false}}}
  ) {
    affected_rows
  }
}
    `;

export function useMarkAsReadMutation() {
  return Urql.useMutation<MarkAsReadMutation, MarkAsReadMutationVariables>(MarkAsReadDocument);
};