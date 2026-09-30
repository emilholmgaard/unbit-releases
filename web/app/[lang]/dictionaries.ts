import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type en from "./dictionaries/en.json";

/** Every locale file must have the same shape as the English source. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  da: () => import("./dictionaries/da.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  fi: () => import("./dictionaries/fi.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  it: () => import("./dictionaries/it.json").then((module) => module.default),
  nb: () => import("./dictionaries/nb.json").then((module) => module.default),
  nl: () => import("./dictionaries/nl.json").then((module) => module.default),
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
  sv: () => import("./dictionaries/sv.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

/** Dictionary of the current route's locale (read from the `[lang]` root param), loaded on the server only. */
export const getDictionary = async (): Promise<Dictionary> => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};
