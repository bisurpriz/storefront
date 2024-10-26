"use client";

import React, { useEffect, useState, useTransition } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import { useRouter } from "next/navigation";
import { parseJson } from "@/utils/format";

const GoogleLocationSelect = () => {
  const [value, setValue] = useState(
    parseJson(Cookies.get(CookieTokens.LOCATION_ID))
  );
  const [, starTransition] = useTransition();
  const { refresh } = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg mb-2" />
    );
  }

  const onChange = async (data) => {
    setValue(data);
    starTransition(async () => {
      if (data?.value?.place_id) {
        const placeId = data.value.place_id;
        const geoDataResponse = await geocodeByPlaceId(placeId);
        const geoData = geoDataResponse[0];
        const { lat, lng } = geoData.geometry?.location;
        const viewport = geoData?.geometry.viewport?.toJSON();
        Cookies.set(
          CookieTokens.LOCATION_ID,
          JSON.stringify({
            viewport,
            lat: lat(),
            lng: lng(),
            placeId,
            label: data.label,
          })
        );
        refresh();
      } else {
        Cookies.remove(CookieTokens.LOCATION_ID);
        refresh();
      }
    });
  };

  return (
    <GooglePlacesAutocomplete
      apiKey="AIzaSyBaoFsD1n1A9l9QrAxJsQkid54Jd_s8Glk"
      selectProps={{
        value: value,
        onChange: onChange,
        isClearable: true,
      }}
      apiOptions={{
        region: "TR",
        language: "tr",
        libraries: ["places"],
      }}
      autocompletionRequest={{
        componentRestrictions: {
          country: "tr",
        },
      }}
      onLoadFailed={(error) => {
        console.error("Could not load Google API", error);
      }}
      debounce={300}
    />
  );
};

export default GoogleLocationSelect;
