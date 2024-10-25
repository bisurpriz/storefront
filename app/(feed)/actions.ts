"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";

import { query } from "@/graphql/lib/client";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
} from "@/graphql/queries/account/account.generated";
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
} from "@/graphql/queries/products/getProductById.generated";
import {
  GetRatingsDocument,
  GetRatingsQuery,
  GetRatingsQueryVariables,
} from "@/graphql/queries/products/getProductRatings.generated";
import {
  GetProductsWithFilteredPaginationDocument,
  GetProductsWithFilteredPaginationQuery,
  GetProductsWithPaginationDocument,
  GetProductsWithPaginationQuery,
  GetProductsWithPaginationQueryVariables,
} from "@/graphql/queries/products/getProductsWithPagination.generated";
import {
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
} from "@/graphql/queries/review/review.generated";
import searchClient from "@/typesense/client";
import { createDynamicQueryMapper } from "@/utils/createDynamicQueryMapper";
import { gql } from "@apollo/client";
import { SearchParams } from "typesense/lib/Typesense/Documents";
import { PER_REQUEST } from "../constants";
import { createTypesenseQueryMapper } from "@/utils/createTypesenseQueryMapper";

export const getPaginatedProducts = async (params: IProductFilter) => {
  const { data } = await query<
    GetProductsWithPaginationQuery,
    GetProductsWithPaginationQueryVariables
  >({
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
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  return data;
};

export const getProductRatings = async ({ pid }: GetRatingsQueryVariables) => {
  const { data } = await query<GetRatingsQuery>({
    query: GetRatingsDocument,
    variables: {
      pid,
    },
  });
  return data.get_comment_by_score;
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
  const queryMapper = await createDynamicQueryMapper(payload);
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
      fetchPolicy: "no-cache",
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

export const searchProductsv1 = async (
  params: SearchParams = {},
  filters: { [key: string]: string | string[] | undefined } = {}
) => {
  if (!filters) return { hits: [], found: 0 };
  const filterBy = await createTypesenseQueryMapper(filters);
  
  try {
    const response = await searchClient
      .collections("products")
      .documents()
      .search(
        {
          q: "*",
          query_by: "name",
          sort_by: "score:desc",
          filter_by: filterBy.filter_by,
          offset: 0,
          limit: PER_REQUEST,
          ...params,
        },
        {}
      );
    return response;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

export const checkProductLocation = async (
  locationId: number,
  type: string,
  productId: number
) => {
  if (!locationId || !type) return;
  let whereExp = {};

  if (type === "quarter") whereExp = { quarter: { id: { _eq: locationId } } };
  if (type === "district")
    whereExp = {
      quarter: {
        district: {
          id: { _eq: locationId },
        },
      },
    };
  if (type === "city")
    whereExp = {
      quarter: {
        district: {
          city: {
            id: { _eq: locationId },
          },
        },
      },
    };

  const queryExpression = gql`
    query getLocation($where: tenant_shipping_place_bool_exp, $pid: bigint) {
      product(where: { id: { _eq: $pid } }) {
        tenant {
          tenants {
            tenant_shipping_places_aggregate(where: $where) {
              aggregate {
                count
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await query({
    query: queryExpression as any,
    variables: {
      where: whereExp,
      pid: productId,
    },
  });

  const count =
    data.product[0]?.tenant?.tenants[0]?.tenant_shipping_places_aggregate
      ?.aggregate?.count;
  return count > 0;
};
