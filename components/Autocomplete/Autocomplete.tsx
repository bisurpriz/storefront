import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SearchStop from "../Icons/SearchStop";
import Location from "../Icons/Location";
import RemoveSquare from "../Icons/RemoveSquare";
import ChevronDown from "../Icons/ChevronDown";
import Spinner from "../Spinner";
import useResponsive from "@/hooks/useResponsive";

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

  const { isTablet } = useResponsive();

  const likeBottomSheetStyle = isTablet
    ? clsx(
        "fixed",
        "bottom-0",
        "left-0",
        "right-0",
        "bg-white",
        "shadow-lg",
        "rounded-t-lg",
        "p-4",
        "pt-0",
        "z-[1000]",
        "max-h-[50vh]",
        "overflow-y-auto"
      )
    : clsx(
        "absolute",
        "w-full",
        "bg-white",
        "border",
        "border-lime-300",
        "rounded-md",
        "shadow-md",
        "z-10",
        "overflow-y-auto",
        "max-h-60",
        "mt-1"
      );

  const likeBottomSheetAnimation = isTablet
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.2 },
      };

  const suggestionsListComponent = (
    <AnimatePresence>
      {showSuggestions && userInput && (
        <motion.ul
          ref={suggestionsListRef}
          className={likeBottomSheetStyle}
          {...likeBottomSheetAnimation}
        >
          {isTablet && (
            <div
              className={clsx(
                "flex",
                "items-center",
                "justify-between",
                "sticky",
                "top-0",
                "bg-white",
                "py-4"
              )}
            >
              <p className={clsx("text-lg", "font-semibold", "text-lime-500")}>
                Sonuçlar
              </p>
              <button
                onClick={() => setShowSuggestions(false)}
                className={clsx(
                  "text-lime-500",
                  "text-lg",
                  "font-semibold",
                  "hover:text-primary-light"
                )}
              >
                Kapat
              </button>
            </div>
          )}
          {isLoading ? (
            <Spinner className="animate-spin h-5 w-5 inline-block" />
          ) : filteredSuggestions?.length ? (
            filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(suggestion)}
                  ref={index === activeSuggestion ? activeItemRef : null}
                  className={clsx(
                    "p-2",
                    "cursor-pointer",
                    index === activeSuggestion
                      ? "bg-lime-100"
                      : "hover:bg-lime-100",
                    index === filteredSuggestions.length - 1
                      ? "rounded-b-md"
                      : ""
                  )}
                >
                  {renderOptionLabel(suggestion)}
                </li>
              );
            })
          ) : (
            <div
              className={clsx(
                "p-2",
                "flex",
                "items-center",
                "gap-2",
                "text-lime-500"
              )}
            >
              <SearchStop className={clsx("h-5", "w-5", "text-lime-500")} />
              <p className={clsx("text-sm", "font-semibold", "text-lime-500")}>
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
        <Location
          className={clsx(
            "absolute",
            "left-3",
            "top-1/2",
            "transform",
            "-translate-y-1/2",
            "text-lime-500",
            "text-2xl"
          )}
        />
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={userInput}
          placeholder={placeholder}
          className={clsx(
            "w-full",
            "text-base",
            "font-semibold",
            "rounded-md",
            "border",
            "border-lime-300",
            "focus:border-primary-light",
            "outline-none",
            "py-3",
            "px-10",
            "pr-20",
            { "border-2": selectedValue },
            "text-slate-600",
            "truncate"
          )}
        />
        <div
          className={clsx(
            "absolute",
            "right-3",
            "top-1/2",
            "transform",
            "-translate-y-1/2",
            "flex",
            "gap-2"
          )}
        >
          {selectedValue && (
            <button
              onClick={() => {
                setUserInput("");
                setSelectedValue(null);
                onClear?.();
              }}
            >
              <RemoveSquare className="text-2xl text-lime-500" />
            </button>
          )}
          <button
            className={clsx(
              "rotate-0",
              "transform",
              "transition-transform",
              "duration-200",
              "ease-in-out",
              showSuggestions ? "rotate-180" : "",
              "text-lime-500"
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
