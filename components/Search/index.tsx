import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const Search: React.FC<Props> = ({ options, value, onChange, onSubmit }) => {
  const handlClassToggle = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ) => {
    const htmlElement = e.target.parentNode as HTMLElement;

    htmlElement.classList.toggle("border-primary");
  };

  return (
    <div
      className="flex items-center border-2 rounded-md max-w-xl w-full max-md:hidden h-[50px] ring-1 ring-primary-light focus-within:ring-primary-light transition-colors duration-300"
      role="listbox"
    >
      <select
        className="px-4 py-2 bg-white border-none rounded-l-md focus:outline-none h-ful text-sm cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => handlClassToggle(e)}
        onBlur={(e) => handlClassToggle(e)}
        role="list"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} role="listitem">
            {option.label}
          </option>
        ))}
      </select>
      <input
        className="w-full px-4 py-2 bg-white rounded-r-md focus:outline-none max-w-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-full text-sm"
        type="text"
        placeholder="Search"
        onFocus={(e) => handlClassToggle(e)}
        onBlur={(e) => handlClassToggle(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
    </div>
  );
};

export default Search;
