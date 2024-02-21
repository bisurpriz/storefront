'use server';

import { GetUserAddressesDocument, GetUserAddressesQuery } from '@/graphql/generated';
import { query } from '@/graphql/lib/client';

export const getUserAddresses = async () => {
  const { data } = await query<GetUserAddressesQuery>({
    query: GetUserAddressesDocument,
  });

  return { user_addresses: data.user_address };
};
