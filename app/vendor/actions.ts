'use server';

import { getClient } from '@/graphql/lib/client';
import { GET_VENDOR_PRODUCTS_WITH_PAGINATION } from '@/graphql/queries/vendors/getVendorProducstWithPagination';

export const getPaginatedVendorProducts = async <T>({
  offset,
  tenant_id,
}: {
  offset: number;
  tenant_id: string;
}) => {
  const { data } = await getClient().query({
    query: GET_VENDOR_PRODUCTS_WITH_PAGINATION,
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
