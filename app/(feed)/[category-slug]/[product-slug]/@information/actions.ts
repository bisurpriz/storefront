"use server";

import {
  GetProductInformationDocument,
  GetProductInformationQuery,
  GetProductInformationQueryVariables,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";

export const getProductInformation = async (productId) => {
  if (!productId) throw new Error("Product ID is required");

  return await query<
    GetProductInformationQuery,
    GetProductInformationQueryVariables
  >({
    query: GetProductInformationDocument,
    variables: {
      id: productId,
    },
  });
};
