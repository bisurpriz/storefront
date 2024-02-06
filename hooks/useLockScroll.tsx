import { useEffect } from 'react';

export const useLockScroll = ({ bool }: { bool: boolean }) => {
  useEffect(() => {
    if (bool) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [bool]);

  return null;
};
