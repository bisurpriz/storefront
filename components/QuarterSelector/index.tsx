"use client";

import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetLocationQueryQueryVariables,
} from "@/graphql/generated";
import Autocomplete from "../Autocomplete/Autocomplete4Haz";

const QuarterSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [, { refetch }] = useLazyQuery<
    GetLocationQueryQuery,
    GetLocationQueryQueryVariables
  >(GetLocationQueryDocument);

  const fetchLocations = async (input: string) => {
    try {
      const {
        data: { search_locationv1: locations },
      } = await refetch({
        search: input,
      });

      return locations;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  console.log(selectedLocation);

  return (
    <label className="flex-1 basis-full">
      <Autocomplete
        suggestions={fetchLocations}
        onChange={({ selectedValue }) => setSelectedLocation(selectedValue)}
        getOptionLabel={(option) => option.name}
        placeholder="Gönderim yerini seçin"
        onClear={(option) => console.log(option, "cleared")}
      />
    </label>
  );
};

export default QuarterSelector;
