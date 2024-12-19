"use client";

import { useSearchProduct } from "@/contexts/SearchContext";
import { Product } from "@/graphql/generated-types";
import useResponsive from "@/hooks/useResponsive";
import { getProductDetailUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import * as React from "react";
import { DesktopSearch } from "./DesktopSearch";
import { MobileSearch } from "./MobileSearch";

export function Search() {
  const { isMobile } = useResponsive();

  const {
    handleSearchProducts,
    products,
    loading,
    inputVal,
    setInputVal,
    isOpen,
    setIsOpen,
    handleKeyDown,
    pushToSearch,
    handleClear,
    setProducts,
  } = useSearchProduct();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchTimeout, setSearchTimeout] = React.useState<any>();
  const { push } = useRouter();
  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        handleSearchProducts(value);
      }, 300),
    );
  };

  const handleSelect = (result: Product) => {
    push(
      getProductDetailUrl(
        result.product_categories[0].category.slug,
        result.slug,
        result.id,
      ),
    );
    setIsOpen(false);
    setSearchValue("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    handleSearchProducts(suggestion);
  };

  if (isMobile) {
    return (
      <MobileSearch
        products={products}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSelect={handleSelect}
      />
    );
  }

  return (
    <DesktopSearch
      products={products}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onSelect={handleSelect}
    />
  );
}
