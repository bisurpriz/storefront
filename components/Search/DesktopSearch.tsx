import { Category, Product } from "@/graphql/generated-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";
import { SearchInput } from "../Layout/Header/SearchInput";
import { SearchResults } from "../Layout/Header/SearchResult";

interface DesktopSearchProps {
  products: Product[];
  categories: Category[];
  onSelect: (result: any) => void;
  featuredProducts: Product[];
}

export function DesktopSearch({
  products,
  categories,
  onSelect,
  featuredProducts,
}: DesktopSearchProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    setOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <SearchInput
        onClick={() => setOpen(true)}
        className={cn({ "border-0 ring-2 ring-primary": open })}
      />
      <AnimationExitProvider show={open}>
        <motion.div
          className={cn(
            "absolute w-full rounded-lg bg-white shadow-lg",
            "border border-primary",
            "z-10",
            "ring-2 ring-primary",
          )}
          initial={{ y: 40 }}
          animate={{ y: 10 }}
          exit={{ y: 40 }}
          transition={{ duration: 0.2 }}
        >
          <SearchResults
            featuredProducts={[]}
            categories={categories}
            products={products}
            onSelect={(result) => {
              onSelect(result);
              setOpen(false);
            }}
          />
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
}
