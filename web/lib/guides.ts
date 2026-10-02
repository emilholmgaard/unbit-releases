import type { Locale } from "@/lib/i18n";

/**
 * Help articles (/[lang]/guide/[slug]). Slugs are shared by all locales; the visitor-facing copy lives in
 * app/[lang]/guide/content/<locale>.json under `articles.<key>`.
 */
export const GUIDES = [
  { slug: "open-bitlocker-drive-on-mac", key: "open" },
  { slug: "is-bitlocker-on-mac-safe", key: "safe" },
  { slug: "open-bitlocker-ssd-hdd-usb-on-mac", key: "drives" },
] as const;
export type GuideKey = (typeof GUIDES)[number]["key"];

/** ISO dates used for Article JSON-LD and the "Updated" line. Bump GUIDES_MODIFIED when the copy changes. */
export const GUIDES_PUBLISHED = "2026-10-02";
export const GUIDES_MODIFIED = "2026-10-02";

export const guidePath = (locale: Locale, slug?: string) => `/${locale}/guide${slug ? `/${slug}` : ""}`;
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guideSlug = (key: GuideKey) => GUIDES.find((g) => g.key === key)!.slug;

export const formatGuideDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/** Strips the `[label](target)` link and bold markup used in guide copy (for JSON-LD and plain text). */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
