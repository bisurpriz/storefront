import { CookieTokens } from "@/app/@auth/contants";
import { FILTER_KEYS } from "@/common/enums/Product/product";
import { cookies } from "next/headers";
import { parseJson } from "./format";

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
  const cookie = get(CookieTokens.LOCATION_ID)?.value;
  const locationId = parseJson(cookie)?.id;
  const locationType = parseJson(cookie)?.type;

  const locationFilterQuery = {
    quarter: `quarters:=[${locationId}]`,
    district: `districts:=[${locationId}]`,
    city: `cities:=[${locationId}]`,
  };

  if (locationId && locationType) {
    filter_by.push(locationFilterQuery[locationType]);
  }

  return {
    filter_by: filter_by.filter(Boolean).join("&&"),
  };
};
