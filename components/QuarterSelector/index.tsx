"use client";

import React, { FC } from "react";
import { useLazyQuery } from "@apollo/client";

import Autocomplete from "../Autocomplete/Autocomplete";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";
import Cookies from "js-cookie";
import { CookieTokens } from "@/app/@auth/contants";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  GetLocationQueryDocument,
  GetLocationQueryQuery,
  GetLocationQueryQueryVariables,
} from "@/graphql/queries/account/account.generated";

type QuarterSelectorProps = {
  value?: any;
  onChange?: (value: any) => void;
};

const QuarterSelector: FC<QuarterSelectorProps> = ({ value, onChange }) => {
  const { refresh } = useRouter();
  const [, { refetch }] = useLazyQuery<
    GetLocationQueryQuery,
    GetLocationQueryQueryVariables
  >(GetLocationQueryDocument);

  const fetchLocations = async (input: string) => {
    try {
      const res = await refetch({
        search: input,
      });
      const {data: { search_locationv1: locations }} = res;
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
          if (selectedValue?.id && selectedValue?.type) {
            Cookies.set(
              CookieTokens.LOCATION_ID,
              JSON.stringify({
                id: selectedValue.id,
                type: selectedValue.type,
              })
            );
            refresh();
            onChange && onChange(selectedValue);
          }
        }}
        getOptionLabel={createQuarterSelectorLabel}
        placeholder="Gönderim yerini seçin"
        onClear={() => {
          Cookies.remove(CookieTokens.LOCATION_ID);
          refresh();
        }}
      />
    </label>
  );
};

export default QuarterSelector;
