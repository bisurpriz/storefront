"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { gtmPageView } from "../GoogleTagManager/gtm/gtmPageView";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url =
    searchParams.toString() === ""
      ? pathname
      : `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    gtmPageView(url);
  }, [pathname, searchParams]);

  return null;
}
