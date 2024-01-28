"use server";

import { mutate, query } from "@/graphql/lib/client";
import {
  CREATE_NEW_ADDRESS,
  GET_CITIES,
  GET_DISTRICTS,
  GET_QUARTERS,
  GET_USER_ADDRESS_BY_ID,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "@/graphql/queries/account/account";
import { readIdFromCookies } from "../actions";
import {
  CityResponse,
  DistrictResponse,
  QuarterResponse,
} from "@/common/types/Addresses/addresses";
import { User } from "@/common/types/User/user";

export const getQuarters = async (districtId: string) => {
  const { data, loading } = await query<{
    quarters: QuarterResponse[];
  }>({
    query: GET_QUARTERS,
    variables: {
      districtId,
    },
  });

  const { quarters } = data;

  return {
    quarters,
    loading,
  };
};

export const getDiscrits = async (cityId: string) => {
  const { data, loading } = await query<{
    districts: DistrictResponse[];
  }>({
    query: GET_DISTRICTS,
    variables: {
      cityId,
    },
  });

  const { districts } = data;

  return {
    districts,
    loading,
  };
};

export const getCities = async () => {
  const { data, loading } = await query<{
    cities: CityResponse[];
  }>({
    query: GET_CITIES,
  });

  const { cities } = data;
  return {
    cities,
    loading,
    error: null,
  };
};

export const getUserAddressById = async (id?: string) => {
  const userId = id || (await readIdFromCookies());

  if (!userId) {
    return {
      userAddresses: [],
      loading: false,
    };
  }

  const { data, loading } = await query({
    query: GET_USER_ADDRESS_BY_ID,
    variables: {
      id: userId,
    },
  });

  const {
    user_by_pk: { user_addresses },
  } = data;

  return {
    userAddresses: user_addresses,
    loading,
    user_id: userId,
  };
};

export const getUserById = async (id?: string) => {
  const hasId = await readIdFromCookies();
  const userId = id || hasId;

  if (!hasId) {
    return {
      user: null,
      loading: false,
    };
  }

  const { data, loading } = await query<{
    user_by_pk: User;
  }>({
    query: GET_USER_BY_ID,
    variables: {
      id: userId,
    },
  });

  const { user_by_pk: user } = data;
  return {
    user: user as User,
    loading,
    id: userId,
  };
};

export const updateUserById = async (
  data: Partial<
    Pick<User, "firstname" | "lastname" | "email" | "id" | "phone" | "picture">
  >
) => {
  const { data: updatedData } = await mutate({
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

  const { update_user_by_pk: user } = updatedData;

  return {
    user,
  };
};

export const createNewUserAddress = async (data: {
  address: string;
  city_id: string;
  district_id: string;
  quarter_id: string;
  user_id: string;
  receiver_firstname: string;
  receiver_lastname: string;
  receiver_phone: string;
}) => {
  const { data: updatedData } = await mutate({
    mutation: CREATE_NEW_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_USER_BY_ID,
        variables: {
          id: data.user_id,
        },
      },
    ],
    variables: {
      ...data,
      id: data.user_id,
    },
  });

  const { update_user_by_pk: user } = updatedData;

  return {
    user,
  };
};
