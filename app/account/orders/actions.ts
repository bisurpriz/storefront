"use server";

import { mutate, query } from "@/graphql/lib/client";
import {
  GetUserOrdersDocument,
  GetUserOrdersQuery,
  GetUserOrdersQueryVariables,
} from "@/graphql/queries/account/account.generated";
import {
  SendMessageAloneDocument,
  SendMessageAloneMutation,
  SendMessageAloneMutationVariables,
} from "@/graphql/queries/chat/mutation.generated";

export const getUserOrders = async () => {
  const { data, loading } = await query<
    GetUserOrdersQuery,
    GetUserOrdersQueryVariables
  >({
    query: GetUserOrdersDocument,
    fetchPolicy: "no-cache",
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
  user_id,
}: {
  message: string;
  receiver_id: string;
  order_tenant_id: number;
  user_id: string;
}) => {
  const { data } = await mutate<
    SendMessageAloneMutation,
    SendMessageAloneMutationVariables
  >({
    mutation: SendMessageAloneDocument,
    variables: {
      message,
      receiver_id,
      order_tenant_id,
      user_id,
    },
  });
  const { insert_message_one } = data;
  return {
    insert_message_one,
  };
};
