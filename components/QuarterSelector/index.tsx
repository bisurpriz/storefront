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

  const createLabel = (
    option: GetLocationQueryQuery["search_locationv1"][0]
  ) => {
    let quarter, district, city;

    option?.name ? (quarter = option.name) : "";

    option?.district_name ? (district = `/ ${option.district_name} `) : "";

    option?.city_name ? (city = `/ ${option.city_name}`) : "";

    return `${quarter} ${district} ${city}`;
  };

  return (
    <label className="flex-1 basis-full">
      <Autocomplete
        suggestions={fetchLocations}
        onChange={({ selectedValue }) => setSelectedLocation(selectedValue)}
        getOptionLabel={createLabel}
        placeholder="Gönderim yerini seçin"
        onClear={(option) => console.log(option, "cleared")}
      />
    </label>
  );
};

export default QuarterSelector;
