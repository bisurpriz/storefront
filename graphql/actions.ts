"use server";

import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { checkExpire } from "./utils/checkExpire";
import { writeIdToCookies } from "@/app/actions";

export const getRefreshFetch = async () => {
  const session = await getSession();

  if (!session) return null;

  const refreshToken = session?.refreshToken;
  const isExpired = checkExpire(session?.idToken);
  if (!isExpired) {
    return session;
  }

  try {
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

    if (data) {
      updateSession({
        ...session,
        idToken: data?.id_token,
        accessToken: data?.access_token,
        refreshToken: data?.refresh_token,
      });
    }

    const user = session?.user;
    const claims = user!["https://hasura.io/jwt/claims"];

    await writeIdToCookies(claims["x-hasura-user-id"]);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
