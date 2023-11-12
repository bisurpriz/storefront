import {
  Session,
  handleAuth,
  handleCallback,
  handleLogin,
} from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

const afterCallback = (req: NextRequest, session: Session) => {
  console.table(session);

  return session;
};

export const GET = handleAuth({
  onError: (err, req, res) => {
    console.log(err, req, res);
    notFound();
  },
  login: handleLogin({
    authorizationParams: {
      scope: "openid profile email offline_access",
      prompt: "login",
    },
  }),
  callback: handleCallback({
    afterCallback,
  }),
});
