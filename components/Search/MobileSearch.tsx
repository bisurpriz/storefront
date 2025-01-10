import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchProduct } from "@/contexts/SearchContext";
import { Category, Product } from "@/graphql/generated-types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../Layout/Header/SearchInput";
import { SearchResults } from "../Layout/Header/SearchResult";

interface MobileSearchProps {
  products: Product[];
  onSelect: (result: any) => void;
  categories: Category[];
  featuredProducts: Product[];
}

export function MobileSearch({
  products,
  onSelect,
  categories,
  featuredProducts,
}: MobileSearchProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { inputVal } = useSearchProduct();

  const search = searchParams.get("search");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full">
        <SearchInput ref={inputRef} className="border-0" />
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full">
          <SearchInput ref={inputRef} onClick={() => setOpen(true)} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          {inputVal ? (
            <DrawerTitle>"{inputVal}" için arama sonuçları</DrawerTitle>
          ) : (
            <DrawerTitle>Sonuçlar</DrawerTitle>
          )}
        </DrawerHeader>
        <div className="px-4 py-2">
          <SearchInput ref={inputRef} />
          <div className="mt-4">
            <SearchResults
              featuredProducts={featuredProducts}
              categories={categories}
              products={products}
              onSelect={(result) => {
                onSelect(result);
                setOpen(false);
              }}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
