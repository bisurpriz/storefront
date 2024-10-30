"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PlacesAutocomplete() {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mounted, setMounted] = useState(false);

  const autocompleteService = useRef(null);
  const sessionToken = useRef(null);
  const fetchTimeout = useRef(null);

  useEffect(() => {
    if (!mounted) return;

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();
    sessionToken.current =
      new window.google.maps.places.AutocompleteSessionToken();
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current);

    if (e.target.value === "") {
      setPredictions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchTimeout.current = setTimeout(() => {
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
            setLoading(false);
          }
        );
      }
    }, 300);
  };

  const handleSelect = (placeId) => {
    const placeService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placeService.getDetails(
      {
        placeId,
        fields: ["name", "formatted_address"],
        sessionToken: sessionToken.current,
      },
      (place, status) => {
        console.log(place);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSelectedPlace(place);
          setInput(`${place.name}, ${place.formatted_address}`);
          setPredictions([]);
          sessionToken.current =
            new window.google.maps.places.AutocompleteSessionToken();
        }
      }
    );

    setPredictions([]);
  };

  return (
    <div className="w-full my-4">
      <div className="relative">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Bir yer arayın"
          aria-label="Yer ara"
          aria-autocomplete="list"
          aria-controls="predictions-list"
          className="w-full p-4 h-auto"
          title={input}
        />
        {loading && (
          <Loader2 className="animate-spin h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
      </div>
      {predictions.length > 0 && (
        <ul
          id="predictions-list"
          className="mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="hover:bg-gray-100"
              title={prediction.description}
            >
              <Button
                variant="ghost"
                className="w-full text-left justify-start px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelect(prediction.place_id)}
              >
                {prediction.description}
              </Button>
            </li>
          ))}
        </ul>
      )}
      {/* {selectedPlace && (
        <div className="mt-4">
          <h3 className="font-semibold">Seçilen Yer:</h3>
          <p>{selectedPlace.name}</p>
          <p className="text-sm text-gray-600">
            {selectedPlace.formatted_address}
          </p>
        </div>
      )} */}
    </div>
  );
}
