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
  setShowPlaceWarning: (show: boolean) => void
) {
  console.log(selectedLocation, places);
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
