import type { MetadataRoute } from "next";
import { SITE_URL, latestRelease } from "@/lib/site";

export const revalidate = 600;

/** lastModified = the later of the last site deploy and the latest app release (the page shows the version). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const built = new Date(process.env.BUILD_TIME || Date.now());
  const { date } = await latestRelease();
  const released = date ? new Date(date) : undefined;
  const lastModified = released && released > built ? released : built;
  return [{ url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 }];
}
