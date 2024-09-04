"use server";

import { mutate, query } from "@/graphql/lib/client";
import {
  MarkAsReadDocument,
  MarkAsReadMutation,
  MarkAsReadMutationVariables,
  SendMessageDocument,
  SendMessageMutation,
  SendMessageMutationVariables,
} from "@/graphql/queries/chat/mutation.generated";
import {
  GetSingleTenantOrderItemDocument,
  GetSingleTenantOrderItemQuery,
  GetSingleTenantOrderItemQueryVariables,
} from "@/graphql/queries/order/order.generated";

export const getTenantOrderItem = async (
  id: GetSingleTenantOrderItemQueryVariables["id"]
) => {
  const response = await query<
    GetSingleTenantOrderItemQuery,
    GetSingleTenantOrderItemQueryVariables
  >({
    query: GetSingleTenantOrderItemDocument,
    variables: {
      id,
    },
  });
  return {
    order_tenant: response?.data?.order_tenant ?? [],
    loading: response?.loading,
  };
};

export const sendMessage = async ({
  message,
  receiver_id,
  chat_thread_id,
}: {
  message: string;
  receiver_id: string;
  chat_thread_id: number;
}) => {
  const { data } = await mutate<
    SendMessageMutation,
    SendMessageMutationVariables
  >({
    mutation: SendMessageDocument,
    variables: {
      message,
      receiver_id,
      chat_thread_id,
    },
  });
  const { insert_message_one } = data;
  return {
    insert_message_one,
  };
};

export const markAsRead = async (chat_thread_id: string) => {
  const { data } = await mutate<
    MarkAsReadMutation,
    MarkAsReadMutationVariables
  >({
    mutation: MarkAsReadDocument,
    variables: {
      chat_thread_id,
    },
  });
  const { update_message_many } = data;
  return {
    update_message_many,
  };
};
