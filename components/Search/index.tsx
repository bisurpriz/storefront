"use client";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import Button from "../Button";
import TextField from "../TextField";

const Search = () => {
  const ref = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    ref.current?.focus();
  };

  return (
    <div className="relative max-w-xl w-full mx-auto">
      <TextField
        type="text"
        className=""
        placeholder="Çiçek, hediye, süprizler..."
        ref={ref}
      />
      <Button
        className={
          "!absolute !top-0 !right-0  !text-white !h-full !rounded-l-none"
        }
        onFocus={handleFocus}
        variant="fullfilled"
      >
        <BsSearch />
      </Button>
    </div>
  );
};

export default Search;
