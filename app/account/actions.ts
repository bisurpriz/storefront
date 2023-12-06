"use server";

import { getClient } from "@/graphql/lib/client";
import {
  GET_CITIES,
  GET_DISTRICTS,
  GET_QUARTERS,
  GET_USER_ADDRESS_BY_ID,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "@/graphql/queries/account/getUserById";
import { readIdFromCookies } from "../actions";

export const getQuarters = async (districtId: string) => {
  const client = getClient();
  const { data, loading } = await client.query({
    query: GET_QUARTERS,
    variables: {
      districtId,
    },
  });

  return {
    quarters: data.quarters,
    loading,
  };
};

export const getDiscrits = async (cityId: string) => {
  const client = getClient();
  const { data, loading } = await client.query({
    query: GET_DISTRICTS,
    variables: {
      cityId,
    },
  });

  return {
    districts: data.districts,
    loading,
  };
};

export const getCities = async () => {
  const client = getClient();
  const { data, loading } = await client.query({
    query: GET_CITIES,
  });

  return {
    cities: data.cities,
    loading,
  };
};

export const getUserAddressById = async (id?: string) => {
  const client = getClient();
  let userId = id;
  if (!userId) {
    userId = await readIdFromCookies();
  } else return;

  const { data, loading } = await client.query({
    query: GET_USER_ADDRESS_BY_ID,
    variables: {
      id: userId,
    },
  });

  return {
    userAddresses: data.user_by_pk.user_addresses,
    loading,
  };
};

export const getUserById = async (id?: string) => {
  const client = getClient();
  let userId = id;
  if (!userId) {
    userId = await readIdFromCookies();
  } else return;

  const { data, loading } = await client.query({
    query: GET_USER_BY_ID,
    variables: {
      id: userId,
    },
  });

  return {
    user: data.user_by_pk,
    loading,
  };
};

export const updateUserById = async (data: any) => {
  const client = getClient();
  const { data: updatedData } = await client.mutate({
    mutation: UPDATE_USER_BY_ID,
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_USER_BY_ID,
        variables: {
          id: data.id,
        },
      },
    ],
    variables: {
      ...data,
      id: data.id,
    },
  });

  return {
    user: updatedData.update_user_by_pk,
  };
};
