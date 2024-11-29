import { IPlace } from "@/common/types/Product/product";

type Location = {
  address_components: IPlace["address_components"];
};

type Place = {
  addressComponents: {
    [key: string]: string;
  };
  label: string;
  placeId: string;
};

export function validateLocation(
  selectedLocation: Location | null,
  places: Place[] | null,
  isSameDay: boolean,
  setShowPlaceWarning: (show: boolean) => void,
) {
  if (!selectedLocation || !places || !isSameDay) return;

  const getAreaLevel = (level: string) =>
    selectedLocation.address_components.find((x) => x.types.includes(level))
      ?.short_name;

  const areaLevel1 = getAreaLevel("administrative_area_level_1");
  const areaLevel4 = getAreaLevel("administrative_area_level_4");

  const isMatch = (place: Place) =>
    place.addressComponents["administrative_area_level_1"] === areaLevel1 &&
    (!areaLevel4 ||
      place.addressComponents["administrative_area_level_4"] === areaLevel4);

  const isOK = areaLevel1 && places.some(isMatch);

  setShowPlaceWarning(!isOK);
}

export const getLocationVariables = (selectedLocation: Location) => {
  if (!selectedLocation)
    return {
      city: null,
      district: null,
      neighborhood: null,
      street: null,
      postal_code: null,
    };

  const city = selectedLocation.address_components.find((x) =>
    x.types.includes("administrative_area_level_1"),
  )?.short_name;

  const district = selectedLocation.address_components.find((x) =>
    x.types.includes("administrative_area_level_2"),
  )?.short_name;

  const neighborhood = selectedLocation.address_components.find((x) =>
    x.types.includes("administrative_area_level_4"),
  )?.short_name;

  const street = selectedLocation.address_components.find((x) =>
    x.types.includes("route"),
  )?.short_name;

  const postal_code = selectedLocation.address_components.find((x) =>
    x.types.includes("postal_code"),
  )?.short_name;

  return {
    city,
    district,
    neighborhood,
    street,
    postal_code,
  };
};

export const getAvailableDistricts = (places: Place[] | null) => {
  if (!places) return [];

  return places.reduce((acc, place) => {
    const district = place.addressComponents["administrative_area_level_2"];
    if (district && !acc.includes(district)) acc.push(district);
    return acc;
  }, [] as string[]);
};

export const getAvailableNeighborhoods = (
  places: Place[] | null,
  district: string,
) => {
  if (!places) return [];

  return places.reduce((acc, place) => {
    if (place.addressComponents["administrative_area_level_2"] === district) {
      const neighborhood =
        place.addressComponents["administrative_area_level_4"];
      if (neighborhood && !acc.includes(neighborhood)) acc.push(neighborhood);
    }
    return acc;
  }, [] as string[]);
};

export const getAvailableDistrictsAndNeighborhoods = (
  places: Place[] | null,
) => {
  if (!places) return [];

  const districts = getAvailableDistricts(places);

  return districts.reduce(
    (acc, district) => {
      const neighborhoods = getAvailableNeighborhoods(places, district);
      acc[district] = neighborhoods;
      return acc;
    },
    {} as { [key: string]: string[] },
  );
};

export const getAddressString = (street, postal_code) => {
  let address = "";

  if (street) {
    address += street;
  }

  if (postal_code) {
    address += " " + postal_code;
  }

  return address;
};
