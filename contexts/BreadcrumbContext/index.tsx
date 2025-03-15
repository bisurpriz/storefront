"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Breadcrumb = {
  href: string;
  label: string;
};

type BreadcrumbContextType = {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  clearBreadcrumbs: () => void;
};

type BreadcrumbProviderProps = {
  children: ReactNode;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined,
);

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({
  children,
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const pathname = usePathname();

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      clearBreadcrumbs();
    }
  }, [pathname, clearBreadcrumbs]);

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbs, setBreadcrumbs, clearBreadcrumbs }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
