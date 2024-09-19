"use server";

import { mutate } from "@/graphql/lib/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CookieTokens } from "./contants";
import {
  LoginMutationDocument,
  LoginMutationMutation,
  LoginMutationMutationVariables,
} from "@/graphql/queries/auth/login/login.generated";
import { redirect } from "next/navigation";

export const decodeToken = async (token: string) => {
  return jwt.decode(token);
};

export const login = async ({ email, password }, headers = {}) => {
  const guest_id = cookies().get(CookieTokens.GUEST_ID)?.value;

  const response = await mutate<
    LoginMutationMutation,
    LoginMutationMutationVariables
  >({
    mutation: LoginMutationDocument,
    variables: {
      email,
      password,
    },
    context: {
      headers: {
        ...headers,
        "x-hasura-guest-id": guest_id,
      },
    },
  });

  if (response.data.login.access_token && response.data.login.refresh_token) {
    const decodedToken = await decodeToken(response.data.login.access_token);
    const user = {
      id: decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
    };

    if (guest_id) {
      cookies().delete(CookieTokens.GUEST_ID);
    }

    cookies().set(CookieTokens.ACCESS_TOKEN, response.data.login.access_token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    cookies().set(
      CookieTokens.REFRESH_TOKEN,
      response.data.login.refresh_token,
      {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    );
    cookies().set(CookieTokens.USER_ID, user.id, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }
  return response;
};

export const logout = async () => {
  cookies().delete(CookieTokens.ACCESS_TOKEN);
  cookies().delete(CookieTokens.REFRESH_TOKEN);
  cookies().delete(CookieTokens.USER_ID);

  redirect("/");
};
