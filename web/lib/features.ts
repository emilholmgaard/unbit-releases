import type { Locale } from "@/lib/i18n";

/** The all-features page (/[lang]/features). Its copy is `features.more` in the dictionaries; only released features may be listed there. */
export const FEATURES_MODIFIED = "2026-10-03";
export const featuresPath = (locale: Locale) => `/${locale}/features`;

/** Line icons for the groups in `features.more.groups`, in the same order (24×24, stroke only). */
export const GROUP_ICONS: readonly string[] = [
  // Opening your drive: padlock
  '<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 7.6-1.7"/>',
  // Find and copy files: magnifier
  '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  // Safe by design: shield with a check
  '<path d="M12 3 5 6v5.5c0 4.4 3 7.7 7 9.5 4-1.8 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.2 10"/>',
  // Menu bar and looks: window with a menu bar
  '<rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M3 9.5h18"/><path d="M7 7h.01M10 7h.01"/>',
  // Help and transparency: life ring
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
];
