"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { Loader2, MapPin, MapPinnedIcon, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export interface IPlace {
  label: string;
  placeId: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

export type PlacesAutocompleteProps = {
  placeholder?: string;
  dontChangeCookie?: boolean;
  onSelect?: (prediction?: IPlace | null) => void;
  defaultValue?: IPlace;
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

export default function PlacesAutocomplete({
  placeholder,
  dontChangeCookie,
  onSelect,
  defaultValue,
}: PlacesAutocompleteProps) {
  const [input, setInput] = useState(defaultValue?.label ?? "");
  const [predictions, setPredictions] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { refresh } = useRouter();
  const debouncedInput = useDebounce(input, 300);

  const getLocation = useCallback(async (query: string) => {
    if (!query.trim() || !hasInteracted) return;
    
    const response = await fetch(`/api/google/places?query=${query}`, {
      next: { tags: ["google-places"] },
    });
    return await response.json();
  }, [hasInteracted]);

  useEffect(() => {
    if (!debouncedInput || !hasInteracted) {
      setPredictions([]);
      return;
    }

    startTransition(async () => {
      try {
        const data = await getLocation(debouncedInput);
        if (data?.status === "OK") {
          setPredictions(data.predictions);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Location fetch error:", error);
      }
    });
  }, [debouncedInput, getLocation]);

  useEffect(() => {
    if (!dontChangeCookie) {
      const hasLocation = parseJson(Cookies.get(CookieTokens.LOCATION_ID)!);
      if (hasLocation) {
        setInput(hasLocation.label);
        setHasInteracted(false);
      }
    }
  }, [dontChangeCookie]);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setActiveIndex(-1);
    setHasInteracted(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setHasInteracted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prev => 
          prev < predictions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSelect(predictions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const geocodeByPlaceId = useCallback(async (placeId: string) => {
    try {
      const response = await fetch(`/api/google/geocode?placeId=${placeId}`);
      if (!response.ok) throw new Error("Geocode isteği başarısız oldu.");
      return await response.json();
    } catch (error) {
      console.error("Geocode error:", error);
    }
  }, []);

  const handleSelect = useCallback(async (prediction: any) => {
    setInput(prediction.description);
    setIsOpen(false);
    setActiveIndex(-1);

    if (prediction.place_id) {
      const results = await geocodeByPlaceId(prediction.place_id);
      if (results?.[0]) {
        const { address_components } = results[0];
        const placeData = {
          address_components,
          placeId: prediction.place_id,
          label: prediction.description,
        } as IPlace;

        onSelect?.(placeData);

        if (!dontChangeCookie) {
          Cookies.set(CookieTokens.LOCATION_ID, JSON.stringify(placeData));
          refresh();
        }
      }
    }
  }, [dontChangeCookie, geocodeByPlaceId, onSelect, refresh]);

  const handleClear = useCallback(() => {
    setInput("");
    setPredictions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect?.(null);
    
    if (!dontChangeCookie) {
      Cookies.remove(CookieTokens.LOCATION_ID);
      refresh();
    }
  }, [dontChangeCookie, onSelect, refresh]);

  return (
    <div className="relative w-full" ref={ref}>
      <div className="relative">
        <Input
          icon={
            <MapPinnedIcon
              className={cn("h-5 w-5 text-gray-400 transition-colors", {
                "text-white": input,
              })}
            />
          }
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          autoFocus={false}
          placeholder={placeholder ?? "Gönderim adresi girin"}
          aria-label="Yer ara"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="predictions-list"
          className={cn(
            "h-auto w-full border-none bg-background p-4 pr-8 font-medium transition-all",
            "focus:ring-2 focus:ring-primary/20",
            { 
              "bg-primary pr-10 text-white placeholder:text-white/70": input,
              "ring-2 ring-primary/20": isFocused
            }
          )}
        />
        {isPending && (
          <Loader2
            className={cn(
              "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin",
              { "text-white": input, "text-gray-400": !input }
            )}
          />
        )}
        {input && !isPending && (
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0",
              { "text-white hover:text-white/80": input }
            )}
            onClick={handleClear}
          >
            <SquareX className="h-4 w-4" />
          </Button>
        )}
        <div
          className={cn(
            "absolute -inset-[2px] -z-10 rounded-md transition-opacity",
            "bg-gradient-to-bl from-primary via-secondary to-tertiary",
            { 
              "opacity-100": input || isFocused,
              "opacity-70": !input && !isFocused 
            }
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && predictions.length > 0 && (
          <motion.ul
            id="predictions-list"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-10 mt-2 w-full space-y-1 rounded-md border bg-white p-2",
              "shadow-lg ring-1 ring-black/5",
              "max-h-[300px] overflow-auto scrollbar-thin scrollbar-track-transparent",
              "scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
            )}
          >
            {predictions.map((prediction: any, index: number) => (
              <motion.li
                key={prediction.place_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.03,
                  duration: 0.15 
                }}
                className={cn(
                  "cursor-pointer rounded-md transition-colors",
                  { "bg-primary/10": activeIndex === index }
                )}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 px-3 py-2 text-left",
                    "hover:bg-primary/5 active:bg-primary/10",
                    "transition-colors duration-150"
                  )}
                  onClick={() => handleSelect(prediction)}
                >
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-medium line-clamp-1">
                      {prediction.structured_formatting.main_text}
                    </span>
                    <span className="text-sm text-gray-500 line-clamp-1">
                      {prediction.structured_formatting.secondary_text}
                    </span>
                  </div>
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const parseJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
