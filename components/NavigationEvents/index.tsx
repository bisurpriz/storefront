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
    console.log("NavigationEvents", pathname, searchParams.toString());
    gtmPageView(url);
  }, [pathname, searchParams]);

  return null;
}
