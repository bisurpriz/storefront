import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  onError: (err, req, res) => {
    console.log("onError", err, req, res);
  },
});
