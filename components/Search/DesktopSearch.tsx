import { Product } from "@/graphql/generated-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";
import { SearchInput } from "../Layout/Header/SearchInput";
import { SearchResults } from "../Layout/Header/SearchResult";

interface DesktopSearchProps {
  products: Product[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelect: (result: any) => void;
}

export function DesktopSearch({
  products,
  searchValue,
  onSearchChange,
  onSelect,
}: DesktopSearchProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <SearchInput
        ref={inputRef}
        value={searchValue}
        onChange={(value) => {
          onSearchChange(value);
          setOpen(true);
        }}
        onClear={() => {
          onSearchChange("");
          setOpen(false);
        }}
        onClick={() => setOpen(true)}
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
