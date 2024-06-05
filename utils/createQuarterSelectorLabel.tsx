import { GetLocationQueryQuery } from "@/graphql/generated";

export const createQuarterSelectorLabel = (
  option: GetLocationQueryQuery["search_locationv1"][0]
) => {
  let quarter, district, city;

  option?.name ? (quarter = option.name) : "";

  option?.district_name ? (district = `/ ${option.district_name} `) : "";

  option?.city_name ? (city = `/ ${option.city_name}`) : "";

  return `${quarter} ${district} ${city}`;
};
