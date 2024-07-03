"use server";

import {
  GetVendorByIdDocument,
  GetVendorByIdQuery,
  GetVendorByIdQueryVariables,
  GetVendorProductsWithPaginationDocument,
  GetVendorProductsWithPaginationQuery,
} from "@/graphql/generated";
import { getClient } from "@/graphql/lib/client";

export const getPaginatedVendorProducts = async <T>({
  offset,
  tenant_id,
}: {
  offset: number;
  tenant_id: string;
}) => {
  const { data } =
    await getClient().query<GetVendorProductsWithPaginationQuery>({
      query: GetVendorProductsWithPaginationDocument,
      variables: {
        offset,
        tenant_id,
      },
    });

  return {
    products: data.product,
    totalCount: data.product_aggregate.aggregate.count,
  } as T;
};

export const getVendorDetails = async ({ id }: { id: string }) => {
  const { data } = await getClient().query<
    GetVendorByIdQuery,
    GetVendorByIdQueryVariables
  >({
    query: GetVendorByIdDocument,
    variables: {
      id,
    },
  });

  return data.tenant_by_pk;
};
