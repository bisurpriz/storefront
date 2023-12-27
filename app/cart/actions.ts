"use server";

import redis from "@/redis";
import { readFingerPrintFromCookies, readIdFromCookies } from "../actions";
import { getSession } from "@auth0/nextjs-auth0";
import { ProductForCart } from "@/common/types/Cart/cart";
import { revalidatePath } from "next/cache";

export const createOrderAction = async (
  cartItems: ProductForCart[],
  orderDetail
) => {
  const userId = await checkUserId();

  if (!userId) return null;
  const tenantGrouped = cartItems.reduce((acc, item) => {
    const tenantId = item.tenant.id;
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

const getExpireDefinition = (id: string, item?: ProductForCart) => {
  const key = `cart:${id}`;
  const value = JSON.stringify([item]);
  const exp = 60 * 60 * 24 * 7;

  return { key, value, exp };
};

export const setCartWithRedis = async (cartItem: ProductForCart) => {
  const userId = await checkUserId();

  const { key, value, exp } = getExpireDefinition(userId, cartItem);

  const result = await getCartWithRedis();
  if (result) {
    const existingCartItems = result as ProductForCart[];
    existingCartItems.push(cartItem);
    await redis.set(key, JSON.stringify(existingCartItems), "EX", exp);
  } else {
    await redis.set(key, value, "EX", exp);
  }
  revalidatePath("/cart");

  return result;
};

export const getCartWithRedis = async () => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.get(key);

  return JSON.parse(result) as ProductForCart[];
};

export const listenCartChangedWithRedis = async () => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.subscribe(key);

  return result;
};

export const removeCartWithRedis = async () => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.del(key);
  revalidatePath("/cart");

  return result;
};

export const removeCartItemWithRedis = async (id: number) => {
  const userId = await checkUserId();

  const { key, exp } = getExpireDefinition(userId);

  const result = await getCartWithRedis();
  if (result) {
    const existingCartItems = result as ProductForCart[];
    const filteredCartItems = existingCartItems.filter(
      (item) => item.id !== id
    );

    if (existingCartItems.length === 1) {
      return await removeCartWithRedis();
    } else {
      await redis.set(key, JSON.stringify(filteredCartItems), "EX", exp);
    }
  }
  console.log("REVALIDATE CART");
  revalidatePath("/cart");

  return result;
};

export const updateCartItemWithRedis = async (cartItem: ProductForCart) => {
  const userId = await checkUserId();

  const { key, exp } = getExpireDefinition(userId);

  const result = await getCartWithRedis();
  if (result) {
    const existingCartItems = result as ProductForCart[];
    const filteredCartItems = existingCartItems.filter(
      (item) => item.id !== cartItem.id
    );
    filteredCartItems.push(cartItem);

    await redis.set(key, JSON.stringify(filteredCartItems), "EX", exp);
  }
  revalidatePath("/cart");

  return result;
};

export const publishCartChangedWithRedis = async (cartItem: ProductForCart) => {
  const userId = await checkUserId();

  const key = `cart:${userId}`;

  const result = await redis.publish(key, JSON.stringify(cartItem));

  return result;
};

export const changeQuantityWithRedis = async (
  id: number,
  quantity: number
): Promise<ProductForCart[]> => {
  const userId = await checkUserId();

  const { key, exp } = getExpireDefinition(userId);

  const result = await getCartWithRedis();
  if (result) {
    const existingCartItems = result as ProductForCart[];
    const filteredCartItems = existingCartItems.filter(
      (item) => item.id !== id
    );
    const cartItem = existingCartItems.find((item) => item.id === id);
    cartItem.quantity = quantity;
    filteredCartItems.push(cartItem);
    await redis.set(key, JSON.stringify(filteredCartItems), "EX", exp);
  }
  revalidatePath("/cart");

  return result;
};
