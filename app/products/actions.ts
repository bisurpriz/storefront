"use server";

import { getClient } from "@/graphql/lib/client";
import { GET_PRODUCTS_WITH_PAGINATION } from "@/graphql/queries/products/getProductsWithPagination";

export const getPaginatedProducts = async <T>({
  offset,
}: {
  offset: number;
}) => {
  const { data } = await getClient().query({
    query: GET_PRODUCTS_WITH_PAGINATION,
    variables: {
      offset,
    },
  });

  return {
    products: data.product,
    totalCount: data.product_aggregate.aggregate.count,
  } as T;
};
