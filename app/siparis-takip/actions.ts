"use server";

import { query } from "@/graphql/lib/client";
import {
  GetOrderForTrackingDocument,
  GetOrderForTrackingQuery,
  GetOrderForTrackingQueryVariables,
} from "@/graphql/queries/order/order.generated";

export const getOrderTrackingInformation = async ({
  orderNo,
}: {
  orderNo: number;
}): Promise<GetOrderForTrackingQuery["order"][0]> => {
  const { data } = await query<
    GetOrderForTrackingQuery,
    GetOrderForTrackingQueryVariables
  >({
    query: GetOrderForTrackingDocument,
    variables: {
      orderNo,
    },
  });

  return data.order[0];
};
