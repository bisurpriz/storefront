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
        const guest_id = uuidv4();
        Cookies.set(CookieTokens.GUEST_ID, guest_id, {
          // 1 yıl
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          sameSite: "strict",
          httpOnly: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
        });
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
