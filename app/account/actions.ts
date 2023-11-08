"use server";

import { getClient } from "@/graphql/lib/client";
import {
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "@/graphql/queries/account/getUserById";

export const getUserById = async (id: string) => {
  const client = getClient();
  const { data, loading } = await client.query({
    query: GET_USER_BY_ID,
    variables: {
      id,
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
