"use client";

import { ReactNode, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import { uuidv4 } from "@/utils/uuidv4";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";

interface AuthContextType {
  user: GetUserByIdQuery["user_by_pk"] | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: GetUserByIdQuery["user_by_pk"];
}) => {
  useEffect(() => {
    if (!user) {
      if (!Cookies.get(CookieTokens.GUEST_ID)) {
        const guest_id = uuidv4();
        Cookies.set(CookieTokens.GUEST_ID, guest_id);
      }
    } else {
      Cookies.remove(CookieTokens.GUEST_ID);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
