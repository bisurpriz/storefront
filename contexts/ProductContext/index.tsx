"use client";

import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ProductContextType {
  product: GetProductByIdQuery["product"];
  setProduct: Dispatch<SetStateAction<GetProductByIdQuery["product"]>>;
}

export const ProductContext = createContext<ProductContextType>({
  product: null,
  setProduct: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<GetProductByIdQuery["product"]>(null);
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
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
