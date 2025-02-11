"use server";

import { CostData, ProductForCart } from "@/common/types/Cart/cart";
import { cookies } from "next/headers";
import { createJwt, readIdFromCookies } from "../actions";

import { CustomizableArea } from "@/common/types/Order/order";
import {
  GetDbCartQuery,
  GetProductByIdForCartQuery,
  UpdateDbCartMutation,
} from "@/graphql/queries/cart/cart.generated";
import { CreateOrderMutationVariables } from "@/graphql/queries/order/order.generated";
import { GetProductsForInitialCartQuery } from "@/graphql/queries/products/getProductById.generated";
import {
  GetDbCartDocument,
  GetProductByIdForCartDocument,
  GetProductsForInitialCartDocument,
  UpdateDbCartDocument,
} from "@/service/cart";
import { BonnmarseApi } from "@/service/fetch";
import { parseJson } from "@/utils/format";
import axios from "axios";
import { CookieTokens } from "../@auth/contants";
import { OrderDetailFormData } from "./components/OrderDetail/ReceiverForm/types";
import { createOrderDataMapper } from "./utils";

export const checkUserId = async () => {
  const userId = await readIdFromCookies();

  return userId;
};

export const createOrderAction = async (
  cartItems: ProductForCart[],
  orderDetail: OrderDetailFormData,
  paymentConversationId: string,
  couponInfo?: { code: string; guest_id?: string },
) => {
  if (!orderDetail || !cartItems)
    return {
      data: null,
      status: "error",
    };
  const { get } = await cookies();

  const user_id = await readIdFromCookies();
  const guestId = get(CookieTokens.GUEST_ID)?.value;

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

  const jwtToken = await createJwt();
  const response = await fetch(
    `${process.env.REST_API_URL}/order/create-order`,
    {
      method: "POST",
      body: JSON.stringify(variables.object),
      headers: {
        "Content-Type": "application/json",
        authorization: jwtToken,
      },
    },
  );

  if (!response.ok) {
    console.error("Order creation failed:", await response.text());
    return {
      status: "error",
      message: `Sipariş oluşturulurken bir hata oluştu: ${response.status}`,
    };
  }

  try {
    const data = await response.json();
    if (data.errors) {
      return {
        status: "error",
        message: data.errors[0]?.message || "Bilinmeyen bir hata oluştu",
      };
    }
    return {
      status: "success",
      data: data.data,
    };
  } catch (error) {
    console.error("JSON parse error:", error);
    return {
      status: "error",
      message: "Sunucu yanıtı işlenirken bir hata oluştu",
    };
  }
};

export const getCartCost = async (
  cartItems: Pick<ProductForCart, "id" | "quantity">[],
  couponCode?: string,
) => {
  const { data: costData } = await axios.post(
    `${process.env.REST_API_URL}/order/calculate-order-cost`,
    {
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      couponCode,
    },
  );

  return costData?.data;
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
      deliveryLocation: item.deliveryLocation,
      card_note: item.card_note,
    }));

    const { get } = await cookies();

    const userId = await checkUserId();
    const guest_id = get(CookieTokens.GUEST_ID)?.value;
    const { insert_cart } = await BonnmarseApi.request<UpdateDbCartMutation>({
      query: UpdateDbCartDocument,
      variables: {
        payload: [
          {
            user_id: userId,
            content: JSON.stringify(content),
            guest_id: userId ? undefined : guest_id,
          },
        ],
        CONSTRAINT: userId ? "cart_user_id_key" : "cart_guest_id_key",
      },
      tags: ["updateCart"],
    });
    const costData = await getCartCost(cartItems);
    return {
      insert_cart,
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

export const getCart = async () => {
  const userId = await checkUserId();
  const { get } = await cookies();
  const guestId = get(CookieTokens.GUEST_ID)?.value;
  if (!userId && !guestId) {
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

  try {
    const { cart } = await BonnmarseApi.request<GetDbCartQuery>({
      query: GetDbCartDocument,
      tags: ["getCart"],
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
    const { product } =
      await BonnmarseApi.request<GetProductsForInitialCartQuery>({
        query: GetProductsForInitialCartDocument,
        variables: {
          ids,
        },
        tags: ["getProductsForInitialCart"],
      });

    const cartItems = product
      ?.map((item) => {
        const hasProduct = parsedContent.find((p) => p.product_id === item.id);
        // Check if delivery date is in the past
        if (hasProduct.deliveryDate && hasProduct.deliveryTime) {
          const currentDate = new Date();

          const deliveryDate = new Date(hasProduct.deliveryDate);

          if (deliveryDate < currentDate) {
            return null;
          }
        }

        return {
          ...hasProduct,
          ...item,
          quantity: hasProduct.quantity,
          product_customizable_areas: item.product_customizable_areas,
          card_note: hasProduct.card_note,
        };
      })
      // Remove products with delivery date in the past
      .filter((_) => _ !== null);

    const costData = await getCartCost(
      cartItems.map((_) => ({ id: _.id, quantity: _.quantity })),
    );
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
  const { product_by_pk } =
    await BonnmarseApi.request<GetProductByIdForCartQuery>({
      query: GetProductByIdForCartDocument,
      variables: {
        id,
      },
      tags: ["getProductByIdForCart"],
    });

  const product: ProductForCart = {
    product_categories: product_by_pk.product_categories,
    discount_price: product_by_pk.discount_price,
    id: product_by_pk.id,
    slug: product_by_pk.slug,
    image_url: product_by_pk.image_url,
    name: product_by_pk.name,
    price: product_by_pk.price,
    quantity: 1,
    description: product_by_pk.description,
    delivery_time_ranges: product_by_pk.delivery_time_ranges,
    product_customizable_areas: product_by_pk.product_customizable_areas.map(
      (area) => ({
        count: area.count,
        customizable_area: {
          id: area.customizable_area.id,
          type: area.customizable_area.type as CustomizableArea["type"],
        },
        max_character: area.max_character,
      }),
    ),
    tenant: product_by_pk.tenant,
    is_service_free: product_by_pk.is_service_free,
    delivery_type: product_by_pk.delivery_type,
  };

  return product;
};
