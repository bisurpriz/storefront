"use server";

import { OrderTextData } from "@/contexts/OrderCustomizableModal/OrderCustomize";
import {
  GetUserOrdersQuery,
  UpdateOrderItemSpecialTextMutation,
} from "@/graphql/queries/account/account.generated";
import { SendMessageAloneMutation } from "@/graphql/queries/chat/mutation.generated";
import { GetOrderByIdQuery } from "@/graphql/queries/order/order.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetOrderByIdDocument,
  GetUserOrdersDocument,
  SendMessageAloneDocument,
  UpdateOrderItemSpecialTextDocument,
} from "@/service/user/order";

export const getUserOrders = async () => {
  return await BonnmarseApi.request<GetUserOrdersQuery>({
    query: GetUserOrdersDocument,
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
  const { insert_message_one } =
    await BonnmarseApi.request<SendMessageAloneMutation>({
      query: SendMessageAloneDocument,
      variables: {
        message,
        receiver_id,
        order_tenant_id,
      },
    });
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

    const { insert_order_item_special_text } =
      await BonnmarseApi.request<UpdateOrderItemSpecialTextMutation>({
        query: UpdateOrderItemSpecialTextDocument,
        variables: {
          object: [...variables],
        },
      });
    return {
      insert_order_item_special_text,
      errors: null,
    };
  } catch (error) {
    return {
      insert_order_item_special_text: null,
      errors: error,
    };
  }
};

export const getOrderById = async (id: string) => {
  return BonnmarseApi.request<GetOrderByIdQuery>({
    query: GetOrderByIdDocument,
    variables: {
      id,
    },
  });
};
