"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useClickAway } from "@uidotdev/usehooks";
import Cookies from "js-cookie";
import { Loader2, MapPinnedIcon, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
declare global {
  interface Window {
    google: any;
  }
}

const parseJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

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

export default function PlacesAutocomplete({
  placeholder,
  dontChangeCookie,
  onSelect,
  defaultValue,
}: PlacesAutocompleteProps) {
  const [input, setInput] = useState(defaultValue?.label ?? "");
  const [predictions, setPredictions] = useState([]);
  const [isPending, startTransition] = useTransition();

  const fetchTimeout = useRef<NodeJS.Timeout | null>(null);
  const { refresh } = useRouter();

  const getLocation = async (query: string) => {
    const response = await fetch(`/api/google/places?query=${query}`, {
      next: {
        tags: ["google-places"],
      },
    });

    return await response.json();
  };

  useEffect(() => {
    startTransition(() => {
      if (dontChangeCookie) return;
      const hasLocation = parseJson(Cookies.get(CookieTokens.LOCATION_ID)!);
      if (hasLocation) {
        setInput(hasLocation.label);
      }
    });
  }, []);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);

    if (e.target.value === "") {
      setPredictions([]);
      return;
    }

    fetchTimeout.current = setTimeout(() => {
      startTransition(() => {
        getLocation(e.target.value).then((data: any) => {
          if (data.status === "OK") {
            setPredictions(data.predictions);
          }
        });
      });
    }, 300);
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    setPredictions([]);
  });

  const geocodeByPlaceId = async (placeId: string) => {
    try {
      const response = await fetch(`/api/google/geocode?placeId=${placeId}`);
      if (!response.ok) {
        throw new Error("Geocode isteği başarısız oldu.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Hata:", error);
    }
  };

  const handleSelect = (prediction: any) => {
    setInput(prediction.description);
    setPredictions([]);

    if (prediction.place_id) {
      geocodeByPlaceId(prediction.place_id).then((results: any) => {
        const geoData = results[0];
        const { address_components } = geoData;
        onSelect?.({
          address_components,
          placeId: prediction.place_id,
          label: prediction.description,
        } as IPlace);

        if (dontChangeCookie) return;

        Cookies.set(
          CookieTokens.LOCATION_ID,
          JSON.stringify({
            address_components,
            placeId: prediction.place_id,
            label: prediction.description,
          }),
        );
        refresh();
      });
    } else {
      if (dontChangeCookie) return;
      Cookies.remove(CookieTokens.LOCATION_ID);
      refresh();
    }
  };

  const handleClear = () => {
    setInput("");
    setPredictions([]);
    onSelect?.(null);
    if (dontChangeCookie) return;
    Cookies.remove(CookieTokens.LOCATION_ID);
    refresh();
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div className="relative">
        <Input
          icon={
            <MapPinnedIcon
              className={cn("w-full text-gray-400", {
                "text-white": input,
              })}
            />
          }
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder ?? "Gönderim adresi girin"}
          aria-label="Yer ara"
          aria-autocomplete="list"
          aria-controls="predictions-list"
          className={cn(
            "h-auto w-full border-none bg-background p-4 pr-8 font-semibold",
            {
              "bg-primary pr-10 text-white": input,
            },
          )}
          title={input}
        />
        {isPending && (
          <Loader2
            className={cn(
              "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400",
              { "text-white": input },
            )}
          />
        )}
        {input && (
          <SquareX
            className={cn(
              "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400",
              { "text-white": input },
            )}
            onClick={handleClear}
          />
        )}
        <div
          className={cn(
            "animated-background absolute -inset-[2px] -z-10 rounded-md",
            "animated-background bg-gradient-to-bl from-primary via-secondary to-tertiary",
          )}
        />
      </div>
      {predictions.length > 0 && (
        <ul
          id="predictions-list"
          className={cn(
            "mt-2 max-h-60 overflow-auto rounded-md border bg-background shadow-lg",
            "absolute z-10 w-full divide-y divide-gray-200 border-gray-200",
          )}
        >
          {predictions.map((prediction: any) => (
            <li
              key={prediction.place_id}
              className="hover:bg-gray-100"
              title={prediction.description}
            >
              <Button
                variant="ghost"
                className="w-full justify-start bg-background px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleSelect(prediction)}
              >
                {prediction.description}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
