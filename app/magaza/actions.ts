"use server";
import {
  GetVendorByIdQuery,
  GetVendorCouponsQuery,
  GetVendorProductScoreAverageQuery,
  GetVendorReviewsQuery,
} from "@/graphql/queries/vendors/getVendorById.generated";
import { GetVendorProductsWithPaginationQuery } from "@/graphql/queries/vendors/getVendorProducstWithPagination.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetVendorByIdDocument,
  GetVendorCouponsDocument,
  GetVendorProductScoreAverageDocument,
  GetVendorProductsWithPaginationDocument,
  GetVendorReviewsDocument,
} from "@/service/vendor";

export const getPaginatedVendorProducts = async <T>({
  offset,
  tenant_id,
}: {
  offset: number;
  tenant_id: string;
}) => {
  const { product, product_aggregate } =
    await BonnmarseApi.request<GetVendorProductsWithPaginationQuery>({
      query: GetVendorProductsWithPaginationDocument,
      variables: {
        offset,
        tenant_id,
      },
      tags: ["getPaginatedVendorProducts"],
      withAuth: false,
    });

  return {
    products: product,
    totalCount: product_aggregate.aggregate.count,
  } as T;
};

export const getVendorDetails = async ({ id }: { id: string }) => {
  const { tenant_by_pk } = await BonnmarseApi.request<GetVendorByIdQuery>({
    query: GetVendorByIdDocument,
    variables: {
      id,
    },
    tags: ["getVendorDetails"],
    withAuth: false,
  });

  return tenant_by_pk;
};

export const getVendorReviews = async ({ id }: { id: string }) => {
  return await BonnmarseApi.request<GetVendorReviewsQuery>({
    query: GetVendorReviewsDocument,
    variables: {
      tenant_id: id,
    },
    tags: ["getVendorReviews"],
    withAuth: false,
  });
};

export const getVendorProductScoreAverage = async ({ id }: { id: string }) => {
  return await BonnmarseApi.request<GetVendorProductScoreAverageQuery>({
    query: GetVendorProductScoreAverageDocument,
    variables: {
      tenant_id: id,
    },
    tags: ["getVendorProductScoreAverage"],
    withAuth: false,
  });
};

export const getVendorCoupons = async ({ id }: { id: string }) => {
  return await BonnmarseApi.request<GetVendorCouponsQuery>({
    query: GetVendorCouponsDocument,
    variables: {
      tenant_id: id,
    },
    tags: ["getVendorCoupons"],
    withAuth: false,
  });
};
