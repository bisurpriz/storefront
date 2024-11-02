import { NextResponse } from "next/server";
import { CookieTokens } from "./app/@auth/contants";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get(CookieTokens.ACCESS_TOKEN)?.value || "";

  if (isPublicPath && token.length > 0) {
    return NextResponse.redirect(new URL("/account", request.nextUrl));
  }

  if (!isPublicPath && !(token.length > 0)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/account/:path*", "/login", "/register"],
};
