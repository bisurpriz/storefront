"use server";

import {
  MarkAsReadMutation,
  SendMessageMutation,
} from "@/graphql/queries/chat/mutation.generated";
import {
  GetSingleTenantOrderItemQuery,
  GetSingleTenantOrderItemQueryVariables,
} from "@/graphql/queries/order/order.generated";
import { MarkAsReadDocument, SendMessageDocument } from "@/service/account";
import { BonnmarseApi } from "@/service/fetch";
import { GetSingleTenantOrderItemDocument } from "@/service/orders";

export const getTenantOrderItem = async (
  id: GetSingleTenantOrderItemQueryVariables["id"],
) => {
  const { order_tenant } =
    await BonnmarseApi.request<GetSingleTenantOrderItemQuery>({
      query: GetSingleTenantOrderItemDocument,
      variables: {
        id,
      },
    });
  return {
    order_tenant: order_tenant ?? [],
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
  const { insert_message_one } =
    await BonnmarseApi.request<SendMessageMutation>({
      query: SendMessageDocument,
      variables: {
        message,
        receiver_id,
        chat_thread_id,
      },
    });
  return {
    insert_message_one,
  };
};

export const markAsRead = async (chat_thread_id: string) => {
  const { update_message_many } =
    await BonnmarseApi.request<MarkAsReadMutation>({
      query: MarkAsReadDocument,
      variables: {
        chat_thread_id,
      },
    });
  return {
    update_message_many,
  };
};
