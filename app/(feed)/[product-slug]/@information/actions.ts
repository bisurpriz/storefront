"use server";

import { GetProductInformationQuery } from "@/graphql/queries/products/getProductById.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductInformationDocument } from "@/service/product/information";

export const getProductInformation = async (productId) => {
  return await BonnmarseApi.request<GetProductInformationQuery>({
    query: GetProductInformationDocument,
    variables: {
      id: productId,
    },
    tags: ["getProductInformation"],
    withAuth: false,
  });
};
