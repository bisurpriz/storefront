"use client";

import { useSearchProduct } from "@/contexts/SearchContext";
import { Product } from "@/graphql/generated-types";
import useResponsive from "@/hooks/useResponsive";
import { getProductDetailUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DesktopSearch } from "./DesktopSearch";
import { MobileSearch } from "./MobileSearch";

export function Search() {
  const { isMobile } = useResponsive();

  const { handleSearchProducts, products, setIsOpen, categories } =
    useSearchProduct();
  const { push } = useRouter();

  const handleSelect = (result: Product) => {
    push(
      getProductDetailUrl(
        result.product_categories[0].category.slug,
        result.slug,
        result.id,
      ),
    );
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <MobileSearch
        categories={categories}
        products={products}
        onSelect={handleSelect}
        featuredProducts={[]}
      />
    );
  }

  return (
    <DesktopSearch
      categories={categories}
      products={products}
      onSelect={handleSelect}
      featuredProducts={[]}
    />
  );
}
