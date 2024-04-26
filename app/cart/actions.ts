"use server";

import { ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { readFingerPrintFromCookies, readIdFromCookies } from "../actions";
import { IPaymentToken } from "@/common/types/Payment/payment";
import { paymentConfig } from "@/config";
import crypto from "crypto";
import { mutate, query } from "@/graphql/lib/client";
import {
  GetDbCartDocument,
  GetDbCartQuery,
  GetProductsForInitialCartDocument,
  GetProductsForInitialCartQuery,
  UpdateDbCartDocument,
  UpdateDbCartMutation,
} from "@/graphql/generated";
import { parseJson } from "@/utils/format";
import axios from "axios";

export const checkUserId = async () => {
  const userId = await readIdFromCookies();
  const fingerPrint = await readFingerPrintFromCookies();

  if (!userId) {
    return fingerPrint;
  }

  return userId;
};

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

  const token = await cookies().get("access_token").value;

  const response = await fetch(
    "https://nwob6vw2nr3rinv2naqn3cexei0qubqd.lambda-url.eu-north-1.on.aws",
    {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
};

export async function getPaymentToken() {
  "use server";

  const payload: IPaymentToken = {
    merchant_id: paymentConfig.merchant_id,
    merchant_key: paymentConfig.merchant_key,
    merchant_salt: paymentConfig.merchant_salt,
    merchant_ok_url: "https://www.paytr.com/",
    merchant_fail_url: "https://www.paytr.com/",
    currency: "TL",
    debug_on: 1,
    email: "enes@enes.com",
    max_installment: 0,
    merchant_oid: Math.random().toString(36).substring(7).toString(),
    no_installment: 1,
    payment_amount: 100,
    test_mode: 1,
    user_basket: "Test",
    user_ip: "94.54.30.25",
    user_name: "Enes",
    user_phone: "5555555555",
    user_address: "Test address",
    paytr_token: "123456",
  };

  const hashSTR = `${payload.merchant_id}${payload.user_ip}${payload.merchant_oid}${payload.email}${payload.payment_amount}${payload.user_basket}${payload.no_installment}${payload.max_installment}${payload.currency}${payload.test_mode}`;
  const paytr_token = hashSTR + payload.merchant_salt;

  const token = crypto
    .createHmac("sha256", paymentConfig.merchant_key)
    .update(paytr_token)
    .digest("base64");

  payload.paytr_token = token;

  const formData = new FormData();

  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  const response = await fetch(paymentConfig.request_url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(payload as any).toString(),
  });

  const data = await response.json();
  return data;
}

export const getCartCost = async (
  cartItems: Pick<ProductForCart, "id" | "quantity">[]
) => {
  const { data: costData } = await axios.post(
    "https://llt4tsk3fqsilcccjrst76njyq0eiqne.lambda-url.eu-north-1.on.aws/",
    {
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    }
  );

  return costData.totalPrice;
};

export const updateCart = async (cartItems: ProductForCart[]) => {
  try {
    const content = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      tenant_id: item.tenant.id,
    }));

    const { data: cartData } = await mutate<UpdateDbCartMutation>({
      mutation: UpdateDbCartDocument,
      variables: {
        payload: [
          {
            user_id: await checkUserId(),
            content: JSON.stringify(content),
          },
        ],
      },
    });

    const costData = await getCartCost(cartItems);

    return {
      cartData,
      costData: costData,
    };
  } catch (error) {
    console.log("Sepet güncellenirken bir hata oluştu.", error);
    return {
      data: null,
      error: {
        message: "Sepet güncellenirken bir hata oluştu.",
      },
    };
  }
};

export const getCart = async () => {
  try {
    const {
      data: { cart },
    } = await query<GetDbCartQuery>({
      query: GetDbCartDocument,
      variables: {
        user_id: await checkUserId(),
      },
      fetchPolicy: "no-cache",
    });

    const parsedContent = parseJson(cart[0].content);
    if (parsedContent.length === 0)
      return {
        cartItems: [],
        costData: 0,
      } as {
        cartItems: ProductForCart[];
        costData: number;
      };

    const ids = parsedContent.map((item) => item.product_id);
    const {
      data: { product },
    } = await query<GetProductsForInitialCartQuery>({
      query: GetProductsForInitialCartDocument,
      variables: {
        ids,
      },
    });

    const costData = await getCartCost(
      parsedContent.map((_) => ({ id: _.product_id, quantity: _.quantity }))
    );

    const cartItems = parsedContent.map((item) => {
      const hasProduct = product.find((p) => p.id === item.product_id);
      return {
        ...item,
        ...hasProduct,
        quantity: item.quantity,
      };
    });

    return {
      cartItems,
      costData,
    } as {
      cartItems: ProductForCart[];
      costData: number;
    };
  } catch (error) {
    console.log(
      "Sepet bilgisine ulaşılamadı. Hata: getCart fonksiyonu içerisinde."
    );
    return {
      cartItems: [],
      costData: 0,
    } as {
      cartItems: ProductForCart[];
      costData: number;
    };
  }
};
