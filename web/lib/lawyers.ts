import type { Locale } from "@/lib/i18n";

/**
 * Page for lawyers who must open BitLocker-encrypted USB sticks with digital case material on a Mac.
 * Only Danish (/da/advokater) and English (/en/lawyers) exist; the copy lives in lib/lawyers-content.ts.
 * Keep the legal wording sober: Unbit is not an officially approved tool, the page is not legal advice, and
 * the law firm assesses suitability itself.
 */
export const LAWYERS_LOCALES = ["da", "en"] as const;
export type LawyersLocale = (typeof LAWYERS_LOCALES)[number];
export const isLawyersLocale = (locale: string): locale is LawyersLocale => (LAWYERS_LOCALES as readonly string[]).includes(locale);

export const LAWYERS_SLUGS: Record<LawyersLocale, string> = { da: "advokater", en: "lawyers" };
export const lawyersPath = (locale: LawyersLocale) => `/${locale}/${LAWYERS_SLUGS[locale]}`;

export const LAWYERS_PUBLISHED = "2026-10-02";
export const LAWYERS_MODIFIED = "2026-10-02";

export const SOURCE_DOMSTOLE = "https://www.domstol.dk/media/xnckushf/vejledning-til-retten-og-forsvarere-om-aabning-af-digital-sag-paa-krypteret-usb-stick.pdf";
export const SOURCE_ADVOKATSAMFUNDET = "https://www.advokatsamfundet.dk/nyheder-medier/nyheder/2025/sadan-arbejder-du-med-overholdelsen-af-gdpr-som-advokat-1/";

export const hasLawyersPage = (locale: Locale): locale is LawyersLocale => isLawyersLocale(locale);
