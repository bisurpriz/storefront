import format from "date-fns/format";
import tr from "date-fns/locale/tr";

export const localeFormat = (value: Date, naming: string) => {
  const formatted = format(value, naming, { locale: tr });

  return formatted;
};
