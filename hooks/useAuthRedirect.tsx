import { useCallback, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const useAuthRedirect = ({ lazy }: { lazy: boolean }) => {
  const { user } = useUser();

  const handleRedirect = useCallback(
    (callback?: () => void) => {
      if (!user) {
        window.location.href = '/api/auth/login';
        return;
      }
      if (callback) callback();
    },
    [user, lazy]
  );

  useEffect(() => {
    if (!lazy) handleRedirect();
  }, []);

  return { handleRedirect };
};

export default useAuthRedirect;
