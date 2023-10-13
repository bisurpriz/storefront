import "server-only";
import type { Locale } from "./i18n-config";

const dictionaries = {
  tr: () => import("../dictionaries/tr.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.tr();
