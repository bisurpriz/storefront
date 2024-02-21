'use server';

import { GetUserOrdersDocument, GetUserOrdersQuery, SendMessageAloneDocument, SendMessageAloneMutation } from '@/graphql/generated';
import { mutate, query } from '@/graphql/lib/client';

export const getUserOrders = async () => {
  const { data, loading } = await query<GetUserOrdersQuery>({
    query: GetUserOrdersDocument,
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
  const { data } = await mutate<SendMessageAloneMutation>({
    mutation: SendMessageAloneDocument,
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
