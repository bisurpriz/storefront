"use server";

import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { checkExpire } from "./utils/checkExpire";

export const getRefreshFetch = async () => {
  const session = await getSession();
  const refreshToken = session?.refreshToken;
  const isExpired = checkExpire(session.idToken);
  if (!isExpired) {
    return session;
  }

  // POST request to `/oauth/token` with `refreshToken` in the body
  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
    }
  );

  const data = await response.json();

  updateSession({
    ...session,
    idToken: data.id_token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });

  return data;
};
