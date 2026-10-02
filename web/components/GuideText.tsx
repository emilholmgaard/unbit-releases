import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { alternativesPath } from "@/lib/competitors";
import { GUIDES, bestPath, guidePath } from "@/lib/guides";
import { DOWNLOAD_URL, SITE_URL } from "@/lib/site";

/** Resolves a link target used in guide copy: a guide key (open, safe, drives, usb, togo, recovery), `home`, `alternatives`, `best` `download` or an absolute https:// URL (opens in a new tab). */
export function linkTarget(locale: Locale, target: string): string {
  if (/^https:\/\//.test(target)) return target;
  const guide = GUIDES.find((g) => g.key === target);
  if (guide) return guidePath(locale, guide.slug);
  if (target === "home") return `/${locale}`;
  if (target === "alternatives") return alternativesPath(locale);
  if (target === "best") return bestPath(locale);
  if (target === "download") return DOWNLOAD_URL;
  throw new Error(`Unknown guide link target: ${target}`);
}

/** Renders text with `[label](target)` internal links and `**bold**` spans. */
export default function GuideText({ text, locale }: { text: string; locale: Locale }): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[3] !== undefined) parts.push(<strong key={match.index}>{match[3]}</strong>);
    else {
      const href = linkTarget(locale, match[2]);
      const external = href.startsWith("https://") && !href.startsWith(SITE_URL);
      parts.push(external
        ? <a key={match.index} href={href} target="_blank" rel="noopener noreferrer">{match[1]}</a>
        : <a key={match.index} href={href}>{match[1]}</a>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
