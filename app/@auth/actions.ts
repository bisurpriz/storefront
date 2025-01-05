"use server";

import { LoginMutationMutation } from "@/graphql/queries/auth/login/login.generated";
import { LoginMutationDocument } from "@/service/account";
import { BonnmarseApi } from "@/service/fetch";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookieTokens } from "./contants";

export const decodeToken = async (token: string) => {
  return jwt.decode(token);
};

export const login = async ({ email, password }, headers = {}) => {
  const cook = await cookies();
  const guest_id = cook.get(CookieTokens.GUEST_ID)?.value;

  const { login } = await BonnmarseApi.request<LoginMutationMutation>({
    query: LoginMutationDocument,
    variables: {
      email,
      password,
    },
    additionalHeaders: headers,
    withAuth: false,
    tags: ["login"],
  });

  if (login?.data.access_token && login?.data.refresh_token) {
    const decodedToken = await decodeToken(login.data.access_token);
    const user = {
      id: decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
    };

    if (guest_id) {
      cook.delete(CookieTokens.GUEST_ID);
    }

    const cookieData = {
      access_token: login.data.access_token,
      refresh_token: login.data.refresh_token,
      user_id: user.id,
    };

    Object.entries(cookieData).forEach(([key, value]) => {
      cook.set(key, value, {
        domain:
          process.env.NODE_ENV === "production"
            ? ".bonnmarse.com"
            : "localhost",
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60,
      });
    });
  }
  return login;
};

export const logout = async () => {
  const cookie = await cookies();

  cookie.delete(CookieTokens.ACCESS_TOKEN);
  cookie.delete(CookieTokens.REFRESH_TOKEN);
  cookie.delete(CookieTokens.USER_ID);

  redirect("/");
};
