"use server";

import { readIdFromCookies } from "@/app/actions";
import {
  GetProductActionDataDocument,
  GetProductActionDataForAnonymousDocument,
  GetProductActionDataForAnonymousQuery,
  GetProductActionDataForAnonymousQueryVariables,
  GetProductActionDataQuery,
  GetProductActionDataQueryVariables,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";

export const getProductActions = async (productId: number) => {
  const userId = await readIdFromCookies();

  if (userId) {
    return await query<
      GetProductActionDataQuery,
      GetProductActionDataQueryVariables
    >({
      query: GetProductActionDataDocument,
      variables: {
        id: productId,
      },
    });
  } else {
    return await query<
      GetProductActionDataForAnonymousQuery,
      GetProductActionDataForAnonymousQueryVariables
    >({
      query: GetProductActionDataForAnonymousDocument,
      variables: {
        id: productId,
      },
    });
  }
};
