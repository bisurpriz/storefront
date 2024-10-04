import { FormEvent, FormEventHandler, useState } from "react";
import { AutoCompleteOption } from ".";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandGroup,
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

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Filter option..."
        value={inputValue}
        onValueChange={(val) => {
          onInputChange?.(val);
          setList(
            options.filter(
              (option) =>
                typeof option.label === "string" &&
                option.label.toLowerCase().includes(val.toLowerCase())
            )
          );
        }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {list.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value.toString()}
              onSelect={(value) => {
                onChange(
                  list.find((option) => option.value.toString() === value) ||
                    null
                );
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
