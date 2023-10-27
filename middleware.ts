import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  // set Cookies for RSC to work from Auth0 to apollo client
  // firstly, get the token from Auth0
}
