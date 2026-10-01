import type { Locale } from "@/lib/i18n";

/**
 * Competitors that have a dedicated "X alternative" page (/[lang]/alternatives/[slug]).
 * Structure and facts live here; all visitor-facing copy (per locale) lives in the dictionaries
 * under `alternatives.competitors.<key>`.
 *
 * Only add facts that were verified on the vendor's own site, and update LAST_CHECKED when you re-verify.
 */
export const LAST_CHECKED = "2026-10-01";

/** Comparison rows in display order. Rows a competitor has no verified cell for are skipped on its page. */
export const ROW_ORDER = ["price", "trial", "write", "drivers", "silicon", "macos", "unlock", "privacy", "extras"] as const;
export type RowKey = (typeof ROW_ORDER)[number];

export type CompetitorKey = "iboysoft" | "hasleo" | "uubyte" | "anylinuxfs" | "parallels";

export type Competitor = {
  /** URL slug: /[lang]/alternatives/[slug] */
  slug: string;
  /** Key in `dictionary.alternatives.competitors`. */
  key: CompetitorKey;
  /** Product name used in titles and headings (not translated). */
  name: string;
  /** Pages the facts on the comparison were verified from. */
  sources: { label: string; url: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: "iboysoft-bitlocker",
    key: "iboysoft",
    name: "iBoysoft BitLocker",
    sources: [
      { label: "iBoysoft BitLocker for Mac", url: "https://iboysoft.com/bitlocker-for-mac/" },
      { label: "Pricing and sales FAQ", url: "https://iboysoft.com/bitlocker-for-mac/purchase.html" },
      { label: "Online help", url: "https://iboysoft.com/bitlocker-for-mac/online-help.html" },
      { label: "Enabling system extensions on Apple silicon", url: "https://iboysoft.com/howto/enable-system-extension-m1-mac.html" },
      { label: "Product page (File Manager and Volume Mounter modes)", url: "https://www.m3datarecovery.com/mac-bitlocker/" },
    ],
  },
  {
    slug: "hasleo-bitlocker-anywhere",
    key: "hasleo",
    name: "Hasleo BitLocker Anywhere",
    sources: [
      { label: "Hasleo BitLocker Anywhere for Mac", url: "https://www.easyuefi.com/bitlocker-for-mac/bitlocker-for-mac.html" },
      { label: "Store and pricing", url: "https://www.easyuefi.com/store-bitlocker-anywhere.html" },
      { label: "Tech spec", url: "https://www.easyuefi.com/bitlocker-for-mac/tech-spec.html" },
      { label: "Vendor support forum (Apple silicon installation)", url: "https://www.easyuefi.com/forums/thread-3591.html" },
      { label: "Full Disk Access guide", url: "https://www.easyuefi.com/bitlocker-for-mac/resource/why-bitlocker-drive-not-recognized-bybitlocker-anywhere-for-mac.html" },
    ],
  },
  {
    slug: "uubyte-bitlocker-geeker",
    key: "uubyte",
    name: "UUByte BitLocker Geeker",
    sources: [
      { label: "UUByte BitLocker Geeker", url: "https://www.uubyte.com/bitlocker-geeker.html" },
      { label: "Purchase page", url: "https://www.uubyte.com/purchase/bitlocker-geeker.html" },
      { label: "Apple silicon guide", url: "https://www.uubyte.com/online-help/bitlocker-geeker.html" },
    ],
  },
  {
    slug: "anylinuxfs",
    key: "anylinuxfs",
    name: "anylinuxfs",
    sources: [
      { label: "anylinuxfs on GitHub (README)", url: "https://github.com/nohajc/anylinuxfs" },
      { label: "anylinuxfs documentation: examples", url: "https://github.com/nohajc/anylinuxfs/blob/main/docs/examples.md" },
    ],
  },
  {
    slug: "parallels-desktop",
    key: "parallels",
    name: "Parallels Desktop",
    sources: [
      { label: "Parallels Desktop: buy and FAQ", url: "https://www.parallels.com/products/desktop/buy/" },
      { label: "Connecting a USB drive to a virtual machine", url: "https://kb.parallels.com/en/122993" },
    ],
  },
];

export const competitorSlugs = competitors.map((c) => c.slug);
export const getCompetitor = (slug: string) => competitors.find((c) => c.slug === slug);

/** Path of a locale's alternatives page (index when no slug is given). */
export const alternativesPath = (locale: Locale, slug?: string) => `/${locale}/alternatives${slug ? `/${slug}` : ""}`;

/** Formats an ISO date (YYYY-MM-DD) for a locale. */
export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
