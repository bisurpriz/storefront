"use server";

import { LoginMutationDocument } from "@/graphql/generated";
import { mutate } from "@/graphql/lib/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CookieTokens } from "./contants";

export const login = async ({ email, password }) => {
  const response = await mutate({
    mutation: LoginMutationDocument,
    variables: {
      email,
      password,
    },
  });

  if (response.data.login.access_token && response.data.login.refresh_token) {
    const decodedToken = await jwt.decode(response.data.login.access_token);
    const user = {
      id: decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
    };

    cookies().set(CookieTokens.ACCESS_TOKEN, response.data.login.access_token);
    cookies().set(
      CookieTokens.REFRESH_TOKEN,
      response.data.login.refresh_token
    );
    cookies().set(CookieTokens.USER_ID, user.id);
  }

  return response;
};

export const logout = async () => {
  cookies().delete(CookieTokens.ACCESS_TOKEN);
  cookies().delete(CookieTokens.REFRESH_TOKEN);
  cookies().delete(CookieTokens.USER_ID);

  return true;
};
