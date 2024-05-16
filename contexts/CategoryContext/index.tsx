"use client";

import { GetCategoriesQuery } from "@/graphql/generated";
import { ReactNode, createContext, useContext, useMemo } from "react";

interface CategoryContextType {
  category: GetCategoriesQuery["category"];
}

export const CategoryContext = createContext<CategoryContextType>({
  category: null,
});

export const CategoryProvider = ({
  children,
  category,
}: {
  children: ReactNode;
  category: GetCategoriesQuery["category"];
}) => {
  const memoized = useMemo(() => ({ category }), [category]);

  return (
    <CategoryContext.Provider value={memoized}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
