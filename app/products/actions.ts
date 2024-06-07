"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
  GetProductsWithPaginationDocument,
  GetProductsWithPaginationQuery,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";

export const getPaginatedProducts = async (params: IProductFilter) => {
  const { data } = await query<GetProductsWithPaginationQuery>({
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
  const { data } = await query<GetProductByIdQuery>({
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

export const getProductReviews = async ({
  productId,
  limit = 10,
  offset = 0,
}: GetProductReviewsQueryVariables) => {
  const { data } = await query<GetProductReviewsQuery>({
    query: GetProductReviewsDocument,
    variables: {
      productId,
      limit,
      offset,
    },
    fetchPolicy: "no-cache",
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  console.log(data, "data bu");
  return data;
};
