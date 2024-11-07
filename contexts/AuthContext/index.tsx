"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { uuidv4 } from "@/utils/uuidv4";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import { setClientCookie } from "@/utils/getCookie";
import { checkExpire } from "@/graphql/utils/checkExpire";
import { useRouter } from "next/navigation";
import { CookieTokens } from "@/app/@auth/contants";

interface AuthContextType {
  user: GetUserByIdQuery["user_by_pk"] | null;
  userAddresses: any;
}

const initialAuthContext: AuthContextType = {
  user: null,
  userAddresses: [],
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: GetUserByIdQuery["user_by_pk"];
}) => {
  const [userAddresses, setUserAddresses] = useState<any>([]);
  const { refresh } = useRouter();

  useEffect(() => {
    handleUserAuthentication();
  }, [user]);

  const handleUserAuthentication = async () => {
    if (isUserSessionExpired(user)) {
      handleGuestUser();
    } else {
      await handleAuthenticatedUser(user);
    }
  };

  const isUserSessionExpired = (user: GetUserByIdQuery["user_by_pk"]) => {
    return !user || checkExpire(Cookies.get(CookieTokens.ACCESS_TOKEN));
  };

  const handleGuestUser = () => {
    const guestId = Cookies.get(CookieTokens.GUEST_ID);
    if (!guestId) {
      Cookies.set(CookieTokens.GUEST_ID, uuidv4());
    }
    setClientCookie(CookieTokens.USER_ID, null);

    resetUserSession();
  };

  const resetUserSession = () => {
    setUserAddresses([]);
    Cookies.remove(CookieTokens.USER_ID);
    Cookies.remove(CookieTokens.ACCESS_TOKEN);
    Cookies.remove(CookieTokens.REFRESH_TOKEN);
  };

  const handleAuthenticatedUser = async (
    user: GetUserByIdQuery["user_by_pk"],
  ) => {
    try {
      Cookies.remove(CookieTokens.GUEST_ID);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userAddresses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
