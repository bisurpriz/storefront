"use server";

import { GetOrderApproveImagesQuery } from "@/graphql/queries/order/order.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetOrderApproveImagesDocument } from "@/service/orders";
import axios from "axios";

export const getOrderApproveImages = async ({
  shortCode,
}: {
  shortCode: string;
}): Promise<GetOrderApproveImagesQuery | null> => {
  try {
    return await BonnmarseApi.request<GetOrderApproveImagesQuery>({
      query: GetOrderApproveImagesDocument,
      variables: {
        shortCode,
      },
      tags: ["getOrderApproveImages"],
      withAuth: false,
    });
  } catch (error) {
    return null;
  }
};

export const approveOrderImages = async ({
  shortCode,
  note,
  status,
}: {
  shortCode: string;
  note?: string;
  status: boolean;
}): Promise<any> => {
  const response = await axios.post(
    process.env.REST_API_URL + "/order/approve-order-item-images",
    {
      note,
      status,
    },
    {
      headers: {
        "x-bonnmarse-approve-code": shortCode,
      },
    },
  );

  return response.data;
};
