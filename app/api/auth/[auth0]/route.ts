"use server";

import {
  Session,
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

const afterCallback = async (req: NextRequest, session: Session) => {
  if (session.user) {
    const cks = cookies();

    cks.set(
      "user_id",
      session.user["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
    );

    return session;
  }

  return session;
};

export const GET = handleAuth({
  onError: (err, req, res) => {
    notFound();
  },
  login: handleLogin({
    authorizationParams: {
      scope: "openid profile email offline_access",
      prompt: "login",
    },
  }),
  logout: async (req) => {
    // remove cookies user_id
    const cks = cookies();

    cks.delete("user_id");

    return handleLogout(req);
  },
  callback: async (req: any, res: any) => {
    try {
      return await handleCallback(req, res, {
        afterCallback,
      });
    } catch (error) {
      console.error(error);
    }
  },
});
