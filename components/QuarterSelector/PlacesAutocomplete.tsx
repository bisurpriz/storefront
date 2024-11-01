"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MapPinnedIcon, SquareX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway } from "@uidotdev/usehooks";
import { CookieTokens } from "@/app/@auth/contants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { parseJson } from "@/utils/format";

export type PlacesAutocompleteProps = {};

export default function PlacesAutocomplete({}: PlacesAutocompleteProps) {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  const autocompleteService = useRef(null);
  const sessionToken = useRef(null);
  const fetchTimeout = useRef(null);
  const { refresh } = useRouter();

  useEffect(() => {
    if (!mounted) return;

    startTransition(() => {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      sessionToken.current =
        new window.google.maps.places.AutocompleteSessionToken();

      const hasLocation = parseJson(Cookies.get(CookieTokens.LOCATION_ID));
      if (hasLocation) {
        setInput(hasLocation.label);
      }
    });
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);

    if (e.target.value === "") {
      setPredictions([]);
      return;
    }

    fetchTimeout.current = setTimeout(() => {
      startTransition(() => {
        if (autocompleteService.current) {
          autocompleteService.current.getPlacePredictions(
            {
              input: e.target.value,
              sessionToken: sessionToken.current,
              componentRestrictions: { country: "tr" },
              language: "tr",
            },
            (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPredictions(predictions);
              }
            }
          );
        }
      });
    }, 300);
  };

  const ref = useClickAway<HTMLDivElement>(() => {
    setPredictions([]);
  });

  const geocodeByPlaceId = async (placeId) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  const handleSelect = (prediction) => {
    setInput(prediction.description);
    setPredictions([]);
    if (prediction.place_id) {
      geocodeByPlaceId(prediction.place_id).then((results) => {
        const geoData = results[0];
        const { lat, lng } = geoData.geometry?.location;
        const viewport = geoData?.geometry.viewport?.toJSON();
        Cookies.set(
          CookieTokens.LOCATION_ID,
          JSON.stringify({
            viewport,
            lat: lat(),
            lng: lng(),
            placeId: prediction.place_id,
            label: prediction.description,
          })
        );
        refresh();
      });
    } else {
      Cookies.remove(CookieTokens.LOCATION_ID);
      refresh();
    }
  };

  const handleClear = () => {
    setInput("");
    setPredictions([]);
    Cookies.remove(CookieTokens.LOCATION_ID);
    refresh();
  };

  return (
    <div className="w-full relative" ref={ref}>
      <div className="relative">
        <Input
          icon={
            <MapPinnedIcon
              className={cn("text-primary", {
                "text-white": input,
              })}
            />
          }
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Gönderim adresi girin"
          aria-label="Yer ara"
          aria-autocomplete="list"
          aria-controls="predictions-list"
          className={cn(
            "w-full p-4 h-auto font-semibold border-2 border-primary focus:ring-2 focus:ring-primary pr-8",
            {
              "bg-primary text-white pr-10": input,
            }
          )}
          title={input}
        />
        {isPending && (
          <Loader2
            className={cn(
              "animate-spin h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
              { "text-white": input }
            )}
          />
        )}
        {input && (
          <SquareX
            className={cn(
              "h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer",
              { "text-white": input }
            )}
            onClick={handleClear}
          />
        )}
      </div>
      {predictions.length > 0 && (
        <ul
          id="predictions-list"
          className={cn(
            "mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-auto",
            "absolute w-full z-10 border-gray-200 divide-y divide-gray-200"
          )}
        >
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="hover:bg-gray-100"
              title={prediction.description}
            >
              <Button
                variant="ghost"
                className="w-full text-left justify-start px-4 py-2 hover:bg-gray-100 bg-white"
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
