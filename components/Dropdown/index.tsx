import { useClassname } from "@/hooks/useClassname";
import { useClickAway } from "@uidotdev/usehooks";
import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  dropdownPlacement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight";
  isSearchable?: boolean;
  label?: string;
  noOptionsMessage?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  dropdownPlacement = "topLeft",
  isSearchable = false,
  label,
  noOptionsMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.value === value) || null
  );

  const { toggleClass } = useClassname();

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
    setSearchValue("");
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
    setSearchValue("");
  });

  const placementClases = {
    bottomLeft: "origin-top-left left-0 mt-2",
    bottomRight: "origin-top-right right-0 mt-2",
    topLeft: "origin-bottom-left left-0 mb-2",
    topRight: "origin-bottom-right right-0 mb-2",
  };

  return (
    <div className="relative h-[50px]">
      <button
        type="button"
        className="flex items-center justify-center bg-white border-2 rounded-md  py-2 px-4  w-full text-sm font-medium text-gray-700 hover:bg-gray-50  h-full"
        onClick={() => setIsOpen(!isOpen)}
        onFocus={(e) => toggleClass("border-primary", e.target as HTMLElement)}
        onBlur={(e) => toggleClass("border-primary", e.target as HTMLElement)}
      >
        {selectedOption ? selectedOption.label : label}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.707 14.293a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={ref}
          className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-primary ring-opacity-5
            ${placementClases[dropdownPlacement]}
          `}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {isSearchable && (
              <div className="relative">
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-sm text-gray-700"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    x-description="Heroicon name: solid/search"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      x-description="Search icon"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 3a6 6 0 100 12 6 6 0 000-12zM7.707 9.293a1 1 0 00-1.414-1.414l-2 2a1 1 0 101.414 1.414l2-2z"
                    />
                  </svg>
                </div>
              </div>
            )}
            {options.filter((option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase())
            ).length > 0 ? (
              options
                .filter((option) =>
                  option.label.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((option) => (
                  <button
                    key={option.value}
                    className={`${
                      option.value === value
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm w-full text-left`}
                    role="menuitem"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </button>
                ))
            ) : (
              <p className="block px-4 py-2 text-sm text-gray-700">
                {noOptionsMessage || "No option found"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
