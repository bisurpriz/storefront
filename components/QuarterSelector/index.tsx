"use client";

import React, { FC } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetLocationQueryQueryVariables,
} from "@/graphql/generated";
import Autocomplete from "../Autocomplete/Autocomplete4Haz";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";
import Cookies from "js-cookie";

type QuarterSelectorProps = {
  value: any;
};

const QuarterSelector: FC<QuarterSelectorProps> = ({ value }) => {
  const [query, { refetch }] = useLazyQuery<
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

  return (
    <label className="flex-1 basis-full">
      <Autocomplete
        value={value}
        suggestions={fetchLocations}
        onChange={({ selectedValue }) => {
          if (selectedValue?.id)
            Cookies.set("selectedLocation", selectedValue.id);
        }}
        getOptionLabel={createQuarterSelectorLabel}
        placeholder="Gönderim yerini seçin"
        onClear={(option) => console.log(option, "cleared")}
      />
    </label>
  );
};

export default QuarterSelector;
