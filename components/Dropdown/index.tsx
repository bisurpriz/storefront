"use client";

import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Children, ReactElement, cloneElement, useState } from "react";
import { useClassname } from "../../hooks/useClassname";
import AnimationExitProvider from "../AnimatePresence/AnimationExitProvider";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  dropdownPlacement = "topLeft",
  isSearchable = false,
  label,
  noOptionsMessage,
  fullWidth = false,
  loading = false,
  className = "",
  children,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    options?.find((option) => option.value === value) || null
  );

  const { toggleClass } = useClassname();

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchValue("");
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
    setSearchValue("");
  });

  const child = children ? (Children.only(children) as ReactElement) : null;

  const childTrigger = child
    ? cloneElement(child!, {
        onClick: () => setIsOpen(!isOpen),
        key: "dropdown-trigger",
      })
    : null;

  return (
    <div
      className={`relative whitespace-nowrap flex items-center ${className} ${
        fullWidth ? "w-full" : ""
      }`}
      ref={ref}
    >
      <input type="hidden" value={selectedOption?.value} id={id} name={id} />

      {!childTrigger ? (
        <button
          type="button"
          className="relative flex items-center justify-start bg-white border-2 rounded-sm px-4 py-3 w-full text-sm font-medium text-gray-700 hover:bg-gray-50  h-full transition-colors duration-300 ring-1 ring-primary focus-within:ring-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          onFocus={(e) =>
            toggleClass("border-primary", e.target as HTMLElement)
          }
          onBlur={(e) => toggleClass("border-primary", e.target as HTMLElement)}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8"
              />
            </svg>
          )}
          {selectedOption ? selectedOption.label : label}
          <svg
            className="h-5 w-5 absolute right-0 top-0 text-gray-400 -translate-x-1/2 translate-y-2/3"
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
      ) : (
        childTrigger
      )}
      <AnimationExitProvider show={isOpen}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={clsx(
            "absolute z-10 rounded-sm shadow-lg bg-white focus:outline-none left-0 mt-2 top-full",
            {
              "w-full": fullWidth,
            }
          )}
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
                  className="block w-full px-4 py-2 text-sm text-gray-700 outline-none border border-transparent focus:border focus:ring-primary focus:border-primary border-gray-300 rounded-sm rounded-b-none"
                  placeholder="Arama yapın"
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
            {options?.filter((option) =>
              typeof option.label === "string"
                ? option.label.toLowerCase().includes(searchValue.toLowerCase())
                : option
                    .searchValue!.toLowerCase()
                    .includes(searchValue.toLowerCase())
            ).length > 0 ? (
              options
                ?.filter((option) =>
                  typeof option.label === "string"
                    ? option.label
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    : option
                        .searchValue!.toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
                .map((option) =>
                  typeof option.label === "string" ? (
                    <button
                      type="button"
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
                  ) : (
                    <div role="menuitem" key={option.value}>
                      {option.label}
                    </div>
                  )
                )
            ) : (
              <p className="block px-4 py-2 text-sm text-gray-700">
                {noOptionsMessage || "Arama sonucu bulunamadı"}
              </p>
            )}
          </div>
        </motion.div>
      </AnimationExitProvider>
    </div>
  );
};

export default Dropdown;
