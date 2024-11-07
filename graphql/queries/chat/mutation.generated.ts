import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type SendMessageAloneMutationVariables = Types.Exact<{
  message: Types.Scalars["String"]["input"];
  receiver_id: Types.Scalars["uuid"]["input"];
  order_tenant_id: Types.Scalars["bigint"]["input"];
}>;

export type SendMessageAloneMutation = {
  insert_message_one?: {
    created_at: any;
    chat_thread: { tenat_id: any; order_tenant_id: any };
  } | null;
};

export type SendMessageMutationVariables = Types.Exact<{
  message: Types.Scalars["String"]["input"];
  receiver_id: Types.Scalars["uuid"]["input"];
  chat_thread_id: Types.Scalars["uuid"]["input"];
}>;

export type SendMessageMutation = {
  insert_message_one?: { created_at: any } | null;
};

export type MarkAsReadMutationVariables = Types.Exact<{
  chat_thread_id: Types.Scalars["uuid"]["input"];
}>;

export type MarkAsReadMutation = {
  update_message_many?: Array<{ affected_rows: number } | null> | null;
};

export const SendMessageAloneDocument = gql`
  mutation sendMessageAlone(
    $message: String!
    $receiver_id: uuid!
    $order_tenant_id: bigint!
  ) {
    insert_message_one(
      object: {
        receiver_id: $receiver_id
        message: $message
        chat_thread: {
          data: { order_tenant_id: $order_tenant_id, tenat_id: $receiver_id }
          on_conflict: {
            constraint: chat_thread_order_tenant_id_key
            update_columns: [order_tenant_id]
          }
        }
      }
    ) {
      created_at
      chat_thread {
        tenat_id
        order_tenant_id
      }
    }
  }
`;
export type SendMessageAloneMutationFn = Apollo.MutationFunction<
  SendMessageAloneMutation,
  SendMessageAloneMutationVariables
>;
export type SendMessageAloneMutationResult =
  Apollo.MutationResult<SendMessageAloneMutation>;
export type SendMessageAloneMutationOptions = Apollo.BaseMutationOptions<
  SendMessageAloneMutation,
  SendMessageAloneMutationVariables
>;
export const SendMessageDocument = gql`
  mutation sendMessage(
    $message: String!
    $receiver_id: uuid!
    $chat_thread_id: uuid!
  ) {
    insert_message_one(
      object: {
        receiver_id: $receiver_id
        message: $message
        chat_thread_id: $chat_thread_id
      }
    ) {
      created_at
    }
  }
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export type SendMessageMutationResult =
  Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const MarkAsReadDocument = gql`
  mutation markAsRead($chat_thread_id: uuid!) {
    update_message_many(
      updates: {
        _set: { is_read: true }
        where: {
          chat_thread_id: { _eq: $chat_thread_id }
          is_read: { _eq: false }
        }
      }
    ) {
      affected_rows
    }
  }
`;
export type MarkAsReadMutationFn = Apollo.MutationFunction<
  MarkAsReadMutation,
  MarkAsReadMutationVariables
>;
export type MarkAsReadMutationResult =
  Apollo.MutationResult<MarkAsReadMutation>;
export type MarkAsReadMutationOptions = Apollo.BaseMutationOptions<
  MarkAsReadMutation,
  MarkAsReadMutationVariables
>;
