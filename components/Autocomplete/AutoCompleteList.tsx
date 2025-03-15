import { SearchX } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AutoCompleteOption } from ".";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

function OptionList({
  options,
  onChange,
  getOptionLabel,
  onInputChange,
  inputValue,
}: {
  options: AutoCompleteOption[];
  onChange: (value: AutoCompleteOption) => void;
  getOptionLabel?: (option: any) => string;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}) {
  const [list, setList] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setList(options);
  }, [options]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Ara..."
        value={inputValue}
        ref={inputRef}
        onValueChange={(val) => {
          onInputChange?.(val);
          setList(
            options.filter(
              (option) =>
                typeof option.label === "string" &&
                option.label.toLowerCase().includes(val.toLowerCase()),
            ),
          );
        }}
      />
      <CommandList>
        <CommandEmpty className="flex w-full items-center gap-1 p-4 pb-3">
          <SearchX size={24} />
          <p className="text-sm text-gray-500">
            Arama yaparak sonuçları filtreleyebilirsiniz.
          </p>
        </CommandEmpty>
        <CommandGroup>
          {list.map((option) => (
            <CommandItem
              key={option.value}
              value={option?.value?.toString()}
              onSelect={(value) => {
                const selectedOption = options.find(
                  (option) => option.value?.toString() === value,
                );
                onChange(selectedOption);
              }}
            >
              {getOptionLabel ? getOptionLabel(option) : option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default OptionList;
