/** Canonical site URL. Change it here or set NEXT_PUBLIC_SITE_URL (e.g. when a custom domain is added). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://unbit.app").replace(/\/+$/, "");

export const SITE_NAME = "Unbit";
export const TITLE = "Unbit – Open BitLocker on Mac | Read BitLocker external drives (USB, SSD, HDD) on macOS";
export const DESCRIPTION =
  "Open BitLocker-encrypted external drives (USB sticks, SSDs and HDDs) on your Mac with your password or recovery key. Read-only, no drivers, runs locally. Free. Internal disks aren't supported.";

export const RELEASES_URL = "https://github.com/emilholmgaard/unbit-releases/releases";
export const DOWNLOAD_URL = `${RELEASES_URL}/latest/download/Unbit.dmg`;

const FEEDS = [
  "https://emilholmgaard.github.io/unbit-releases/appcast.xml",
  "https://raw.githubusercontent.com/emilholmgaard/unbit-releases/main/appcast.xml",
];
const FALLBACK = { version: "1.0.11", minOS: "13", date: undefined as string | undefined };

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

/** Apple Team ID the app is signed with (shown on the site so people can compare `codesign` output). */
export const TEAM_ID = "6XTQ98822R";

/** Release asset written by scripts/release.sh: `<sha256>  Unbit-<version>.dmg`. */
export const checksumUrl = (version: string) => `${RELEASES_URL}/download/v${version}/Unbit-${version}.dmg.sha256`;
export const releasePageUrl = (version: string) => `${RELEASES_URL}/tag/v${version}`;

/** SHA-256 of the release DMG, read from the release's checksum asset (cached, refreshed every 10 minutes). `undefined` if it can't be read or doesn't look like a SHA-256. */
export async function releaseChecksum(version: string): Promise<string | undefined> {
  try {
    const res = await fetch(checksumUrl(version), { next: { revalidate: 600 } });
    if (!res.ok) return undefined;
    const hash = (await res.text()).trim().split(/\s+/)[0]?.toLowerCase();
    return hash && /^[0-9a-f]{64}$/.test(hash) ? hash : undefined;
  } catch {
    return undefined;
  }
}
