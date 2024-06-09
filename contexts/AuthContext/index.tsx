"use client";

import { GetUserByIdQuery } from "@/graphql/generated";
import { ReactNode, createContext, useContext, useMemo } from "react";

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
  const memoized = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
