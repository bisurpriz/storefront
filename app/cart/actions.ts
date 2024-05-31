"use server";

import { ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { readIdFromCookies } from "../actions";

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
import { CookieTokens } from "../@auth/contants";

export const checkUserId = async () => {
  const userId = await readIdFromCookies();

  return userId;
};

export const createOrderAction = async (
  cartItems: ProductForCart[],
  orderDetail
) => {
  const userId = await checkUserId();

  if (!userId) return null;
  const tenantGrouped = cartItems.reduce((acc, item) => {
    const tenantId = item.tenant.tenants?.[0]?.id;
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

  const token = await cookies().get(CookieTokens.ACCESS_TOKEN).value;

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

  return costData.totalPrice as number;
};

export const updateCart = async (cartItems: ProductForCart[]) => {
  try {
    const content = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      tenant_id: item.tenant?.tenants?.[0].id,
      product_customizable_areas: item.product_customizable_areas,
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
      costData,
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

export const getCart = async (user_id: string) => {
  if (!user_id || !(await checkUserId()))
    return {
      cartItems: [],
      costData: 0,
    } as {
      cartItems: ProductForCart[];
      costData: number;
    };

  try {
    const {
      data: { cart },
    } = await query<GetDbCartQuery>({
      query: GetDbCartDocument,
      variables: {
        user_id: user_id ?? (await checkUserId()),
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
        product_customizable_areas: item.product_customizable_areas,
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
