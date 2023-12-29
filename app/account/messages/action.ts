"use server";

import { TenantOrderItem } from "@/common/types/Order/order";
import { mutate, query } from "@/graphql/lib/client";
import { MARK_AS_READ, SEND_MESSAGE } from "@/graphql/queries/chat/mutation";
import { GET_TENANT_ORDER_ITEM } from "@/graphql/queries/order/query";

export const getTenantOrderItem = async (orderId: number) => {
  const response = await query<{
    order_tenant: TenantOrderItem[];
  }>({
    query: GET_TENANT_ORDER_ITEM,
    fetchPolicy: "no-cache",
    variables: {
      id: orderId,
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
  const { data } = await mutate<{
    insert_message_one;
  }>({
    mutation: SEND_MESSAGE,
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
  const { data } = await mutate<{
    update_message_many;
  }>({
    mutation: MARK_AS_READ,
    variables: {
      chat_thread_id,
    },
  });
  const { update_message_many } = data;
  return {
    update_message_many,
  };
};
