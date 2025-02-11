import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { registerUser } from "./app/(account)/account/actions";
import { login } from "./app/@auth/actions";
import { AuthProvider } from "./common/enums/Auth";

const USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
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
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === AuthProvider.GOOGLE) {
        const { id, name, email, image } = user;
        const nameArray = name?.split(" ");

        const { data } = await registerUser({
          email,
          firstname: nameArray?.slice(0, nameArray.length - 1).join(" "),
          lastname: nameArray?.[nameArray.length - 1],
          picture: image,
          phone: undefined,
          provider: account.provider,
          provider_id: account.providerAccountId,
        });

        if (data?.error && data.error !== USER_ALREADY_EXISTS) {
          return false;
        }

        const { id_token } = account;
        const {
          data: { access_token, refresh_token, error },
        } = await login(
          { email: null, password: null },
          { [ID_TOKEN]: `${id_token}` },
        );

        if (error) {
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
