import { breakpoints } from "@/contants/breakpoints";
import { useCallback, useEffect, useMemo, useState } from "react";

const useResponsive = () => {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
  }, []);

  const handleResize = useCallback(() => {
    requestAnimationFrame(() => {
      setWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const debouncedResize = () => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 100);
      };
    };

    const resizeListener = debouncedResize();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [handleResize, mounted]);

  const breakpointValues = useMemo(
    () => ({
      isSmallMobile: width < breakpoints.xs,
      isMobile: width < breakpoints.sm,
      isTablet: width < breakpoints.md,
      isDesktop: width < breakpoints.lg,
      isLargeDesktop: width < breakpoints.xl,
      isExtraLargeDesktop: width < breakpoints["2xl"],
    }),
    [width],
  );

  // Sunucu tarafında veya ilk mount'ta varsayılan değerleri döndür
  if (!mounted) {
    return {
      isSmallMobile: false,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      isExtraLargeDesktop: false,
    };
  }

  return breakpointValues;
};

export default useResponsive;
