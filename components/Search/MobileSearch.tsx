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

  useEffect(() => {
    if (open) {
      inputRef.current?.blur();
      window.getSelection()?.removeAllRanges();
    }
  }, [open]);

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
          <SearchInput
            ref={inputRef}
            onClick={() => {
              setOpen(true);
              inputRef.current?.blur();
              window.getSelection()?.removeAllRanges();
              document.body.focus();
            }}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col h-[85vh]">
        <div className="flex-shrink-0 border-b bg-background">
          <DrawerHeader className="px-4">
            {inputVal ? (
              <DrawerTitle>"{inputVal}" için arama sonuçları</DrawerTitle>
            ) : (
              <DrawerTitle>Sonuçlar</DrawerTitle>
            )}
          </DrawerHeader>
          <div className="px-4 pb-4">
            <SearchInput ref={inputRef} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
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
      </DrawerContent>
    </Drawer>
  );
}
