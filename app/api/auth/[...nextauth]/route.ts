import { login } from "@/app/@auth/actions";
import { registerUser } from "@/app/account/actions";
import { AuthProvider } from "@/common/enums/Auth";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const CALLBACK = "/social-login/callback?result=success";
const ID_TOKEN = "id_token";

const USER_ALREADY_EXIST = "USER_ALREADY_EXIST";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
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

        if (error && error !== USER_ALREADY_EXIST) {
          return false;
        }

        const { id_token } = account;
        const loginResponse = await login(
          { email: null, password: null },
          { [ID_TOKEN]: `${id_token}` }
        );

        if (loginResponse.data.login.error) {
          console.log("error", loginResponse.data.login.error);
          return false;
        } else if (
          loginResponse.data.login.access_token &&
          loginResponse.data.login.refresh_token
        ) {
          return true;
        }
      }
    },
    async redirect() {
      return CALLBACK;
    },
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
