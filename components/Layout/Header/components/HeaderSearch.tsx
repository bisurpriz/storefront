"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Clock, Search, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Örnek veriler (gerçek uygulamada bu veriler API'den gelecektir)
const popularCategories = ["Çiçekler", "Hediyeler", "Pastalar", "Bitkiler"];
const sampleProducts = [
  "Kırmızı Güller",
  "Doğum Günü Pastası",
  "Orkide",
  "Çikolata Kutusu",
];

export default function HeaderSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const saveSearch = (term: string) => {
    const updatedSearches = [
      term,
      ...recentSearches.filter((s) => s !== term),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearch = (term: string) => {
    if (term.trim()) {
      saveSearch(term.trim());
      setIsOpen(false);
      // Implement actual search logic here
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const SearchContent = () => (
    <Command value={searchTerm} onValueChange={setSearchTerm}>
      <CommandInput placeholder="Ara..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        {searchTerm && (
          <CommandGroup heading="Öneriler">
            {sampleProducts
              .filter((product) =>
                product.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((product) => (
                <CommandItem
                  key={product}
                  onSelect={() => handleSearch(product)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {product}
                </CommandItem>
              ))}
          </CommandGroup>
        )}
        <CommandGroup heading="Popüler Kategoriler">
          {popularCategories.map((category) => (
            <CommandItem key={category} onSelect={() => handleSearch(category)}>
              {category}
            </CommandItem>
          ))}
        </CommandGroup>
        {recentSearches.length > 0 && (
          <CommandGroup heading="Son Aramalar">
            {recentSearches.map((term) => (
              <CommandItem key={term} onSelect={() => handleSearch(term)}>
                <Clock className="mr-2 h-4 w-4" />
                {term}
              </CommandItem>
            ))}
            <CommandItem
              onSelect={clearRecentSearches}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Arama Geçmişini Temizle
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );

  return (
    <div className="relative mx-auto max-w-2xl flex-grow">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Search className="h-4 w-4" />
              <span className="sr-only">Ara</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="w-full pt-14">
            <div className="flex flex-col space-y-4">
              <Input
                type="search"
                placeholder="Ürün, kategori veya marka ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <SearchContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="relative hidden md:block">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Ürün, kategori veya marka ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
                className={cn(
                  "h-12 w-full rounded-lg border-2 border-primary bg-tertiary/10 py-3 pl-12 pr-16 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                  {
                    "border-primary ring-2 ring-primary/20": isOpen,
                  },
                )}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                size={20}
              />
              {searchTerm && (
                <X
                  size={18}
                  className="absolute right-14 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[calc(100vw-2rem)] p-0 sm:w-[550px]"
            align="start"
          >
            <SearchContent />
          </PopoverContent>
        </Popover>
      )}
      <Button
        type="button"
        onClick={() => handleSearch(searchTerm)}
        className="absolute right-0 top-0 hidden h-full rounded-l-none rounded-r-lg bg-primary px-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:block"
      >
        Ara
      </Button>
    </div>
  );
}
