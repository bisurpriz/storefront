"use server";

/**
 *
 * TODO: total_amount ayarla.
 *
 *
 *
 *
 *
 *
 * */

import { mutate } from "@/graphql/lib/client";
import { CREATE_ORDER } from "@/graphql/queries/order/mutation";
import { readIdFromCookies } from "../actions";
import { CartItem } from "@/store/cart";

export const createOrderAction = async (cartItems: CartItem[], orderDetail) => {
  const userId = await readIdFromCookies();

  if (!userId) return null;
  const tenantGrouped = cartItems.reduce((acc, item) => {
    const tenantId = item.tenant_id;
    if (!acc[tenantId]) {
      acc[tenantId] = [];
    }
    acc[tenantId].push(item);
    return acc;
  }, {});

  console.log(userId, "burada");

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          order_item_special_texts: {
            data:
              item.specialInstructions?.map((instruction) => ({
                content: Object.keys(instruction).map((key) => {
                  key.includes("text") && instruction[key];
                }),
              })) ?? [],
          },
          order_item_special_images: {
            data:
              item.specialInstructions?.map((instruction) => ({
                image_url: Object.keys(instruction).map((key) => {
                  key.includes("image") && instruction[key];
                }),
              })) ?? [],
          },
        })),
      },
    };
  });

  const {
    address,
    address_title,
    city_id,
    quarter_id,
    district_id,
    receiver_phone,
    receiver_surname,
    receiver_firstname,
  } = orderDetail;

  const variables = {
    user_id: userId,
    tenant_orders,
    total_amount: 789.99,
    order_addresses: [
      {
        address,
        address_title,
        city_id,
        quarter_id,
        district_id,
        receiver_phone,
        receiver_surname,
        receiver_firstname,
      },
    ],
  };

  const response = await mutate({
    mutation: CREATE_ORDER,
    variables,
  });

  return response;
};
