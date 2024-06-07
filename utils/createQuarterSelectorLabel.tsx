import { GetLocationQueryQuery } from "@/graphql/generated";

export const createQuarterSelectorLabel = (
  option: GetLocationQueryQuery["search_locationv1"][0]
) => {
  let quarter, district, city;

  if (option.type === "quarter") {
    quarter = option.name;
    district = option.district_name;
    city = option.city_name;
  }

  if (option.type === "district") {
    district = option.name;
    city = option.city_name;
  }

  if (option.type === "city") {
    city = option.city_name;
  }

  return [quarter, district, city].filter(Boolean).join("/ ");
};
