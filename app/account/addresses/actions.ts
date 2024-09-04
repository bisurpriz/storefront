"use server";

import {
  getCityById,
  getDistrictById,
  getQuarterById,
  readIdFromCookies,
} from "@/app/actions";
import { Location } from "@/common/types/Addresses/addresses";

import { query } from "@/graphql/lib/client";
import {
  GetUserAddressesDocument,
  GetUserAddressesQuery,
  GetUserAddressesQueryVariables,
} from "@/graphql/queries/address/address.generated";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";

export const getUserAddresses = async () => {
  const userId = await readIdFromCookies();
  const { data } = await query<
    GetUserAddressesQuery,
    GetUserAddressesQueryVariables
  >({
    query: GetUserAddressesDocument,
    variables: {
      user_id: userId,
    },
  });

  return { user_addresses: data.user_address };
};

export const getAvailableLocation = async (location: Location) => {
  if (!location) return null;
  const { type, id } = location;

  switch (type) {
    case "city": {
      const data = await getCityById({
        id: id,
      });
      return {
        value: createQuarterSelectorLabel({
          city_name: data.city[0].name,
          city_id: data.city[0].id,
          type: "city",
        }),
        data: {
          city: data.city[0],
        },
      };
    }
    case "district": {
      const data = await getDistrictById({
        id: id,
      });
      return {
        value: createQuarterSelectorLabel({
          district_name: data.district[0].name,
          district_id: data.district[0].id,
          city_name: data.district[0].city.name,
          city_id: data.district[0].city.id,
          type: "district",
        }),
        data: {
          district: data.district[0],
          city: data.district[0].city,
        },
      };
    }
    case "quarter": {
      const data = await getQuarterById({
        id: id,
      });
      return {
        value: createQuarterSelectorLabel({
          name: data.quarter[0].name,
          id: data.quarter[0].id,
          district_name: data.quarter[0].district.name,
          district_id: data.quarter[0].district.id,
          city_name: data.quarter[0].district.city.name,
          city_id: data.quarter[0].district.city.id,
          type: "quarter",
        }),
        data: {
          quarter: data.quarter[0],
          district: data.quarter[0].district,
          city: data.quarter[0].district.city,
        },
      };
    }
    default:
      return {
        value: "",
        data: {},
      };
  }
};
