"use server";

import { query } from "@/graphql/lib/client";
import {
  GetOrderApproveImagesDocument,
  GetOrderApproveImagesQuery,
  GetOrderApproveImagesQueryVariables,
} from "@/graphql/queries/order/order.generated";
import axios from "axios";

export const getOrderApproveImages = async ({
  token,
}: {
  token: string;
}): Promise<GetOrderApproveImagesQuery["order_item"][0]> => {
  const { data } = await query<
    GetOrderApproveImagesQuery,
    GetOrderApproveImagesQueryVariables
  >({
    query: GetOrderApproveImagesDocument,
    variables: {
      token,
    },
  });

  return data.order_item[0];
};

export const approveOrderImages = async ({
  salt, // timestamp
  note,
  status,
}: {
  salt: string;
  note?: string;
  status: boolean;
}): Promise<any> => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_APPROVE_IMAGE_LAMBDA_URL,
    {
      note,
      status,
    },
    {
      headers: {
        "x-bonnmarse-approve-salt": salt,
      },
    }
  );

  return response.data;
};
