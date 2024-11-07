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
  selectedProduct: GetProductByIdQuery["product"] | null;
}

export const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const haspid = searchParams.has("pid");
  const pid = haspid ? searchParams.get("pid") : null;
  const { data } = useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(
    GetProductByIdDocument,
    {
      skip: !haspid,
      variables: {
        id: pid,
      },
    },
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

export const useProduct = () => useContext(ProductContext);
