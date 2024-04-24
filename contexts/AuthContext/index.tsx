"use client";

import { GetUserByIdQuery } from "@/graphql/generated";
import { ReactNode, createContext, useContext, useMemo } from "react";

type AuthUser = GetUserByIdQuery["user_by_pk"];

interface AuthContextType {
  user: AuthUser | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: AuthUser;
}) => {
  const memoized = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
