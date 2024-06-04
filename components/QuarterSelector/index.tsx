"use client";

import React, { useMemo, useState } from "react";
import SelectorAutoComplete, { Option } from "./SelectorAutoComplete";
import { debounce } from "@/utils/debounce";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getLocation } from "graphql";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetLocationQueryQueryVariables,
} from "@/graphql/generated";

const QuarterSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState<Option>(null);

  const [getLocations, { loading, data, error, refetch }] = useLazyQuery(
    GetLocationQueryDocument
  );

  const locations = data?.search_locationv1;

  const debounced = debounce((e, value) => {
    if (value !== selectedLocation?.value) {
      getLocations({
        variables: {
          search: value,
        },
      });
    }
  }, 500);

  const options = useMemo(
    () =>
      locations?.map((location) => ({
        value: location.id,
        label: location.name,
      })) || [],
    [locations]
  );

  return (
    <label className="flex-1 basis-full">
      <SelectorAutoComplete
        options={options}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        onInputChange={(e, value) => {
          debounced(e, value);
        }}
        onChange={(e, value) => {
          setSelectedLocation(value);
        }}
        value={selectedLocation}
      />
    </label>
  );
};

export default QuarterSelector;
