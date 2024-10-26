import { CookieTokens } from "@/app/@auth/contants";
import { FILTER_KEYS } from "@/common/enums/Product/product";
import { cookies } from "next/headers";
import { parseJson } from "./format";
import { IPlace } from "@/common/types/Product/product";

export const createTypesenseQueryMapper = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  let filter_by = Object.keys(searchParams).map((key) => {
    switch (key) {
      case FILTER_KEYS.CATEGORY:
        return `category.slug:=[${searchParams[key]}]`;
      case FILTER_KEYS.PRICE: {
        const price = (searchParams[key] as string).split("-");
        return `discount_price:[${price[0]}..${price[1]}]`;
      }
      case FILTER_KEYS.CUSTOMIZABLE:
        if (!(searchParams[key] === "true")) return {};
        return `is_customizable:true`;
      case FILTER_KEYS.SAME_DAY_DELIVERY:
        if (!(searchParams[key] === "true")) return {};
        return `delivery_type:SAME_DAY`;
      case FILTER_KEYS.FREE_SHIPPING:
        if (!(searchParams[key] === "true")) return {};
        return `is_service_free:true`;
      case FILTER_KEYS.TENANT:
        return `tenant_id:${searchParams[key]}`;
    }
  });

  filter_by.push("is_active:true");
  filter_by.push("is_approved:true");
  const { get } = await cookies();
  const selectedLocation = parseJson(
    get(CookieTokens.LOCATION_ID)?.value
  ) as IPlace;

  if (selectedLocation) {
    const {
      lat,
      lng,
      viewport: { north, south, east, west },
    } = selectedLocation;
    //const locationQuery =`places.lat:>=${north.toFixed()}`
      // 1. selected lat ile places
      // 2. place lat ile selected bounds
    const locationQuery = `(places.lat:>=${south}&&places.lat:<=${north}&&places.lng:>=${west}&&places.lng:<=${east})`;
      /* `((places.lat:>=${south}&&places.lat:<=${north}&&places.lng:>=${west}&&places.lng:<=${east})` +
      "||" +
      `(places.viewport.south:<=${lat}&&places.viewport.north:>=${lat}&&places.viewport.west:<=${lng}&&places.viewport.east:>=${lng}))`; */
    filter_by.push(locationQuery);
  }

  return {
    filter_by: filter_by.filter(Boolean).join("&&"),
  };
};
