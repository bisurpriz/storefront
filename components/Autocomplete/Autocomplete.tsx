import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SearchStop from "../Icons/SearchStop";
import Location from "../Icons/Location";
import RemoveSquare from "../Icons/RemoveSquare";
import ChevronDown from "../Icons/ChevronDown";
import Spinner from "../Spinner";

interface AutocompleteProps {
  suggestions: (input: string) => Promise<any[]>;
  onChange?: (value: { inputValue: string; selectedValue: any }) => void;
  getOptionLabel?: (option: any) => string;
  onClear?: () => void;
  placeholder?: string;
  value?: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  onChange,
  getOptionLabel,
  onClear,
  placeholder,
  value,
}) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value || "");
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const fetchSuggestions = async (input: string) => {
    if (input.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      const results = await suggestions(input);
      setFilteredSuggestions(results);
      setShowSuggestions(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUserInput(value);
    setSelectedValue(null);

    if (onChange) {
      onChange({ inputValue: value, selectedValue: null });
    }

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500);
  };

  const handleClick = (suggestion: any) => {
    const value = getOptionLabel ? getOptionLabel(suggestion) : suggestion;
    setUserInput(value);
    setSelectedValue(suggestion);
    setShowSuggestions(false);

    if (onChange) {
      onChange({ inputValue: value, selectedValue: suggestion });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      const value = getOptionLabel
        ? getOptionLabel(filteredSuggestions[activeSuggestion])
        : filteredSuggestions[activeSuggestion];
      setUserInput(value);
      setSelectedValue(filteredSuggestions[activeSuggestion]);
      if (onChange) {
        onChange({
          inputValue: value,
          selectedValue: filteredSuggestions[activeSuggestion],
        });
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.key === "ArrowDown") {
      if (activeSuggestion + 1 === filteredSuggestions?.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const moveActiveSuggestions = () => {
    if (activeItemRef.current && suggestionsListRef.current) {
      const activeElement = activeItemRef.current;
      const listElement = suggestionsListRef.current;

      const activeTop = activeElement.offsetTop;
      const activeBottom = activeElement.offsetTop + activeElement.offsetHeight;

      const listScrollTop = listElement.scrollTop;
      const listHeight = listElement.clientHeight;

      if (activeTop < listScrollTop) {
        listElement.scrollTop = activeTop;
      } else if (activeBottom > listScrollTop + listHeight) {
        listElement.scrollTop = activeBottom - listHeight;
      }
    }
  };

  useEffect(() => {
    moveActiveSuggestions();
  }, [activeSuggestion]);

  const renderOptionLabel = (option: any) => {
    if (getOptionLabel) {
      return getOptionLabel(option);
    }
    return option;
  };

  const suggestionsListComponent = (
    <AnimatePresence>
      {showSuggestions && userInput && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "absolute w-full mt-1 max-h-60 overflow-y-auto z-10 font-mono",
            "bg-white border border-gray-300 rounded-lg shadow-md",
            "transition-all duration-200 ease-in-out py-1"
          )}
          ref={suggestionsListRef}
        >
          {isLoading ? (
            <div className="p-2 flex items-center justify-center">
              <Spinner className="animate-spin h-5 w-5 mr-3 inline-block" />
            </div>
          ) : filteredSuggestions?.length ? (
            filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  className={clsx(
                    "p-2 cursor-pointer",
                    "transition duration-200 ease-in-out text-base font-thin",
                    {
                      "bg-primary text-white": activeSuggestion === index,
                    },
                    {
                      "hover:bg-4 hover:text-white": activeSuggestion !== index,
                    }
                  )}
                  key={index}
                  onClick={() => handleClick(suggestion)}
                  ref={index === activeSuggestion ? activeItemRef : null}
                >
                  {renderOptionLabel(suggestion)}
                </li>
              );
            })
          ) : (
            <div
              className={clsx(
                "p-2 flex items-center justify-center text-gray-500 text-base gap-2"
              )}
            >
              <SearchStop className="text-2xl" />
              <p className="m-0">
                &quot;{userInput}&quot; aramasına uygun mahalle bulunamadı.
              </p>
            </div>
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="w-full text-xs">
        <div
          className={clsx(
            "absolute top-1/2 left-2 -translate-y-1/2",
            "text-gray-500",
            "transition duration-200 ease-in-out",
            { "animate-pulse": isLoading },
            {
              "text-white": selectedValue,
            },
            {
              "hover:text-gray-700": !selectedValue,
            }
          )}
        >
          <Location className="text-2xl" />
        </div>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={userInput}
          className={clsx(
            "w-full p-3 pl-10 pr-16 border rounded-lg shadow-sm shadow-gray-100 cursor-pointer text-lg font-normal font-manrope",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "placeholder:opacity-50 placeholder-gray-700 placeholder:text-lg",
            {
              "border border-2 text-white border-primary bg-primary":
                selectedValue,
            }
          )}
          placeholder={placeholder}
        />
        <div
          className={clsx(
            "absolute top-1/2 right-2 flex items-center gap-2 -translate-y-1/2"
          )}
        >
          {selectedValue && (
            <button
              className={clsx(
                "text-gray-500 ",
                {
                  "text-white": selectedValue,
                },
                {
                  "hover:text-gray-700": !selectedValue,
                }
              )}
              onClick={() => {
                setUserInput("");
                setSelectedValue(null);
                onClear?.();
              }}
            >
              <RemoveSquare className="text-2xl" />
            </button>
          )}
          <button
            className={clsx(
              "text-gray-500 ",
              {
                "text-white": selectedValue,
              },
              {
                "hover:text-gray-700": !selectedValue,
              },
              { "transform rotate-180": showSuggestions }
            )}
          >
            <ChevronDown className="text-2xl" />
          </button>
        </div>
      </div>
      {suggestionsListComponent}
    </div>
  );
};

export default Autocomplete;
