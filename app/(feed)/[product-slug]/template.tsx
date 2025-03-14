"use client";

import { useEffect, useLayoutEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  // Create a safe version of useLayoutEffect that falls back to useEffect on server
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    // For browsers that don't support instant scroll
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
  }, []);

  return <>{children}</>;
}
