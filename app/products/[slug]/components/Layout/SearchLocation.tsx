"use client";

import Dropdown from "@/components/Dropdown";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdSportsMotorsports } from "react-icons/md";

const SearchLocation = () => {
  const [location, setLocation] = React.useState<{
    label: string;
    value: string;
  } | null>(null);

  const isSelectedLocationButtonClass = location
    ? "bg-primary text-white hover:bg-primary-light focus:bg-primary-light"
    : "";

  return (
    <div className="w-3/5">
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
          className={`w-full pr-10 p-4 text-left text-lg shadow-sm font-medium text-gray-700 focus:outline-none focus:bg-gray-100 rounded-lg outline-none ring  ring-primary hover:ring-primary-light focus:ring-primary-light ${isSelectedLocationButtonClass}`}
        >
          {location ? (
            <div className="flex items-center justify-start">
              <MdSportsMotorsports className="mr-2 transform scale-x-[-1] text-2xl" />
              <h4 className="text-2xl">{location.label}</h4>
              <span
                className="absolute w-6 h-6 top-1/2 right-5 transform -translate-y-1/2 translate-x-1/2 hover:text-gray-500 focus:text-gray-500 rounded-full hover:bg-gray-100 focus:bg-gray-100 flex items-center justify-center"
                role="button"
                onClick={() => setLocation(null)}
              >
                <AiOutlineClose />
              </span>
            </div>
          ) : (
            <h4 className="text-xl">Nereden Gönderim Yapılacak?</h4>
          )}
        </button>
      </Dropdown>
    </div>
  );
};

export default SearchLocation;
