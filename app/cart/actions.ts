"use server";

import { getClient } from "@/graphql/lib/client";
import { CREATE_ORDER } from "@/graphql/queries/order/mutation";
import { readIdFromCookies } from "../actions";

export const createOrderAction = async (tenantGrouped: any) => {
  const userId = await readIdFromCookies();

  if (!userId) return null;

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          user_id: userId,
          order_item_special_texts: {
            data: [
              { content: "enes sahin yazuılsın" },
              { content: "enes sahin yazuılsın" },
            ],
          },
        })),
      },
    };
  });

  const variables = {
    user_id: userId,
    tenant_orders,
    order_addresses: [
      {
        address: "asalet sokak",
        address_title: "ev",
        city_id: 1,
        quarter_id: 1,
        district_id: 1,
        receiver_phone: "045456347383",
        receiver_surname: "ömer",
        receiver_firstname: "şahin",
      },
    ],
  };

  const response = await getClient().mutate({
    mutation: CREATE_ORDER,
    variables,
  });

  return response;
};
