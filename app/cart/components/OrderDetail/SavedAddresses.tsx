"use client";

import Autocomplete from "@/components/Autocomplete";
import React from "react";

export type SavedAddress = {
  selectedSavedAddress: string | number;
  setSelectedSavedAddress: (value: string | number) => void;
};

const SavedAddresses = ({
  selectedSavedAddress,
  setSelectedSavedAddress,
}: SavedAddress) => {
  return (
    <div>
      <Autocomplete
        label="Adres"
        placeholder="Adresinizi giriniz"
        onSelect={(value) => setSelectedSavedAddress(value)}
        id="saved-addresses"
        defaultValue={selectedSavedAddress}
        openOnFocus
        fetchSuggestions={async (value) => {
          return [
            {
              id: 1,
              name: "İstanbul",
              address: "İstanbul adresi",
            },
            {
              id: 2,
              name: "İzmir",
              address: "İzmir adresi",
            },
            {
              id: 3,
              name: "Ankara",
              address: "Ankara adresi",
            },
          ]
            .map((item) => ({
              label: item.address,
              value: item.id,
            }))
            .filter((item) =>
              item.label.toLowerCase().includes(value.toLowerCase())
            );
        }}
      />
    </div>
  );
};

export default SavedAddresses;
