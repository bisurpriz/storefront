import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("access_token")?.value || "";
  if (isPublicPath && token.length > 0) {
    return NextResponse.redirect(new URL("/account", request.nextUrl));
  }

  if (!isPublicPath && !(token.length > 0)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  console.log('middleware', request.nextUrl.pathname);
}

export const config = {
  matcher: ['/account/:path*', "/login", "/register",],
};