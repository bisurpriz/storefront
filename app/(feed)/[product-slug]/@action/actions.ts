"use server";

import { readIdFromCookies } from "@/app/actions";

import {
  GetProductActionDataForAnonymousQuery,
  GetProductActionDataQuery,
} from "@/graphql/queries/products/getProductById.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetProductActionDataDocument,
  GetProductActionDataForAnonymousDocument,
} from "@/service/product/actions";

export const getProductActions = async (
  productId: number,
): Promise<GetProductActionDataQuery> => {
  const userId = await readIdFromCookies();

  if (userId) {
    const response = await BonnmarseApi.request<GetProductActionDataQuery>({
      query: GetProductActionDataDocument,
      variables: {
        id: productId,
      },
      tags: ["getProductActionData"],
      withAuth: true,
    });

    const product = response?.product;

    if (product) {
      return {
        product: {
          user_favorites: product?.user_favorites,
          user_favorites_aggregate: product?.user_favorites_aggregate,
          tenant: product.tenant,
          delivery_type: product.delivery_type,
          delivery_time_ranges: product.delivery_time_ranges,
        },
      };
    }
  }

  const response =
    await BonnmarseApi.request<GetProductActionDataForAnonymousQuery>({
      query: GetProductActionDataForAnonymousDocument,
      variables: {
        id: productId,
      },
      tags: ["getProductActionDataForAnonymous"],
      withAuth: false,
    });

  const product = response?.product;

  return {
    product: {
      user_favorites: [],
      user_favorites_aggregate: product?.user_favorites_aggregate,
      tenant: product.tenant,
      delivery_type: product.delivery_type,
      delivery_time_ranges: product.delivery_time_ranges,
    },
  };
};
