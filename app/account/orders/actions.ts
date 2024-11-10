"use server";

import { OrderTextData } from "@/contexts/OrderCustomizableModal/OrderCustomize";
import { mutate, query } from "@/graphql/lib/client";
import {
  GetUserOrdersDocument,
  GetUserOrdersQuery,
  GetUserOrdersQueryVariables,
  UpdateOrderItemSpecialTextDocument,
  UpdateOrderItemSpecialTextMutation,
  UpdateOrderItemSpecialTextMutationVariables,
} from "@/graphql/queries/account/account.generated";
import {
  SendMessageAloneDocument,
  SendMessageAloneMutation,
  SendMessageAloneMutationVariables,
} from "@/graphql/queries/chat/mutation.generated";
import {
  GetOrderByIdDocument,
  GetOrderByIdQuery,
  GetOrderByIdQueryVariables,
} from "@/graphql/queries/order/order.generated";

export const getUserOrders = async () => {
  return await query<GetUserOrdersQuery, GetUserOrdersQueryVariables>({
    query: GetUserOrdersDocument,
    fetchPolicy: "no-cache",
  });
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
  const { data } = await mutate<
    SendMessageAloneMutation,
    SendMessageAloneMutationVariables
  >({
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

export const orderTextsUpload = async (payload: OrderTextData[]) => {
  try {
    const variables = payload.map((d) => ({
      content: d.content,
      order_item_id: d.order_item_id,
      quantity_index: d.quantity_index,
      id: d.id,
    }));

    return await mutate<
      UpdateOrderItemSpecialTextMutation,
      UpdateOrderItemSpecialTextMutationVariables
    >({
      mutation: UpdateOrderItemSpecialTextDocument,
      variables: {
        object: [...variables],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (id: string) => {
  return query<GetOrderByIdQuery, GetOrderByIdQueryVariables>({
    query: GetOrderByIdDocument,
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });
};
