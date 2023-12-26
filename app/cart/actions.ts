"use server";

import redis from "@/redis";
import { readFingerPrintFromCookies, readIdFromCookies } from "../actions";
import { CartItem } from "@/store/cart";
import { getSession } from "@auth0/nextjs-auth0";

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

  const getTexts = (specialInstructions) => {
    // will return an object of texts { content: "text"}
    if (!specialInstructions) return [];
    const texts = Object.keys(specialInstructions)
      .filter(
        (key) => key.includes("text") && specialInstructions[key] !== null
      )
      .map((key) => ({
        content: specialInstructions[key],
      }));

    return texts;
  };

  const getImages = (specialInstructions) => {
    // will return an object of images { content: "image"}
    if (!specialInstructions) return [];
    const images = Object.keys(specialInstructions)
      .filter(
        (key) => key.includes("image") && specialInstructions[key] !== null
      )
      .map((key) => ({
        image_url: specialInstructions[key],
      }));
    return images;
  };

  const tenant_orders = Object.keys(tenantGrouped).map((key) => {
    const tenantItems = tenantGrouped[key];
    return {
      tenant_id: key,
      order_items: {
        data: tenantItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          order_item_special_texts: {
            data: item.specialInstructions
              ? item.specialInstructions.flatMap((instruction) =>
                  getTexts(instruction)
                )
              : [],
          },
          order_item_special_images: {
            data: item.specialInstructions
              ? item.specialInstructions.flatMap((instruction) =>
                  getImages(instruction)
                )
              : [],
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
    tenantOrders: {
      data: tenant_orders,
    },
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

  const { idToken } = await getSession();

  const response = await fetch(
    "https://nwob6vw2nr3rinv2naqn3cexei0qubqd.lambda-url.eu-north-1.on.aws",
    {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.json();
};

export const checkUserId = async () => {
  const userId = await readIdFromCookies();
  const fingerPrint = await readFingerPrintFromCookies();

  if (!userId) {
    return fingerPrint;
  }

  return userId;
};

export const setRedisProduct = async (cartItem: CartItem) => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;
  const value = JSON.stringify([cartItem]);
  const exp = 60 * 60 * 24 * 7;

  const result = await getRedisProducts();
  if (result) {
    const existingCartItems = result as CartItem[];
    existingCartItems.push(cartItem);
    await redis.set(key, JSON.stringify(existingCartItems), "EX", exp);
  } else {
    await redis.set(key, value, "EX", exp);
  }

  return result;
};

export const getRedisProducts = async () => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.get(key);

  return JSON.parse(result) as CartItem[] | null;
};

export const listenToRedis = async () => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.subscribe(key);

  return result;
};
