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
    <div className='relative w-full'>
      <TextField
        type='text'
        className='!w-full !h-10 !pl-4 !pr-10 !text-sm !rounded-full'
        placeholder='Çiçek, hediye, süprizler...'
        ref={ref}
      />
      <Button
        className='!absolute !top-0 !right-0 !w-10 !h-10 !mt-0 !mr-0 !rounded-full !p-0 !justify-center z-0'
        onFocus={handleFocus}
      >
        <BsSearch />
      </Button>
    </div>
  );
};

export default Search;
