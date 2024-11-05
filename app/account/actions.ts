"use server";
import { User } from "@/common/types/User/user";
import { mutate, query } from "@/graphql/lib/client";

import { readIdFromCookies } from "../actions";
import {
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
