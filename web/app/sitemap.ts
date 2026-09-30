import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
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
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
