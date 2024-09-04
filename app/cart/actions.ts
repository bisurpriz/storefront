"use server";

import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { readIdFromCookies } from "../actions";

import { mutate, query } from "@/graphql/lib/client";

import { parseJson } from "@/utils/format";
import axios from "axios";
import { CookieTokens } from "../@auth/contants";
import { createOrderDataMapper } from "./utils";
import { OrderDetailPartialFormData } from "./components/OrderDetail/ReceiverForm";
import { CustomizableArea } from "@/common/types/Order/order";
import {
  GetDbCartDocument,
  GetDbCartQuery,
  GetDbCartQueryVariables,
  GetProductByIdForCartDocument,
  GetProductByIdForCartQuery,
  GetProductByIdForCartQueryVariables,
  UpdateDbCartDocument,
  UpdateDbCartMutation,
  UpdateDbCartMutationVariables,
} from "@/graphql/queries/cart/cart.generated";
import { CreateOrderMutationVariables } from "@/graphql/queries/order/order.generated";
import {
  GetProductsForInitialCartDocument,
  GetProductsForInitialCartQuery,
  GetProductsForInitialCartQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";

export const checkUserId = async () => {
  const userId = await readIdFromCookies();

  return userId;
};

const uploadOrderItemImages = async () => {
  const images = [];
  const formData = new FormData();
  images.map((file: File) => {
    formData.append("items", file as Blob);
  });
  formData.append("order_item_id", "120");

  axios.post(
    "https://mmcvpm3nmlyqbt2uiyr5h5optm0pihfu.lambda-url.eu-north-1.on.aws",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const createOrderAction = async (
  cartItems: ProductForCart[],
  orderDetail: OrderDetailPartialFormData,
  paymentConversationId: string,
  couponInfo?: { code: string; guest_id?: string }
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
      user_id: user_id,
      guest_id: user_id ? undefined : guestId,
      tenant_orders,
      order_addresses,
      sender_mail: orderDetail.sender_email,
      sender_phone: orderDetail.sender_phone,
      paymentConversationId,
      user_coupons: couponInfo
        ? {
            data: [
              {
                coupon_code: couponInfo?.code,
                guest_id: couponInfo?.guest_id,
              },
            ],
          }
        : undefined,
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
  ).then((res) => res.json());

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
  cartItems: Pick<ProductForCart, "id" | "quantity">[],
  couponCode?: string
) => {
  const { data: costData } = await axios.post(
    "https://llt4tsk3fqsilcccjrst76njyq0eiqne.lambda-url.eu-north-1.on.aws/",
    {
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      couponCode,
    }
  );
  return costData;
};

export const updateCart = async (cartItems: ProductForCart[]) => {
  try {
    const content = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      tenant_id: item.tenant?.tenants?.[0].id,
      product_customizable_areas: item.product_customizable_areas,
      deliveryTime: item.deliveryTime,
      deliveryDate: item.deliveryDate,
      is_service_free: item.is_service_free,
      delivery_type: item.delivery_type,
    }));

    const userId = await checkUserId();

    const { data: cartData } = await mutate<
      UpdateDbCartMutation,
      UpdateDbCartMutationVariables
    >({
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
      costData: costData,
    };
  } catch (error) {
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
    } = await query<GetDbCartQuery, GetDbCartQueryVariables>({
      query: GetDbCartDocument,
      fetchPolicy: "no-cache",
      context: headers,
    });

    const parsedContent = parseJson(cart[0].content);
    if (parsedContent.length === 0)
      return {
        cartItems: [],
        costData: {
          totalPrice: 0,
          couponMessage: "",
          isCouponApplied: false,
        },
      } as {
        cartItems: ProductForCart[];
        costData: CostData;
      };

    const ids = parsedContent.map((item) => item.product_id);
    const {
      data: { product },
    } = await query<
      GetProductsForInitialCartQuery,
      GetProductsForInitialCartQueryVariables
    >({
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
        deliveryTime: item.deliveryTime,
        deliveryDate: item.deliveryDate,
      };
    });

    return {
      cartItems,
      costData,
    } as {
      cartItems: ProductForCart[];
      costData: CostData;
    };
  } catch (error) {
    return {
      cartItems: [],
      costData: {
        totalPrice: 0,
        couponMessage: "",
        isCouponApplied: false,
      },
    } as {
      cartItems: ProductForCart[];
      costData: CostData;
    };
  }
};

export const getProductByIdForCart = async (id: number) => {
  const response = await query<
    GetProductByIdForCartQuery,
    GetProductByIdForCartQueryVariables
  >({
    query: GetProductByIdForCartDocument,
    variables: {
      id,
    },
  });

  const product: ProductForCart = {
    product_categories: response.data.product_by_pk.product_categories,
    discount_price: response.data.product_by_pk.discount_price,
    id: response.data.product_by_pk.id,
    image_url: response.data.product_by_pk.image_url,
    name: response.data.product_by_pk.name,
    price: response.data.product_by_pk.price,
    quantity: 1,
    product_customizable_areas:
      response.data.product_by_pk.product_customizable_areas.map((area) => ({
        count: area.count,
        customizable_area: {
          id: area.customizable_area.id,
          type: area.customizable_area.type as CustomizableArea["type"],
        },
        max_character: area.max_character,
      })),
    tenant: response.data.product_by_pk.tenant,
    is_service_free: response.data.product_by_pk.is_service_free,
    delivery_type: response.data.product_by_pk.delivery_type,
  };

  return product;
};
