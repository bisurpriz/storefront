'use server';

import { GetSingleTenantOrderItemDocument, GetSingleTenantOrderItemQuery, MarkAsReadDocument, MarkAsReadMutation, SendMessageDocument, SendMessageMutation } from '@/graphql/generated';
import { mutate, query } from '@/graphql/lib/client';

export const getTenantOrderItem = async (orderId: number) => {
  const response = await query<GetSingleTenantOrderItemQuery>({
    query: GetSingleTenantOrderItemDocument,
    fetchPolicy: 'no-cache',
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
  const { data } = await mutate<SendMessageMutation>({
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
  const { data } = await mutate<MarkAsReadMutation>({
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
