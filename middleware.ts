import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export default authMiddleware({
  publicRoutes: (req) => !req.url.includes("/account"),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

/* function handleFingerPrint() {
  const hasUserId = request.cookies.has("user_id");
  const hasFingerPrint = request.cookies.has("fingerPrint");

  if (!hasUserId && !hasFingerPrint) {
    console.log("No user id or finger print");

    const id = uuid();

    response.cookies.set("fingerPrint", id, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  if (hasUserId && hasFingerPrint) {
    console.log("Has user id and finger print");
    response.cookies.delete("fingerPrint");
  }

} */
