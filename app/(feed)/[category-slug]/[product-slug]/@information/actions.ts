"use server";

import { query } from "@/graphql/lib/client";
import {
  GetProductInformationDocument,
  GetProductInformationQuery,
  GetProductInformationQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";

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
