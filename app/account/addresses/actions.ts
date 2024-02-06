'use server';

import { UserAddressesResponse } from '@/common/types/User/user';
import { query } from '@/graphql/lib/client';
import { GET_USER_ADDRESSES } from '@/graphql/queries/address/address';

export const getUserAddresses = async () => {
  const { data } = await query<{
    user_address: UserAddressesResponse[];
  }>({
    query: GET_USER_ADDRESSES,
  });

  return { user_addresses: data.user_address };
};
