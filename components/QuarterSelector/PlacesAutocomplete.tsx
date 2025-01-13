"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { PredictionsList } from "./PredictionsList";
import { SearchInput } from "./SearchInput";
import { IPlace, PlacesAutocompleteProps } from "./types";

// Global event bus için custom event
const LOCATION_CHANGE_EVENT = "locationChange";

// Cookie değişikliğini yayınlayan fonksiyon
export const publishLocationChange = (locationData: any) => {
  window.dispatchEvent(
    new CustomEvent(LOCATION_CHANGE_EVENT, {
      detail: locationData,
    }),
  );
};

// Location değişikliklerini dinleyen hook
const useLocationChange = (callback: (locationData: any) => void) => {
  useEffect(() => {
    // İlk değeri al
    const currentLocation = Cookies.get(CookieTokens.LOCATION_ID);
    if (currentLocation) {
      try {
        callback(JSON.parse(currentLocation));
      } catch (error) {
        console.error("Cookie parse error:", error);
      }
    }

    // Event listener ekle
    const handleLocationChange = (event: CustomEvent) => {
      callback(event.detail);
    };

    window.addEventListener(
      LOCATION_CHANGE_EVENT,
      handleLocationChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        LOCATION_CHANGE_EVENT,
        handleLocationChange as EventListener,
      );
    };
  }, [callback]);
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
  const [isGeocoding, startGeocoding] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(true);
  const ignoreNextChange = useRef(false);

  const { refresh } = useRouter();

  // Location değişikliklerini dinle
  useLocationChange(
    useCallback((locationData) => {
      if (ignoreNextChange.current) {
        ignoreNextChange.current = false;
        return;
      }
      setInput(locationData.label);
      setHasInteracted(false);
    }, []),
  );

  const debouncedInput = useDebounce(input, 300);

  const getLocation = useCallback(
    async (query: string) => {
      if (!query.trim() || !hasInteracted) return;

      const response = await fetch(`/api/google/places?query=${query}`, {
        next: { tags: ["google-places"] },
      });
      return await response.json();
    },
    [hasInteracted],
  );

  useEffect(() => {
    if (!debouncedInput || !hasInteracted || !shouldSearch) {
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
        console.error(
          "Adres arama işlemi başarısız oldu. Lütfen tekrar deneyiniz.",
          error,
        );
      }
    });
  }, [debouncedInput, getLocation, hasInteracted, shouldSearch]);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setActiveIndex(-1);
    setHasInteracted(true);
    setShouldSearch(true);
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
        setActiveIndex((prev) =>
          prev < predictions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
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
      const response = await fetch(`/api/google/geocode?placeId=${placeId}`, {
        next: { tags: ["google-geocode"] },
      });
      if (!response.ok)
        throw new Error(
          "Adres bilgisi alınamadı. Lütfen daha sonra tekrar deneyiniz.",
        );
      return await response.json();
    } catch (error) {
      console.error("Adres doğrulama işlemi başarısız oldu:", error);
    }
  }, []);

  const handleSelect = useCallback(
    async (prediction: any) => {
      setShouldSearch(false);
      setInput(prediction.description);
      setIsOpen(false);
      setActiveIndex(-1);
      if (prediction.place_id) {
        startGeocoding(async () => {
          const results = await geocodeByPlaceId(prediction.place_id);
          if (results?.[0]) {
            let hasDistrict;
            if (
              results[0].address_components.findIndex((component) =>
                component.types.includes("administrative_area_level_2"),
              ) === -1
            ) {
              hasDistrict = prediction.description
                .split(",")?.[2]
                ?.split("/")?.[0]
                ?.trim();
            }

            const { address_components } = results[0];

            const placeData = {
              address_components: [
                ...address_components,
                hasDistrict && {
                  long_name: hasDistrict,
                  short_name: hasDistrict,
                  types: ["administrative_area_level_2"],
                },
              ],
              placeId: prediction.place_id,
              label: prediction.description,
            } as IPlace;

            onSelect?.(placeData);

            if (!dontChangeCookie) {
              ignoreNextChange.current = true;
              Cookies.set(CookieTokens.LOCATION_ID, JSON.stringify(placeData));
              publishLocationChange(placeData);
              refresh();
            }
          }
        });
      }
    },
    [dontChangeCookie, geocodeByPlaceId, onSelect, refresh],
  );

  const handleClear = useCallback(() => {
    setInput("");
    setPredictions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    setShouldSearch(true);
    onSelect?.(null);

    if (!dontChangeCookie) {
      Cookies.remove(CookieTokens.LOCATION_ID);
      refresh();
    }
  }, [dontChangeCookie, onSelect, refresh]);

  return (
    <div className="relative w-full" ref={ref}>
      <SearchInput
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onClear={handleClear}
        placeholder={placeholder}
        isLoading={isPending}
        isFocused={isFocused}
        isGeocoding={isGeocoding}
      />
      <PredictionsList
        predictions={predictions}
        isOpen={isOpen}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />
    </div>
  );
}
