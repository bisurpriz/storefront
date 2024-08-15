"use client";

import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

interface ProductContextType {
  selectedProduct: GetProductByIdQuery["product"];
}

export const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const { data } = useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(
    GetProductByIdDocument,
    {
      skip: !searchParams.has("id"),
      variables: {
        id: searchParams.get("id"),
      },
    }
  );

  return (
    <ProductContext.Provider
      value={{
        selectedProduct: data?.product,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useCategory = () => useContext(ProductContext);
