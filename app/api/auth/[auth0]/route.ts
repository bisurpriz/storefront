import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";

export const GET = handleAuth({
  onError: (err, req, res) => {
    notFound();
  },
  login: handleLogin({
    authorizationParams: {
      scope: "openid profile email offline_access",
      prompt: "login",
    },
  }),
});
