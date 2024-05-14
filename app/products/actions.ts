"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductsWithPaginationDocument,
  GetProductsWithPaginationQuery,
} from "@/graphql/generated";
import { getClient } from "@/graphql/lib/client";

const client = getClient();

export const getPaginatedProducts = async (params: IProductFilter) => {
  const { data } = await client.query<GetProductsWithPaginationQuery>({
    query: GetProductsWithPaginationDocument,
    variables: {
      ...params,
    },
  });

  return {
    products: data.product,
    totalCount: data.product_aggregate.aggregate.count,
  };
};

export const getProductById = async ({ id }: { id: number }) => {
  const { data } = await client.query<GetProductByIdQuery>({
    query: GetProductByIdDocument,
    variables: {
      id,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  return {
    product: data.product,
  };
};
