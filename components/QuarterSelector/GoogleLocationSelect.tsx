"use client";

import React, { useState, useTransition } from "react";
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
  const [isPending, starTransition] = useTransition();
  const { refresh } = useRouter();

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
    />
  );
};

export default GoogleLocationSelect;
