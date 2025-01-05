"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";

import { IPlace } from "@/common/types/Product/product";
import { GetProductByIdQuery } from "@/graphql/queries/products/getProductById.generated";
import {
  GetRatingsQuery,
  GetRatingsQueryVariables,
} from "@/graphql/queries/products/getProductRatings.generated";
import { GetProductsWithPaginationQuery } from "@/graphql/queries/products/getProductsWithPagination.generated";
import {
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
} from "@/graphql/queries/review/review.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetProductByIdDocument,
  GetProductsWithPaginationDocument,
} from "@/service/product";
import {
  GetProductReviewsDocument,
  GetRatingsDocument,
} from "@/service/product/reviews";
import searchClient from "@/typesense/client";
import { createTypesenseQueryMapper } from "@/utils/createTypesenseQueryMapper";
import { parseJson } from "@/utils/format";
import { cookies } from "next/headers";
import { SearchParams } from "typesense/lib/Typesense/Documents";
import { CookieTokens } from "../@auth/contants";
import { PER_REQUEST } from "../constants";

export const getPaginatedProducts = async (params: IProductFilter) => {
  const { product, product_aggregate } =
    await BonnmarseApi.request<GetProductsWithPaginationQuery>({
      query: GetProductsWithPaginationDocument,
      variables: {
        ...params,
      },
      tags: ["getPaginatedProducts"],
      withAuth: false,
    });

  return {
    products: product,
    totalCount: product_aggregate.aggregate.count,
  };
};

export const getProductById = async ({ id }: { id: number }) => {
  const { product } = await BonnmarseApi.request<GetProductByIdQuery>({
    query: GetProductByIdDocument,
    variables: {
      id,
    },
    tags: ["getProductById"],
    withAuth: false,
  });
  return {
    product,
  };
};

export const getProductReviews = async ({
  productId,
  limit = 10,
  offset = 0,
}: GetProductReviewsQueryVariables) => {
  return await BonnmarseApi.request<GetProductReviewsQuery>({
    query: GetProductReviewsDocument,
    variables: {
      productId,
      limit,
      offset,
    },
    tags: ["getProductReviews"],
    withAuth: false,
  });
};

export const getProductRatings = async ({ pid }: GetRatingsQueryVariables) => {
  const { get_comment_by_score } = await BonnmarseApi.request<GetRatingsQuery>({
    query: GetRatingsDocument,
    variables: {
      pid,
    },
    tags: ["getProductRatings"],
    withAuth: false,
  });
  return get_comment_by_score;
};

export const searchProductsv1 = async (
  params: SearchParams = {},
  filters: { [key: string]: string | string[] | undefined } = {},
) => {
  const { get } = await cookies();
  const selectedLocation = parseJson(
    get(CookieTokens.LOCATION_ID)?.value,
  ) as IPlace;

  if (!filters) return { hits: [], found: 0 };
  const filterBy = await createTypesenseQueryMapper(filters, selectedLocation);
  try {
    const response = await searchClient
      .collections("products")
      .documents()
      .search(
        {
          q: filterBy.q ?? "*",
          query_by: "name",
          sort_by: "score:desc",
          filter_by: filterBy.filter_by,
          offset: 0,
          limit: PER_REQUEST,
          ...params,
        },
        {},
      );
    return response;
  } catch (error) {
    console.warn("Error fetching suggestions:", error);
    return { hits: [], found: 0 };
  }
};
