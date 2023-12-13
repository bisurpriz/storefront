import { breakpoints } from "@/contants/breakpoints";
import { useCallback, useEffect, useMemo, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState<number>(0);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const isMobile = useMemo(() => width < breakpoints.sm, [width]);
  const isTablet = useMemo(() => width < breakpoints.md, [width]);
  const isDesktop = useMemo(() => width < breakpoints.lg, [width]);
  const isLargeDesktop = useMemo(() => width < breakpoints.xl, [width]);
  const isExtraLargeDesktop = useMemo(
    () => width < breakpoints["2xl"],
    [width]
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
  };
};

export default useResponsive;
