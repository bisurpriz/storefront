import { Input } from "@/components/ui/input";
import { useSearchProduct } from "@/contexts/SearchContext";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useRef } from "react";

interface SearchInputProps {
  onClick?: () => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const SearchInput = ({ onClick, className, ref }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    inputVal,
    setInputVal: onChange,
    handleClear: onClear,
    handleKeyDown: onKeyDown,
  } = useSearchProduct();

  return (
    <div className="relative" onClick={onClick}>
      <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={(el) => {
          inputRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        type="search"
        placeholder="Ürün ara"
        className={cn("h-10 w-full pl-8 pr-8", className)}
        value={inputVal}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {inputVal && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

SearchInput.displayName = "SearchInput";
