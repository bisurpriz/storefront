"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";

import { IPlace } from "@/common/types/Product/product";
import { GetProductByIdQuery } from "@/graphql/queries/products/getProductById.generated";
import {
  GetRatingsQuery,
  GetRatingsQueryVariables,
} from "@/graphql/queries/products/getProductRatings.generated";
import {
  GetProductsWithFilteredPaginationQuery,
  GetProductsWithPaginationQuery,
} from "@/graphql/queries/products/getProductsWithPagination.generated";
import {
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
} from "@/graphql/queries/review/review.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetProductByIdDocument,
  GetProductsWithFilteredPaginationDocument,
  GetProductsWithPaginationDocument,
} from "@/service/product";
import {
  GetProductReviewsDocument,
  GetRatingsDocument,
} from "@/service/product/reviews";
import searchClient from "@/typesense/client";
import { createDynamicQueryMapper } from "@/utils/createDynamicQueryMapper";
import { createTypesenseQueryMapper } from "@/utils/createTypesenseQueryMapper";
import { parseJson } from "@/utils/format";
import { gql } from "@apollo/client";
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
  });
};

export const getProductRatings = async ({ pid }: GetRatingsQueryVariables) => {
  const { get_comment_by_score } = await BonnmarseApi.request<GetRatingsQuery>({
    query: GetRatingsDocument,
    variables: {
      pid,
    },
  });
  return get_comment_by_score;
};

export const searchProducts = async (
  paginationParams,
  payload: {
    [key: string]: string | string[] | undefined;
  },
) => {
  if (!payload) return { products: [] };
  const queryMapper = await createDynamicQueryMapper(payload);
  try {
    const { product: products, product_aggregate } =
      await BonnmarseApi.request<GetProductsWithFilteredPaginationQuery>({
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
          q: "*",
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
    console.error("Error fetching suggestions:", error);
  }
};

export const checkProductLocation = async (
  locationId: number,
  type: string,
  productId: number,
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

  const data = await BonnmarseApi.request<any>({
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
