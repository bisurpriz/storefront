import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Product } from "@/graphql/generated-types";
import * as React from "react";
import { SearchInput } from "../Layout/Header/SearchInput";
import { SearchResults } from "../Layout/Header/SearchResult";

interface MobileSearchProps {
  products: Product[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelect: (result: any) => void;
}

export function MobileSearch({
  products,
  searchValue,
  onSearchChange,
  onSelect,
}: MobileSearchProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full">
          <SearchInput
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
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          {searchValue ? (
            <DrawerTitle>"{searchValue}" için arama sonuçları</DrawerTitle>
          ) : (
            <DrawerTitle>Sonuçlar</DrawerTitle>
          )}
        </DrawerHeader>
        <div className="px-4 py-2">
          <SearchInput
            ref={inputRef}
            value={searchValue}
            onChange={onSearchChange}
            onClear={() => {
              onSearchChange("");
              setOpen(false);
            }}
          />
          <div className="mt-4">
            <SearchResults
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
