"use server";

import { query } from "@/graphql/lib/client";
import {
  GetVendorByIdDocument,
  GetVendorByIdQuery,
  GetVendorByIdQueryVariables,
} from "@/graphql/queries/vendors/getVendorById.generated";
import {
  GetVendorProductsWithPaginationDocument,
  GetVendorProductsWithPaginationQuery,
} from "@/graphql/queries/vendors/getVendorProducstWithPagination.generated";

export const getPaginatedVendorProducts = async <T>({
  offset,
  tenant_id,
}: {
  offset: number;
  tenant_id: string;
}) => {
  const { data } = await query<GetVendorProductsWithPaginationQuery>({
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
  const { data } = await query<GetVendorByIdQuery, GetVendorByIdQueryVariables>(
    {
      query: GetVendorByIdDocument,
      variables: {
        id,
      },
    }
  );

  return data.tenant_by_pk;
};
