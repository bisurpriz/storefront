import { format, formatDistance } from "date-fns";
import { tr } from "date-fns/locale";

export const localeFormat = (value: Date, naming: string) => {
  const formatted = format(value, naming, {
    locale: tr,
  });

  return formatted;
};

export const localeDistanceFormat = (value: Date) => {
  try {
    const formatted = formatDistance(value, new Date(), { locale: tr });
    return formatted;
  } catch (_error) {
    return "";
  }
};

export const parseJson = (json: any) => {
  if (typeof json !== "string") {
    return json;
  }
  try {
    return JSON.parse(json);
  } catch (_error) {
    return null;
  }
};
