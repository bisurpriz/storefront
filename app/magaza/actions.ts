"use server";
import { GetVendorByIdQuery } from "@/graphql/queries/vendors/getVendorById.generated";
import { GetVendorProductsWithPaginationQuery } from "@/graphql/queries/vendors/getVendorProducstWithPagination.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetVendorByIdDocument,
  GetVendorProductsWithPaginationDocument,
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
  });

  return tenant_by_pk;
};
