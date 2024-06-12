"use server";
import { User } from "@/common/types/User/user";
import { mutate, query } from "@/graphql/lib/client";

import { readIdFromCookies } from "../actions";
import {
  CreateNewAddressDocument,
  CreateNewAddressMutation,
  GetCitiesDocument,
  GetCitiesQuery,
  GetDistrictsDocument,
  GetDistrictsQuery,
  GetQuartersDocument,
  GetQuartersQuery,
  GetUserAddressByIdDocument,
  GetUserAddressByIdQuery,
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByIdDocument,
  GetUserByIdQuery,
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
  UpdateUserByIdDocument,
  UpdateUserByIdMutation,
} from "@/graphql/generated";

export const getQuarters = async (districtId: string) => {
  const { data, loading } = await query<GetQuartersQuery>({
    query: GetQuartersDocument,
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
  const { data, loading } = await query<GetDistrictsQuery>({
    query: GetDistrictsDocument,
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
  const { data, loading } = await query<GetCitiesQuery>({
    query: GetCitiesDocument,
  });

  const { cities } = data;
  return {
    cities: cities,
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

  const { data, loading } = await query<GetUserAddressByIdQuery>({
    query: GetUserAddressByIdDocument,
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
  const userId = id || (await readIdFromCookies());

  if (!userId) return { user: null, loading: false, id: null };

  try {
    const { data, loading } = await query<GetUserByIdQuery>({
      query: GetUserByIdDocument,
      variables: {
        id: userId,
      },
      fetchPolicy: "cache-first",
    });
    const { user_by_pk: user } = data;
    return {
      user: user ?? null,
      loading,
      id: userId,
    };
  } catch (error) {
    return {
      user: null,
      loading: false,
      id: userId,
    };
  }
};

export const getUserByEmail = async (email: string) => {
  if (!email) return { user: null, loading: false, id: null };

  try {
    const { data, loading } = await query<GetUserByEmailQuery>({
      query: GetUserByEmailDocument,
      variables: {
        email,
      },
    });
    const { user } = data;
    return {
      user: user ?? null,
      loading,
      email: email,
    };
  } catch (error) {
    return {
      user: null,
      loading: false,
      email: email,
    };
  }
};

export const registerUser = async (newUser: RegisterMutationVariables) => {
  const {
    data: { register },
  } = await mutate<RegisterMutation>({
    mutation: RegisterDocument,
    variables: {
      ...newUser,
    },
  });
  return register;
};

export const updateUserById = async (
  data: Partial<
    Pick<User, "firstname" | "lastname" | "email" | "id" | "phone" | "picture">
  >
) => {
  const { data: updatedData } = await mutate<UpdateUserByIdMutation>({
    mutation: UpdateUserByIdDocument,
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetUserByIdDocument,
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
  receiver_surname: string;
  receiver_phone: string;
  address_title: string;
}) => {
  const { data: updatedData } = await mutate<CreateNewAddressMutation>({
    mutation: CreateNewAddressDocument,
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetUserByIdDocument,
        variables: {
          id: data.user_id,
        },
      },
    ],
    variables: {
      ...data,
      user_id: data.user_id,
    },
  });

  const { insert_user_address_one: user } = updatedData;

  return {
    user,
  };
};
