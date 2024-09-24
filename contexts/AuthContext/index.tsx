"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import { uuidv4 } from "@/utils/uuidv4";
import {
  GetUserAddressByIdQuery,
  GetUserByIdQuery,
} from "@/graphql/queries/account/account.generated";
import { getUserAddressById } from "@/app/account/actions";
import { setClientCookie } from "@/utils/getCookie";

interface AuthContextType {
  user: GetUserByIdQuery["user_by_pk"] | null;
  userAddresses: GetUserAddressByIdQuery["user_by_pk"]["user_addresses"];
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userAddresses: [],
});

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: GetUserByIdQuery["user_by_pk"];
}) => {
  const [userAddresses, setUserAddresses] = useState<
    GetUserAddressByIdQuery["user_by_pk"]["user_addresses"]
  >([]);

  useEffect(() => {
    if (!user) {
      if (!Cookies.get(CookieTokens.GUEST_ID)) {
        console.log("Creating guest id");
        const guest_id = uuidv4();
        setClientCookie(CookieTokens.GUEST_ID, guest_id, {
          httpOnly: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        console.log("Guest id created", guest_id);
      }
    } else {
      Cookies.remove(CookieTokens.GUEST_ID);

      getUserAddressById(user.id)
        .then(
          ({
            data: {
              user_by_pk: { user_addresses },
            },
          }) => {
            setUserAddresses(user_addresses);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userAddresses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
