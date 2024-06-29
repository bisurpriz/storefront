"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
  GetProductsWithFilteredPaginationDocument,
  GetProductsWithFilteredPaginationQuery,
  GetProductsWithPaginationDocument,
  GetProductsWithPaginationQuery,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";
import { createDynamicQueryMapper } from "@/utils/createDynamicQueryMapper";

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
  return data;
};

export const searchLocation = async (location: string) => {
  try {
    const {
      data: { search_locationv1: locations },
    } = await query<GetLocationQueryQuery>({
      query: GetLocationQueryDocument,
      variables: {
        location,
      },
    });

    return {
      locations,
      message: "Success",
    };
  } catch (error) {
    return {
      locations: [],
      message: error.message,
    };
  }
};

export const searchProducts = async (
  paginationParams,
  payload: {
    [key: string]: string | string[] | undefined;
  }
) => {
  if (!payload) return { products: [] };
  const queryMapper = createDynamicQueryMapper(payload);
  try {
    const {
      data: { product: products, product_aggregate },
    } = await query<GetProductsWithFilteredPaginationQuery>({
      query: GetProductsWithFilteredPaginationDocument,
      variables: {
        filter_payload: {
          ...queryMapper.filter_payload,
        },
        ...paginationParams,
      },
    });
    return {
      products,
      message: "Success",
      totalCount: product_aggregate.aggregate.count,
    };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};
