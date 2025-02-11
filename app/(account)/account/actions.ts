"use server";
import { User } from "@/common/types/User/user";

import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  UpdateUserByIdMutation,
} from "@/graphql/queries/account/account.generated";
import {
  RegisterMutation,
  RegisterMutationVariables,
} from "@/graphql/queries/auth/register/register.generated";
import { BonnmarseApi } from "@/service/fetch";
import {
  GetUserByEmailDocument,
  GetUserByIdDocument,
  RegisterDocument,
  UpdateUserByIdDocument,
} from "@/service/user";
import { revalidateTag } from "next/cache";
import { readIdFromCookies } from "../../actions";

export const getUserById = async (id?: string) => {
  const userId = id || (await readIdFromCookies());

  if (!userId) return { user: null, loading: false, id: null };

  try {
    const { user_by_pk: user } = await BonnmarseApi.request<GetUserByIdQuery>({
      query: GetUserByIdDocument,
      variables: {
        id: userId,
      },
      tags: ["getUserById"],
      withAuth: true,
    });
    return {
      user: user ?? null,
      id: userId,
    };
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email: string) => {
  if (!email) return { user: null, loading: false, id: null };

  try {
    const { user } = await BonnmarseApi.request<GetUserByEmailQuery>({
      query: GetUserByEmailDocument,
      variables: {
        email,
      },
      tags: ["getUserByEmail"],
      withAuth: false,
    });
    return {
      user: user ?? null,
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
  const { register } = await BonnmarseApi.request<RegisterMutation>({
    query: RegisterDocument,
    variables: {
      ...newUser,
    },
    tags: ["registerUser"],
    withAuth: false,
  });
  return register;
};

export const updateUserById = async (
  data: Partial<
    Pick<User, "firstname" | "lastname" | "email" | "id" | "phone" | "picture">
  >,
) => {
  const { update_user_by_pk: user } =
    await BonnmarseApi.request<UpdateUserByIdMutation>({
      query: UpdateUserByIdDocument,
      variables: {
        ...data,
        id: data.id,
      },
      tags: ["updateUserById"],
      withAuth: true,
    });

  if (user) {
    revalidateTag("getUserById");
  }

  return {
    user,
  };
};
