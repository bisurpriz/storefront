"use server";

import { query } from "@/graphql/lib/client";
import {
  GetVendorProductsWithPaginationDocument,
  GetVendorProductsWithPaginationQuery,
  GetVendorProductsWithPaginationQueryVariables,
} from "@/graphql/queries/vendors/getVendorProducstWithPagination.generated";

export const getPaginatedVendorProducts = async <T>({
  offset,
  tenant_id,
}: {
  offset: number;
  tenant_id: string;
}) => {
  const { data } = await query<
    GetVendorProductsWithPaginationQuery,
    GetVendorProductsWithPaginationQueryVariables
  >({
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
