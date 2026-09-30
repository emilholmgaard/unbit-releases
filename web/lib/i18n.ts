/** Locales supported by the Unbit app (Localizable.xcstrings) and therefore by the site. `en` is the source/default. */
export const locales = ["en", "da", "de", "es", "fi", "fr", "it", "nb", "nl", "pl", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Native language names and `flag-icons` country codes (https://flagicons.lipis.dev). */
export const languages: Record<Locale, { name: string; flag: string; ogLocale: string }> = {
  en: { name: "English", flag: "gb", ogLocale: "en_US" },
  da: { name: "Dansk", flag: "dk", ogLocale: "da_DK" },
  de: { name: "Deutsch", flag: "de", ogLocale: "de_DE" },
  es: { name: "Español", flag: "es", ogLocale: "es_ES" },
  fi: { name: "Suomi", flag: "fi", ogLocale: "fi_FI" },
  fr: { name: "Français", flag: "fr", ogLocale: "fr_FR" },
  it: { name: "Italiano", flag: "it", ogLocale: "it_IT" },
  nb: { name: "Norsk bokmål", flag: "no", ogLocale: "nb_NO" },
  nl: { name: "Nederlands", flag: "nl", ogLocale: "nl_NL" },
  pl: { name: "Polski", flag: "pl", ogLocale: "pl_PL" },
  sv: { name: "Svenska", flag: "se", ogLocale: "sv_SE" },
};
