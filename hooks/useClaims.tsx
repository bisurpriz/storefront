import { destructClaims } from '@/utils/getClaims';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export const useClaims = () => {
  const [claims, setClaims] = useState({
    id: null,
    role: null,
    allowedRoles: null,
    fullName: null,
  });
  const { user } = useUser();

  const setUser = () => {
    if (user) {
      const claims = destructClaims(user);
      setClaims(claims);
    }
  };

  useEffect(() => {
    setUser();
  }, [user]);

  return { claims };
};
