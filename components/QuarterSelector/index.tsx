"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { useLazyQuery } from "@apollo/client";

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
import AutoComplete from "../Autocomplete";
import { LocateFixedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isPending, starTransition] = useTransition();
  const [suggestions, setSuggestions] = useState([]);

  const fetchLocations = async (input: string) => {
    try {
      const res = await refetch({
        search: input,
      });
      const {
        data: { search_locationv1: locations },
      } = res;
      setSuggestions(locations);
      return locations;
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <label className={clsx("max-xl:col-span-full block py-2")} tabIndex={0}>
      <AutoComplete
        disabled={isPending}
        value={
          value
            ? {
                label: value,
                value: value,
              }
            : null
        }
        options={suggestions.map((suggestion) => ({
          ...suggestion,
          label: suggestion.name,
          value: suggestion.id,
        }))}
        startIcon={<LocateFixedIcon className="h-6 w-6 shrink-0 " />}
        onInputChange={fetchLocations}
        buttonClass={cn("justify-between w-full py-4 h-auto ring-2", {
          "ring-2 ring-primary text-white bg-primary": value,
        })}
        onChange={(value) => {
          starTransition(() => {
            const selectedValue = suggestions.find(
              (suggestion) => suggestion?.id === (value as any)?.id
            );
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
            } else {
              console.error("Invalid value:", value);
              Cookies.remove(CookieTokens.LOCATION_ID);
              refresh();
            }
          });
        }}
        getOptionLabel={createQuarterSelectorLabel}
        placeholder="Gönderim yerini seçin"
      />
    </label>
  );
};

export default QuarterSelector;
