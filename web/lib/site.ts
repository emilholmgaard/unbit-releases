/** Canonical site URL. Change it here or set NEXT_PUBLIC_SITE_URL (e.g. when a custom domain is added). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://unbit-mu.vercel.app").replace(/\/+$/, "");

export const SITE_NAME = "Unbit";
export const TITLE = "Unbit – Open BitLocker on Mac | Read BitLocker USB drives on macOS";
export const DESCRIPTION =
  "Open BitLocker-encrypted USB drives on your Mac. Unbit reads BitLocker drives on macOS with your password or recovery key. Read-only, no drivers, runs locally. Free.";

export const RELEASES_URL = "https://github.com/emilholmgaard/unbit-releases/releases";
export const DOWNLOAD_URL = `${RELEASES_URL}/latest/download/Unbit.dmg`;

const FEEDS = [
  "https://emilholmgaard.github.io/unbit-releases/appcast.xml",
  "https://raw.githubusercontent.com/emilholmgaard/unbit-releases/main/appcast.xml",
];
const FALLBACK = { version: "1.0.2", minOS: "13", date: undefined as string | undefined };

/** Latest release from the Sparkle feed (cached by Next.js, refreshed every 10 minutes). */
export async function latestRelease(): Promise<{ version: string; minOS: string; date?: string }> {
  for (const url of FEEDS) {
    try {
      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) continue;
      const item = (await res.text()).split("<item>")[1];
      const version = item?.match(/<sparkle:shortVersionString>\s*([^<\s]+)\s*</)?.[1];
      if (!version) continue;
      const minOS = item.match(/<sparkle:minimumSystemVersion>\s*([^<\s]+)\s*</)?.[1]?.split(".")[0];
      const pub = item.match(/<pubDate>([^<]+)</)?.[1];
      const date = pub && !Number.isNaN(Date.parse(pub)) ? new Date(pub).toISOString().slice(0, 10) : undefined;
      return { version, minOS: minOS ?? FALLBACK.minOS, date };
    } catch {
      // try the next feed
    }
  }
  return FALLBACK;
}
