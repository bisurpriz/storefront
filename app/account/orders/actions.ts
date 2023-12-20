"use server";

import { OrderResponse } from "@/common/types/Order/order";
import { query } from "@/graphql/lib/client";
import { GET_USER_ORDERS } from "@/graphql/queries/account/account";

export const getUserOrders = async () => {
  const { data, loading } = await query<{
    order: OrderResponse[];
  }>({
    query: GET_USER_ORDERS,
    fetchPolicy: "no-cache",
  });
  const { order } = data;
  return {
    orders: order,
    loading,
  };
};
