import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

async function middleware(request: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();

  return res;
}

export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: ["/account/:path*"],
};
