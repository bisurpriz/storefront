"use client";

import { GetMainCategoriesQuery } from "@/graphql/generated";
import { ReactNode, createContext, useContext, useMemo } from "react";

interface CategoryContextType {
  category: GetMainCategoriesQuery["category"];
}

export const CategoryContext = createContext<CategoryContextType>({
  category: null,
});

export const CategoryProvider = ({
  children,
  category,
}: {
  children: ReactNode;
  category: GetMainCategoriesQuery["category"];
}) => {
  const memoized = useMemo(() => ({ category }), [category]);

  return (
    <CategoryContext.Provider value={memoized}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
