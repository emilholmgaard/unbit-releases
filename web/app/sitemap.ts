import type { MetadataRoute } from "next";
import { alternativesPath, competitors } from "@/lib/competitors";
import { BEST_MODIFIED, GUIDES, GUIDES_MODIFIED, bestPath, guidePath } from "@/lib/guides";
import { locales } from "@/lib/i18n";
import { LAWYERS_LOCALES, LAWYERS_MODIFIED, lawyersPath } from "@/lib/lawyers";
import { SITE_URL, latestRelease } from "@/lib/site";

export const revalidate = 600;

/** One entry per locale, each with hreflang alternates. lastModified = the later of the last site deploy and the latest app release (the page shows the version). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const built = new Date(process.env.BUILD_TIME || Date.now());
  const { date } = await latestRelease();
  const released = date ? new Date(date) : undefined;
  const lastModified = released && released > built ? released : built;
  const languages = {
    ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
    "x-default": `${SITE_URL}/en`,
  };
  const home = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));

  // Alternatives index and one page per competitor, each with hreflang alternates across locales.
  const alternatives = (slug?: string) => {
    const langs = {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${alternativesPath(l, slug)}`])),
      "x-default": `${SITE_URL}${alternativesPath("en", slug)}`,
    };
    return locales.map((locale) => ({
      url: `${SITE_URL}${alternativesPath(locale, slug)}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.7,
      alternates: { languages: langs },
    }));
  };

  // Guides index and one article per guide, each with hreflang alternates across locales.
  const guides = (slug?: string) => {
    const langs = {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${guidePath(l, slug)}`])),
      "x-default": `${SITE_URL}${guidePath("en", slug)}`,
    };
    return locales.map((locale) => ({
      url: `${SITE_URL}${guidePath(locale, slug)}`,
      lastModified: new Date(GUIDES_MODIFIED) > built ? new Date(GUIDES_MODIFIED) : built,
      changeFrequency: "monthly" as const,
      priority: slug ? (locale === "en" ? 0.8 : 0.7) : locale === "en" ? 0.7 : 0.6,
      alternates: { languages: langs },
    }));
  };

  // Best BitLocker for Mac roundup, with hreflang alternates across locales.
  const bestLangs = {
    ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${bestPath(l)}`])),
    "x-default": `${SITE_URL}${bestPath("en")}`,
  };
  const best = locales.map((locale) => ({
    url: `${SITE_URL}${bestPath(locale)}`,
    lastModified: new Date(BEST_MODIFIED) > built ? new Date(BEST_MODIFIED) : built,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 0.9 : 0.8,
    alternates: { languages: bestLangs },
  }));

  // Lawyers page: Danish (/da/advokater) and English (/en/lawyers) only, with hreflang to each other.
  const lawyersLangs = {
    ...Object.fromEntries(LAWYERS_LOCALES.map((l) => [l, `${SITE_URL}${lawyersPath(l)}`])),
    "x-default": `${SITE_URL}${lawyersPath("en")}`,
  };
  const lawyers = LAWYERS_LOCALES.map((locale) => ({
    url: `${SITE_URL}${lawyersPath(locale)}`,
    lastModified: new Date(LAWYERS_MODIFIED) > built ? new Date(LAWYERS_MODIFIED) : built,
    changeFrequency: "monthly" as const,
    priority: locale === "da" ? 0.8 : 0.7,
    alternates: { languages: lawyersLangs },
  }));

  return [
    ...home,
    ...best,
    ...lawyers,
    ...alternatives(),
    ...competitors.flatMap((c) => alternatives(c.slug)),
    ...guides(),
    ...GUIDES.flatMap((g) => guides(g.slug)),
  ];
}
