"use server";

import { GetOrderForTrackingQuery } from "@/graphql/queries/order/order.generated";

export const getOrderTrackingInformation = async ({
  orderNo,
}: {
  orderNo: number;
}): Promise<GetOrderForTrackingQuery> => {
  console.log(orderNo, "orderNo");
  if (!orderNo) {
    return {
      order: [],
      error: "Sipariş numarası gereklidir",
    } as GetOrderForTrackingQuery;
  }

  const response = await fetch(
    `${process.env.REST_API_URL}/order/get-order-for-tracking/${orderNo}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  );

  const res = await response.json();
  console.log(res, "res");
  if (!res.success) {
    return {
      order: [],
      error:
        res.status === 404
          ? "Sipariş bulunamadı"
          : `Sipariş bilgisi alınamadı: ${res.message}`,
    } as GetOrderForTrackingQuery;
  }

  const data = res.data;

  if (!data?.length) {
    return {
      order: [],
      error: "Sipariş bulunamadı",
    } as GetOrderForTrackingQuery;
  }

  return {
    order: data,
    error: null,
  } as GetOrderForTrackingQuery;
};
