"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { languages, locales, type Locale } from "@/lib/i18n";

/** Swap the leading locale segment, so the visitor stays on the equivalent page (e.g. /da/foo -> /de/foo). */
function hrefFor(pathname: string, target: Locale) {
  const rest = pathname.split("/").slice(2).join("/");
  // The lawyers page only exists in Danish (advokater) and English (lawyers); other languages go to the home page.
  if (rest === "advokater" || rest === "lawyers") return target === "da" ? "/da/advokater" : target === "en" ? "/en/lawyers" : `/${target}`;
  return `/${target}${rest ? `/${rest}` : ""}`;
}

/** Lightweight language dropdown (disclosure pattern): plain links, so it works without client-side routing state. */
export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = languages[locale];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const items = () => Array.from(root.current?.querySelectorAll<HTMLAnchorElement>("[data-lang-item]") ?? []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      button.current?.focus();
      return;
    }
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        requestAnimationFrame(() => items()[0]?.focus());
      } else list[(index + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      list[(index <= 0 ? list.length : index) - 1]?.focus();
    } else if (e.key === "Home" && open && index >= 0) {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === "End" && open && index >= 0) {
      e.preventDefault();
      list[list.length - 1]?.focus();
    }
  };

  return (
    <div className="lang" ref={root} onKeyDown={onKeyDown} onBlur={(e) => { if (open && !root.current?.contains(e.relatedTarget as Node | null)) setOpen(false); }}>
      <button
        ref={button}
        type="button"
        className="lang-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${label}: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`fi fi-${current.flag}`} aria-hidden="true" />
        <span className="lang-name">{current.name}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" /></svg>
      </button>
      <ul id={menuId} className="lang-menu" hidden={!open}>
        {locales.map((l) => (
          <li key={l}>
            <a
              data-lang-item
              href={hrefFor(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={`fi fi-${languages[l].flag}`} aria-hidden="true" />
              {languages[l].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
