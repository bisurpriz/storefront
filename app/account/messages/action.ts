"use server";

import { TenantOrderItem } from "@/common/types/Order/order";
import { mutate, query } from "@/graphql/lib/client";
import { SEND_MESSAGE } from "@/graphql/queries/chat/mutation";
import { GET_TENANT_ORDER_ITEM } from "@/graphql/queries/order/query";

export const getTenantOrderItem = async (orderId: number) => {
  const { data, loading } = await query<{
    order_tenant: TenantOrderItem[];
  }>({
    query: GET_TENANT_ORDER_ITEM,
    fetchPolicy: "no-cache",
    variables: {
      id: orderId,
    },
  });
  const { order_tenant } = data;
  return {
    order_tenant,
    loading,
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
