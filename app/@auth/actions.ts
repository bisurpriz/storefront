"use server";

import { LoginMutationDocument } from "@/graphql/generated";
import { mutate } from "@/graphql/lib/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CookieTokens } from "./contants";

export const decodeToken = async (token: string) => {
  return jwt.decode(token);
};

export const login = async ({ email, password }, headers = {}) => {
  const response = await mutate({
    mutation: LoginMutationDocument,
    variables: {
      email,
      password,
    },
    context: {
      headers: {
        ...headers,
      },
    },
  });

  if (response.data.login.access_token && response.data.login.refresh_token) {
    const decodedToken = await decodeToken(response.data.login.access_token);
    const user = {
      id: decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
    };

    cookies().set(CookieTokens.ACCESS_TOKEN, response.data.login.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    cookies().set(
      CookieTokens.REFRESH_TOKEN,
      response.data.login.refresh_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
    );
    cookies().set(CookieTokens.USER_ID, user.id, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
  return response;
};

export const logout = async () => {
  cookies().delete(CookieTokens.ACCESS_TOKEN);
  cookies().delete(CookieTokens.REFRESH_TOKEN);
  cookies().delete(CookieTokens.USER_ID);

  return true;
};
