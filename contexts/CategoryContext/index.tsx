"use client";

import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { ReactNode, createContext, useContext } from "react";

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
  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
