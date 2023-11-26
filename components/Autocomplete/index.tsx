"use client";

import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
  onSelect?: (selectedValue: string) => void;
  placeholder?: string;
  openOnFocus?: boolean;
  label?: string;
  id?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  fetchSuggestions,
  onSelect,
  placeholder = "",
  openOnFocus = false,
  label,
  id,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(openOnFocus);
  const [term, setTerm] = useState<string>("");
  const searchTerm = useDebounce(term, 600);

  useEffect(() => {
    if (searchTerm === "") return;
    setLoading(true);
    fetchSuggestions(searchTerm)
      .then((suggestions) => {
        setSuggestions(suggestions);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    setIsOpen(openOnFocus || value !== "");
    setTerm(value);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setSuggestions([]);
    onSelect?.(selectedValue);
    setIsOpen(false);
    setTerm("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex !== -1) {
        handleSelect(suggestions[selectedIndex]);
      }
    }
  };

  const handleSuggestionClick = (index: number) => {
    handleSelect(suggestions[index]);
  };

  const handleInputFocus = () => {
    setIsOpen(openOnFocus);
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div className="autocomplete relative" ref={ref}>
      {label && (
        <label
          className={`block text-sm text-gray-500 font-medium`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        id={id}
        name={id}
        className={`block outline-none w-full px-4 py-3 text-gray-700 border rounded-sm focus:ring-primary focus:border-primary-dark shadow-sm focus:ring focus:ring-opacity-50`}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(index)}
              className={`p-2 cursor-pointer ${
                index === selectedIndex ? "bg-gray-200" : ""
              } hover:bg-gray-200`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
