"use client";

import { GetProductByIdQuery } from "@/graphql/queries/products/getProductById.generated";
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
