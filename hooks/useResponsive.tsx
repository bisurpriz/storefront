import { breakpoints } from "@/contants/breakpoints";
import { useEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState<number>(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallMobile = width > breakpoints.xs;
  const isMobile = width > breakpoints.sm;
  const isTablet = width > breakpoints.md;
  const isDesktop = width > breakpoints.lg;
  const isLargeDesktop = width > breakpoints.xl;
  const isExtraLargeDesktop = width > breakpoints["2xl"];

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
    isSmallMobile,
  };
};

export default useResponsive;
