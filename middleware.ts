import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";

async function middleware(request: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();
  const session = await getSession(request, res);
  const user = session?.user;
  const claims = user!["https://hasura.io/jwt/claims"];
  res.cookies.set("user_id", claims["x-hasura-user-id"]);
  return res;
}

export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: ["/account/:path*"],
};
