"use server";

import { ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { readIdFromCookies } from "../actions";

import { mutate, query } from "@/graphql/lib/client";
import {
  CreateOrderMutationVariables,
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
import { createOrderDataMapper } from "./constants";
import { OrderDetailPartialFormData } from "./components/OrderDetail/ReceiverForm";

export const checkUserId = async () => {
  const userId = await readIdFromCookies();

  return userId;
};

export const createOrderAction = async (
  cartItems: ProductForCart[],
  orderDetail: OrderDetailPartialFormData
) => {
  if (!orderDetail || !cartItems)
    return {
      status: "error",
    };

  const user_id = await readIdFromCookies();
  const guestId = await cookies().get(CookieTokens.GUEST_ID)?.value;

  const {
    object: { tenant_orders, order_addresses },
  } = createOrderDataMapper(cartItems, orderDetail);

  const variables: CreateOrderMutationVariables = {
    object: {
      user_id: user_id ?? guestId,
      tenant_orders,
      order_addresses,
      sender_mail: orderDetail.sender_email,
      sender_phone: orderDetail.sender_phone,
    },
  };

  const response = await fetch(
    "https://nwob6vw2nr3rinv2naqn3cexei0qubqd.lambda-url.eu-north-1.on.aws",
    {
      method: "POST",
      body: JSON.stringify({
        ...variables.object,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(JSON.stringify(response, null, 2));

  if (!response) {
    return {
      status: "error",
    };
  } else {
    return {
      status: "success",
    };
  }
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

    const userId = await checkUserId();

    const { data: cartData } = await mutate<UpdateDbCartMutation>({
      mutation: UpdateDbCartDocument,
      variables: {
        payload: [
          {
            user_id: userId,
            content: JSON.stringify(content),
            guest_id: userId
              ? undefined
              : cookies().get(CookieTokens.GUEST_ID)?.value,
          },
        ],
        CONSTRAINT: userId ? "cart_user_id_key" : "cart_guest_id_key",
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
  const userId = user_id || (await checkUserId());
  const guestId = cookies().get(CookieTokens.GUEST_ID)?.value;

  const headers =
    !userId && guestId
      ? {
          headers: {
            "x-hasura-guest-id": guestId,
          },
        }
      : {};
  try {
    const {
      data: { cart },
    } = await query<GetDbCartQuery>({
      query: GetDbCartDocument,
      fetchPolicy: "no-cache",
      context: headers,
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
    return {
      cartItems: [],
      costData: 0,
    } as {
      cartItems: ProductForCart[];
      costData: number;
    };
  }
};
