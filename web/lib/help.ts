import type { Locale } from "@/lib/i18n";
import type { GuideKey } from "@/lib/guides";

/**
 * Error help pages (/[lang]/help/[reason]). The app's "Learn More" button on an error opens
 * https://unbit.app/<language>/help/<reason>, where <reason> is the kebab-case form of the reason code in the app's
 * error report (OpenFailure.Reason, e.g. wrongPassword -> wrong-password). Keep this list in sync with that enum.
 * Copy lives in app/[lang]/help/content/<locale>.json; every reason belongs to a category that shares its "what to try" steps.
 */
export const HELP_REASONS = [
  { slug: "wrong-password", category: "code" },
  { slug: "wrong-recovery-key", category: "code" },
  { slug: "invalid-input", category: "code" },
  { slug: "saved-password-stale", category: "code" },
  { slug: "saved-recovery-key-stale", category: "code" },
  { slug: "no-password-protector", category: "protector" },
  { slug: "no-recovery-protector", category: "protector" },
  { slug: "no-supported-protector", category: "protector" },
  { slug: "not-bit-locker", category: "notbitlocker" },
  { slug: "not-bit-locker-readable", category: "notbitlocker" },
  { slug: "unsupported-version", category: "unsupported" },
  { slug: "unsupported-encryption", category: "unsupported" },
  { slug: "damaged-metadata", category: "damaged" },
  { slug: "conversion-in-progress", category: "damaged" },
  { slug: "damaged-key", category: "damaged" },
  { slug: "drive-removed", category: "connection" },
  { slug: "drive-stopped-responding", category: "connection" },
  { slug: "read-failed", category: "connection" },
  { slug: "no-access", category: "access" },
  { slug: "admin-access-failed", category: "access" },
  { slug: "admin-prompt-timed-out", category: "access" },
  { slug: "helper-timed-out", category: "access" },
  { slug: "attach-timed-out", category: "timeout" },
  { slug: "timed-out", category: "timeout" },
  { slug: "other", category: "timeout" },
] as const;
export type HelpCategory = (typeof HELP_REASONS)[number]["category"];
export type HelpSlug = (typeof HELP_REASONS)[number]["slug"];

/** Guides shown under each category. */
export const HELP_GUIDES: Record<HelpCategory, readonly GuideKey[]> = {
  code: ["recovery", "open"],
  protector: ["recovery", "togo"],
  notbitlocker: ["open", "usb"],
  unsupported: ["open", "safe"],
  damaged: ["togo", "open"],
  connection: ["usb", "drives"],
  access: ["open", "safe"],
  timeout: ["open", "usb"],
};

export const HELP_PUBLISHED = "2026-10-02";
export const HELP_MODIFIED = "2026-10-02";

export const helpPath = (locale: Locale, slug?: string) => `/${locale}/help${slug ? `/${slug}` : ""}`;
export const getHelpReason = (slug: string) => HELP_REASONS.find((r) => r.slug === slug);
