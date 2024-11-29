"use server";

import { readIdFromCookies } from "@/app/actions";

import { GetUserAddressesQuery } from "@/graphql/queries/address/address.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetUserAddressesDocument } from "@/service/user";

export const getUserAddresses = async () => {
  const userId = await readIdFromCookies();
  const { user_address: user_addresses } =
    await BonnmarseApi.request<GetUserAddressesQuery>({
      query: GetUserAddressesDocument,
      variables: {
        user_id: userId,
      },
    });

  return { user_addresses };
};
