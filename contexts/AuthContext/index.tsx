"use client";

import { User } from "next-auth";
import { ReactNode, createContext, useContext, useMemo } from "react";

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  const memoized = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
