"use client";

import Dropdown from "@/components/Dropdown";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

type Props = {
  className?: string;
};

const SearchLocation = ({ className = "" }: Props) => {
  const [location, setLocation] = React.useState<{
    label: string | number;
    value: string | number;
  } | null>(null);

  const isSelectedLocationButtonClass = location
    ? "bg-primary text-white hover:bg-primary-light focus:bg-primary-light"
    : "";

  return (
    <Dropdown
      options={[
        {
          label: "Ankara",
          value: "ankara",
        },
      ]}
      dropdownPlacement="bottomLeft"
      isSearchable
      noOptionsMessage="Aradığınız Konum Bulunamadı"
      fullWidth
      className="h-auto"
      onChange={(value, option) => {
        setLocation({
          label: option.label as string,
          value: option.value,
        });
      }}
    >
      <button
        className={`w-full relative pr-10 p-4 text-left text-lg shadow-sm font-medium 
        text-gray-700 focus:outline-none focus:bg-gray-100 rounded-lg outline-none
        border border-2 border-gray-200 hover:border-gray-300 focus:border-gray-300
         ${isSelectedLocationButtonClass} ${className}`}
      >
        {location ? (
          <div className="flex items-center justify-start">
            <GoLocation className="mr-2 transform scale-x-[-1] text-lg fill-white stroke-white" />
            <h4 className="text-lg">{location.label}</h4>
            <span
              className="absolute w-6 h-6 top-1/2 right-5 transform -translate-y-1/2 translate-x-1/2 hover:text-gray-500 focus:text-gray-500 rounded-full hover:bg-gray-100 focus:bg-gray-100 flex items-center justify-center"
              role="button"
              onClick={() => setLocation(null)}
            >
              <AiOutlineClose />
            </span>
          </div>
        ) : (
          <h4 className="text-lg text-slate-400">
            Lütfen gönderim adresinizi seçiniz
          </h4>
        )}
      </button>
    </Dropdown>
  );
};

export default SearchLocation;
