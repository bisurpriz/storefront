"use server";

import { readIdFromCookies } from "@/app/actions";

import { query } from "@/graphql/lib/client";
import {
  GetUserAddressesDocument,
  GetUserAddressesQuery,
  GetUserAddressesQueryVariables,
} from "@/graphql/queries/address/address.generated";

export const getUserAddresses = async () => {
  const userId = await readIdFromCookies();
  const { data } = await query<
    GetUserAddressesQuery,
    GetUserAddressesQueryVariables
  >({
    query: GetUserAddressesDocument,
    variables: {
      user_id: userId,
    },
  });

  return { user_addresses: data.user_address };
};
