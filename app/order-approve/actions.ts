"use server"

import { getClient } from "@/graphql/lib/client";
import {
  GetOrderApproveImagesDocument,
  GetOrderApproveImagesQuery,
  GetOrderApproveImagesQueryVariables,
  UpdateOrderItemApproveDocument,
  UpdateOrderItemApproveMutation,
  UpdateOrderItemApproveMutationVariables,
} from "@/graphql/queries/order/order.generated";

export const getOrderApproveImages = async ({
  orderItemId,
  salt, // timestamp
}: {
  orderItemId: number;
  salt: string;
}): Promise<GetOrderApproveImagesQuery["order_item"][0]> => {
  const { data } = await getClient().query<
    GetOrderApproveImagesQuery,
    GetOrderApproveImagesQueryVariables
  >({
    query: GetOrderApproveImagesDocument,
    variables: {
      id: orderItemId,
      date: salt,
    },
  });

  return data.order_item[0];
};

export const approveOrderImages = async ({
  orderItemId,
  salt, // timestamp
  note,
  status,
}: {
  orderItemId: number;
  salt: string;
  note?: string;
  status: boolean;
}): Promise<UpdateOrderItemApproveMutation["update_order_item"]> => {
  const { data } = await getClient().mutate<
    UpdateOrderItemApproveMutation,
    UpdateOrderItemApproveMutationVariables
  >({
    mutation: UpdateOrderItemApproveDocument,
    variables: {
      id: orderItemId,
      date: salt,
      note,
      status,
    },
  });

  return data.update_order_item;
};
