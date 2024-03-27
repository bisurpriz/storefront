"use server";

import { ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { readFingerPrintFromCookies, readIdFromCookies } from "../actions";
import { IPaymentToken } from "@/common/types/Payment/payment";
import { paymentConfig } from "@/config";
import crypto from "crypto";

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

export const updateCart = async (cartItems: ProductForCart[]) => {
  // TODO: Update cart items in the database
  const mock = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
  return mock;
};

export const getCart = async () => {
  // TODO: Fetch cart items from the database
  const mock: ProductForCart[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          category: {
            name: "Çikolata",
            slug: "cikolota",
            id: 1,
            image_url: "category/1.jpeg",
          },
          discount_price: 289,
          id: 73,
          image_url: ["product/mzxv9gmc7k-1706784371175.jpeg"],
          name: "Lotuslu Hindistan Cevizli ve Fındıklı Lezzet Dünyası",
          price: 300,
          product_customizable_areas: [],
          tenant: {
            nickname: "enessahindev",
            id: "50af64f2-37a9-434f-b6eb-22f368cbff4d",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            role: "User",
            company_type: "",
            picture: "",
            email_verified: false,
            phone_verified: false,
            created_at: "",
            updated_at: "",
            tenant_address: "",
            reference_code: "",
            is_active_tenant: false,
            is_active_user: false,
          },
          quantity: 1,
        },
      ]);
    }, 1000);
  });
  return mock;
};
