"use server";

import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetOrderForTrackingDocument } from "@/service/orders";

export const getOrderTrackingInformation = async ({
  orderNo,
}: {
  orderNo: number;
}): Promise<GetOrderForTrackingQuery> => {
  return await BonnmarseApi.request<GetOrderForTrackingQuery>({
    query: GetOrderForTrackingDocument,
    variables: {
      orderNo,
    },
    tags: ["getOrderTrackingInformation"],
    withAuth: true,
  });
};
