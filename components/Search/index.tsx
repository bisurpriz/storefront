"use client";

import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export interface SearchInputProps {
  onSearch?: (query: string) => void;
  fullWidth?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, fullWidth }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isFullWidth = fullWidth ? "w-full" : "";

  return (
    <div className={`relative flex items-center ${isFullWidth}`}>
      <input
        name="search"
        id="search"
        type="text"
        placeholder="Arama yap..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="block outline-none w-full pr-14 text-base py-2 pl-4 text-gray-700 border rounded-sm focus:ring-primary focus:border-primary-dark shadow-sm focus:ring focus:ring-opacity-50 flex-1"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 p-2 px-4 text-white focus:outline-none origin-center bg-primary h-full rounded-r-sm"
      >
        <BsSearch size={20} className="transform transition hover:scale-110" />
      </button>
    </div>
  );
};

export default SearchInput;
