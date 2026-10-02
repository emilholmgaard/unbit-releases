import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type en from "./content/en.json";
import { hasLocale } from "../dictionaries";

/** Every locale file must have the same shape as the English source. */
export type HelpContent = typeof en;

const content: Record<Locale, () => Promise<HelpContent>> = {
  en: () => import("./content/en.json").then((m) => m.default),
  da: () => import("./content/da.json").then((m) => m.default),
  de: () => import("./content/de.json").then((m) => m.default),
  es: () => import("./content/es.json").then((m) => m.default),
  fi: () => import("./content/fi.json").then((m) => m.default),
  fr: () => import("./content/fr.json").then((m) => m.default),
  it: () => import("./content/it.json").then((m) => m.default),
  nb: () => import("./content/nb.json").then((m) => m.default),
  nl: () => import("./content/nl.json").then((m) => m.default),
  pl: () => import("./content/pl.json").then((m) => m.default),
  sv: () => import("./content/sv.json").then((m) => m.default),
};

/** Help copy of the current route's locale (read from the `[lang]` root param), loaded on the server only. */
export const getHelpContent = async (): Promise<HelpContent> => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return content[locale]();
};
