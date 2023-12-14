"use-client";
import { destructClaims } from "@/utils/getClaims";
import { getSession } from "@auth0/nextjs-auth0";
import { useEffect } from "react";

export const useClaims = () => {
  let claims = {
    id: null,
    role: null,
    allowedRoles: null,
    fullName: null,
  };

  const setUser = async () => {
    const { user } = await getSession();
    if (user) {
      claims = destructClaims(user);
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  return { claims };
};
