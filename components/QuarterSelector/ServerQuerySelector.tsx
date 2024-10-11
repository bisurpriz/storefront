import React from "react";
import QuarterSelector from ".";
import { getAvailableLocation } from "@/app/account/addresses/actions";
import { getLocationFromCookie } from "@/app/actions";

const ServerQuerySelector = async () => {
  const location = await getLocationFromCookie();

  const data = await getAvailableLocation(location);
  return <QuarterSelector value={data?.value} />;
};

export default ServerQuerySelector;
