import { CookieTokens } from "@/app/@auth/contants";
import { FILTER_KEYS } from "@/common/enums/Product/product";
import { cookies } from "next/headers";
import { parseJson } from "./format";
import { IPlace } from "@/common/types/Product/product";

export const createTypesenseQueryMapper = async (
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  selectedLocation: IPlace,
) => {
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

  if (selectedLocation) {
    const areaLevel1 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_1"),
    )?.short_name;
    const areaLevel4 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_4"),
    )?.short_name;
    const areaLevel2 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_2"),
    )?.short_name;

    if (areaLevel1) {
      filter_by.push(
        `places.addressComponents.administrative_area_level_1:=[${areaLevel1}]`,
      );
    }

    if (areaLevel2) {
      filter_by.push(
        `places.addressComponents.administrative_area_level_2:=[${areaLevel2}]`,
      );
    }

    if (areaLevel4) {
      filter_by.push(
        `places.addressComponents.administrative_area_level_4:=[${areaLevel4}]`,
      );
    }
  }

  return {
    filter_by: filter_by.filter(Boolean).join("&&"),
  };
};
