import { NextResponse } from "next/server";
import { CookieTokens } from "./app/@auth/contants";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get(CookieTokens.ACCESS_TOKEN)?.value || "";
  
  // Add PostHog headers for server-side identification
  // This will be used by PostHog to identify users across requests
  const response = isPublicPath && token.length > 0
    ? NextResponse.redirect(new URL("/account", request.nextUrl))
    : !isPublicPath && !(token.length > 0)
      ? NextResponse.redirect(new URL("/login", request.nextUrl))
      : NextResponse.next();
  
  // If we have a token, add it to the response headers for PostHog
  if (token) {
    // Add a header that our client-side code can use to identify the user
    response.headers.set('x-user-authenticated', 'true');
  } else {
    // For guest users, we can generate a guest ID if needed
    // This is handled client-side in our PostHog implementation
    response.headers.set('x-user-authenticated', 'false');
  }
  
  return response;
}

export const config = {
  matcher: ["/account/:path*", "/login", "/register"],
};
