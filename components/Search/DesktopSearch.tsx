import { Category, Product } from "@/graphql/generated-types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
  }, [mounted]);

  if (!mounted) {
    return (
      <div ref={containerRef} className="relative">
        <SearchInput className="border-0" />
      </div>
    );
  }

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
            "max-h-[calc(100vh-10rem)] overflow-y-auto",
          )}
          initial={{ y: 40 }}
          animate={{ y: 10 }}
          exit={{ y: 40 }}
          transition={{ duration: 0.2 }}
        >
          <SearchResults
            featuredProducts={featuredProducts}
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
