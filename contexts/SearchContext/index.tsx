"use client";

import { searchProductsv1 } from "@/app/(feed)/actions";
import { Product } from "@/graphql/generated-types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useProgress } from "react-transition-progress";

interface SearchProductContextType {
  products: Product[];
  handleSearchProducts: (input: string) => void;
  loading: boolean;
  inputVal: string;
  setInputVal: (inputVal: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClear: () => void;
  handleKeyDown: (event: any) => void;
  pushToSearch: () => void;
  setProducts: (products: Product[]) => void;
}

export const SearchProductContext = createContext<SearchProductContextType>({
  products: null,
  handleSearchProducts: async () => {},
  loading: false,
  inputVal: "",
  isOpen: false,
  setIsOpen: () => {},
  handleClear: () => {},
  handleKeyDown: () => {},
  pushToSearch: () => {},
  setInputVal: () => {},
  setProducts: () => {},
});

export const SearchProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const startProgress = useProgress();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setInputVal(search);
    }
  }, [searchParams]);

  const handleSearchProducts = (input) => {
    startTransition(async () => {
      if (!input) {
        setProducts([]);
        searchProductsv1({}, {});
        return;
      }
      const response = await searchProductsv1({ q: input });
      setProducts(response.hits.map((hit) => hit.document) as Product[]);
    });
  };

  const pushToSearch = () => {
    if (!inputVal) return;

    startTransition(() => {
      startProgress();
      setInputVal("");
      setProducts([]);
      setIsOpen(false);
      push(`/?search=${inputVal}`);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      pushToSearch();
    }
  };

  const handleClear = () => {
    startTransition(() => {
      startProgress();
      setInputVal("");
      setProducts([]);
      setIsOpen(false);
      push("/");
    });
  };

  return (
    <SearchProductContext.Provider
      value={{
        products,
        handleSearchProducts,
        loading: isPending,
        inputVal,
        isOpen,
        setIsOpen,
        handleClear,
        handleKeyDown,
        pushToSearch,
        setInputVal,
        setProducts,
      }}
    >
      {children}
    </SearchProductContext.Provider>
  );
};

export const useSearchProduct = () => useContext(SearchProductContext);
