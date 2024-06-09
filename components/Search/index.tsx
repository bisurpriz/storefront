"use client";

import { FC, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import TextField from "../TextField";
import clsx from "clsx";

type Props = {
  className?: string;
};

const Search: FC<Props> = ({ className }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    ref.current?.focus();
  };

  return (
    <div
      className={clsx("relative max-w-xl w-full mx-auto", {
        [className]: className,
      })}
    >
      <TextField
        type="text"
        className=""
        placeholder="Çiçek, hediye, süprizler..."
        ref={ref}
      />
      <button
        className={clsx(
          "absolute right-0 top-0 h-full bg-primary text-white rounded-r-lg py-2 px-10",
          "flex items-center justify-center outline-none",
          "hover:bg-primary-light  focus:ring-2 focus:ring-primary-light focus:ring-opacity-50",
          "transition-all duration-300 group"
        )}
        onFocus={handleFocus}
      >
        <BsSearch className="group-hover:animate-bounce text-lg" />
      </button>
    </div>
  );
};

export default Search;
