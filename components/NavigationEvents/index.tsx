"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { gtmPageView } from "../GoogleTagManager/gtm/gtmPageView";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = useMemo(() => {
    if (searchParams.toString() === "") {
      return pathname;
    }
    return `${pathname}?${searchParams.toString()}`;
  }, [pathname, searchParams]);

  useEffect(() => {
    gtmPageView(url);
  }, [pathname, searchParams]);

  return null;
}
