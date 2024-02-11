'use server';

import { OrderResponse } from '@/common/types/Order/order';
import { mutate, query } from '@/graphql/lib/client';
import { GET_USER_ORDERS } from '@/graphql/queries/account/account';
import { SEND_MESSAGE_ALONE } from '@/graphql/queries/chat/mutation';

export const getUserOrders = async () => {
  const { data, loading } = await query<{
    order: OrderResponse[];
  }>({
    query: GET_USER_ORDERS,
    fetchPolicy: 'no-cache',
  });
  const { order } = data;
  return {
    orders: order,
    loading,
  };
};

export const startMessageForOrder = async ({
  message,
  receiver_id,
  order_tenant_id,
}: {
  message: string;
  receiver_id: string;
  order_tenant_id: number;
}) => {
  const { data } = await mutate<{
    insert_message_one;
  }>({
    mutation: SEND_MESSAGE_ALONE,
    variables: {
      message,
      receiver_id,
      order_tenant_id,
    },
  });
  const { insert_message_one } = data;
  return {
    insert_message_one,
  };
};
