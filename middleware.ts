import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export async function middleware(request: NextRequest) {
  const hasUserId = request.cookies.has("user_id");
  const hasFingerPrint = request.cookies.has("fingerPrint");

  const session = await getSession();
  const response = NextResponse.next();
  if (session?.user) {
    const userId =
      session.user["https://hasura.io/jwt/claims"]["x-hasura-user-id"];

    if (!hasUserId) {
      response.cookies.set("user_id", userId, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return response;
  }

  if (!session && !hasFingerPrint) {

    const id = uuid();

    response.cookies.set("fingerPrint", id, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  if (hasUserId && hasFingerPrint) {
    response.cookies.delete("fingerPrint");
  }

  return response;
}
