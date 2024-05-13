import { useEffect } from "react";

export const useLockScroll = ({ bool }: { bool: boolean }) => {
  useEffect(() => {
    if (bool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [bool]);

  return null;
};
