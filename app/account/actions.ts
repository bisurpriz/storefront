"use server";
import { User } from "@/common/types/User/user";
import { mutate, query } from "@/graphql/lib/client";

import { readIdFromCookies } from "../actions";
import {
  CreateNewAddressDocument,
  CreateNewAddressMutation,
  CreateNewAddressMutationVariables,
  GetCitiesDocument,
  GetCitiesQuery,
  GetCitiesQueryVariables,
  GetDistrictForProductDocument,
  GetDistrictForProductQuery,
  GetDistrictForProductQueryVariables,
  GetDistrictsDocument,
  GetDistrictsQuery,
  GetDistrictsQueryVariables,
  GetQuartersDocument,
  GetQuartersForProductDocument,
  GetQuartersForProductQuery,
  GetQuartersForProductQueryVariables,
  GetQuartersQuery,
  GetQuartersQueryVariables,
  GetUserAddressByIdDocument,
  GetUserAddressByIdQuery,
  GetUserAddressByIdQueryVariables,
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  GetUserByIdDocument,
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
  UpdateUserByIdDocument,
  UpdateUserByIdMutation,
  UpdateUserByIdMutationVariables,
} from "@/graphql/queries/account/account.generated";
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "@/graphql/queries/auth/register/register.generated";

import {
  GetProductDeliveryCitiesDocument,
  GetProductDeliveryCitiesQuery,
  GetProductDeliveryCitiesQueryVariables,
} from "@/graphql/queries/products/getProductLocation.generated";

export const getQuarters = async (districtId: string) => {
  const { data, loading } = await query<
    GetQuartersQuery,
    GetQuartersQueryVariables
  >({
    query: GetQuartersDocument,
    variables: {
      districtId: Number(districtId),
    },
  });

  const { quarters } = data;

  return {
    quarters,
    loading,
  };
};

export const getDiscrits = async (cityId: string) => {
  const { data, loading } = await query<
    GetDistrictsQuery,
    GetDistrictsQueryVariables
  >({
    query: GetDistrictsDocument,
    variables: {
      cityId: Number(cityId),
    },
  });

  const { districts } = data;

  return {
    districts,
    loading,
  };
};

export const getAvailableDistrictsForProduct = async (
  pid: number,
  cityId: number
) => {
  const { data, loading } = await query<
    GetDistrictForProductQuery,
    GetDistrictForProductQueryVariables
  >({
    query: GetDistrictForProductDocument,
    variables: {
      pid: pid,
      cityId: cityId,
    },
  });

  const { district } = data;

  return {
    district,
    loading,
  };
};

export const getAvailableQuartersForProduct = async (
  pid: number,
  districtId: number
) => {
  const { data, loading } = await query<
    GetQuartersForProductQuery,
    GetQuartersForProductQueryVariables
  >({
    query: GetQuartersForProductDocument,
    variables: {
      pid: pid,
      districtId: districtId,
    },
  });

  const { quarter } = data;

  return {
    quarter,
    loading,
  };
};

export const getCities = async () => {
  const { data, loading } = await query<
    GetCitiesQuery,
    GetCitiesQueryVariables
  >({
    query: GetCitiesDocument,
  });

  const { cities } = data;
  return {
    cities: cities,
    loading,
    error: null,
  };
};

export const getUserAddressById = async (id: string) => {
  return await query<GetUserAddressByIdQuery, GetUserAddressByIdQueryVariables>(
    {
      query: GetUserAddressByIdDocument,
      variables: {
        id,
      },
    }
  );
};

export const getUserById = async (id?: string) => {
  const userId = id || (await readIdFromCookies());

  if (!userId) return { user: null, loading: false, id: null };

  try {
    const { data, loading } = await query<
      GetUserByIdQuery,
      GetUserByIdQueryVariables
    >({
      query: GetUserByIdDocument,
      variables: {
        id: userId,
      },
    });
    const { user_by_pk: user } = data;
    return {
      user: user ?? null,
      loading,
      id: userId,
    };
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email: string) => {
  if (!email) return { user: null, loading: false, id: null };

  try {
    const { data, loading } = await query<
      GetUserByEmailQuery,
      GetUserByEmailQueryVariables
    >({
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
  } = await mutate<RegisterMutation, RegisterMutationVariables>({
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
  const { data: updatedData } = await mutate<
    UpdateUserByIdMutation,
    UpdateUserByIdMutationVariables
  >({
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

export const createNewUserAddress = async (
  data: CreateNewAddressMutationVariables
) => {
  const { data: updatedData } = await mutate<
    CreateNewAddressMutation,
    CreateNewAddressMutationVariables
  >({
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
