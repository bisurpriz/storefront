"use client";

import { searchProductsv1 } from "@/app/(feed)/actions";
import { Category, Product } from "@/graphql/generated-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
  categories: Category[];
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
  categories: null,
});

export const SearchProductProvider = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: Category[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const startProgress = useProgress();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = "";
        document.body.style.height = "";
      }
    };

    handleScroll();

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const handleSearch = useCallback((input: string) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSearchProducts(input);
    }, 300);
  }, []);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setInputVal(search);
      setInputVal("");
      setProducts([]);
      setIsOpen(false);
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    handleSearch(inputVal);
  }, [inputVal, handleSearch]);

  const handleSearchProducts = useCallback((input: string) => {
    startTransition(async () => {
      if (!input) {
        setProducts([]);
        searchProductsv1({}, {});
        return;
      }
      const response = await searchProductsv1({ q: input });
      setProducts(response.hits.map((hit) => hit.document) as Product[]);
    });
  }, []);

  const getUniqueSearches = useCallback((searches: string[]) => {
    return searches.filter(
      (search, index, self) => self.indexOf(search) === index,
    );
  }, []);

  const pushToSearch = useCallback(() => {
    if (!inputVal) return;

    startTransition(() => {
      startProgress();
      setInputVal("");
      setProducts([]);
      setIsOpen(false);
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );

      const newSearches = getUniqueSearches([
        inputVal,
        ...recentSearches,
      ]).slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(newSearches));

      push(`/arama?search=${inputVal}`);
    });
  }, [inputVal, push, getUniqueSearches, startProgress]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        pushToSearch();
      }
    },
    [pushToSearch],
  );

  const handleClear = useCallback(() => {
    startTransition(() => {
      startProgress();
      setInputVal("");
      setProducts([]);
      setIsOpen(false);
      push("/");
    });
  }, [push, startProgress]);

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
        categories,
      }}
    >
      {children}
    </SearchProductContext.Provider>
  );
};

export const useSearchProduct = () => useContext(SearchProductContext);
