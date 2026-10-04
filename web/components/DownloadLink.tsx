"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Page language, e.g. "da". */
  locale: string;
  /** Where on the page the link sits: header, hero, footer, features, download, cta, content, guide. */
  place: string;
  /** "dmg" = direct download of the latest DMG, "releases" = the GitHub releases page. */
  kind?: "dmg" | "releases";
};

/**
 * A link to the DMG or the GitHub releases that counts the click as a Vercel Analytics custom event
 * (`download_click` with lang, place and target). Anonymous: Vercel Analytics sets no cookies and the event carries
 * no personal data. Plain navigation still works if the script is blocked.
 */
export default function DownloadLink({ locale, place, kind = "dmg", onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        try {
          track("download_click", { lang: locale, place, target: kind });
        } catch {
          // Analytics must never get in the way of the download.
        }
      }}
    >
      {children}
    </a>
  );
}
