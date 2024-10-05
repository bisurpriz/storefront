import { formatDistance } from "date-fns";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";

export const localeFormat = (value: Date, naming: string) => {
  const formatted = format(value, naming, {
    locale: tr,
  });

  return formatted;
};

export const localeDistanceFormat = (value: Date) => {
  const formatted = formatDistance(value, new Date(), { locale: tr });

  return formatted;
};

export const parseJson = (json: any) => {
  if (typeof json !== "string") {
    return json;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};
