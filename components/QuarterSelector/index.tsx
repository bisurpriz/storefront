"use client";

import React, { FC } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetLocationQueryQueryVariables,
} from "@/graphql/generated";
import Autocomplete from "../Autocomplete/Autocomplete";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import clsx from "clsx";

type QuarterSelectorProps = {
  value?: any;
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
    <label className={clsx("max-xl:col-span-full")}>
      <Autocomplete
        value={value}
        suggestions={fetchLocations}
        onChange={({ selectedValue }) => {
          if (selectedValue?.id && selectedValue?.type)
            Cookies.set(
              CookieTokens.LOCATION_ID,
              JSON.stringify({
                id: selectedValue.id,
                type: selectedValue.type,
              })
            );
        }}
        getOptionLabel={createQuarterSelectorLabel}
        placeholder="Gönderim yerini seçin"
        onClear={(option) => console.log(option, "cleared")}
      />
    </label>
  );
};

export default QuarterSelector;
