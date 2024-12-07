import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthProvider } from "./common/enums/Auth";
import { registerUser } from "./app/account/actions";
import { login } from "./app/@auth/actions";

const USER_ALREADY_EXIST = "USER_ALREADY_EXIST";
const ID_TOKEN = "id-token";
const CALLBACK = "/social-login/callback?result=success";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === AuthProvider.GOOGLE) {
        const { id, name, email, image } = user;
        const nameArray = name?.split(" ");

        const { body, error } = await registerUser({
          email,
          firstname: nameArray?.slice(0, nameArray.length - 1).join(" "),
          lastname: nameArray?.[nameArray.length - 1],
          picture: image,
          phone: undefined,
          provider: account.provider,
          provider_id: account.providerAccountId,
        });

        console.log("--register-----");
        console.log(body, error, "body, error");

        if (error && error !== USER_ALREADY_EXIST) {
          return false;
        }

        const { id_token } = account;
        const {
          access_token,
          error: errors,
          refresh_token,
        } = await login(
          { email: null, password: null },
          { [ID_TOKEN]: `${id_token}` },
        );

        console.log("--login-----");
        console.log(errors, "errors");

        if (errors) {
          return false;
        } else if (access_token && refresh_token) {
          return true;
        }
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl + CALLBACK;
    },
  },
});
