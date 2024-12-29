"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const [breadcrumbs, setBreadcrumbsState] = useState<Breadcrumb[]>([]);
  const pathname = usePathname();

  const setBreadcrumbs = useCallback((newBreadcrumbs: Breadcrumb[]) => {
    setBreadcrumbsState(newBreadcrumbs);
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbsState([]);
  }, []);

  useEffect(() => {
    clearBreadcrumbs();
  }, [pathname, clearBreadcrumbs]);

  const contextValue = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
      clearBreadcrumbs,
    }),
    [breadcrumbs, setBreadcrumbs, clearBreadcrumbs],
  );

  return (
    <BreadcrumbContext.Provider value={contextValue}>
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
