import React from "react";
import QuarterSelector from ".";
import LandingSearchBanner from "../LandingSearchBanner";
import { getAvailableLocation } from "@/app/account/addresses/actions";
import { getLocationFromCookie } from "@/app/actions";

const ServerQuerySelector = async () => {
  const location = await getLocationFromCookie();

  const data = await getAvailableLocation(location);

  const value = data?.value;

  return (
    <>
      <QuarterSelector value={value} />
      <LandingSearchBanner />
    </>
  );
};

export default ServerQuerySelector;
