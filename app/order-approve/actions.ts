"use server";

import { GetOrderApproveImagesQuery } from "@/graphql/queries/order/order.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetOrderApproveImagesDocument } from "@/service/orders";
import axios from "axios";

export const getOrderApproveImages = async ({
  token,
}: {
  token: string;
}): Promise<GetOrderApproveImagesQuery["order_item"][0]> => {
  const { order_item } = await BonnmarseApi.request<GetOrderApproveImagesQuery>(
    {
      query: GetOrderApproveImagesDocument,
      variables: {
        token,
      },
      tags: ["getOrderApproveImages"],
      withAuth: false,
    },
  );

  return order_item[0];
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
    },
  );

  return response.data;
};
