"use client";

import { useEffect } from "react";

/** Elements that fade in and slide up when scrolled into view (the hero animates on load via CSS). */
export const REVEAL_SELECTOR = [
  ".mockup",
  ".section-head",
  ".grid.three > *",
  ".features-note",
  ".spotlight > *",
  ".download-row > *",
  ".faq > *",
  ".cta",
  ".footer > *",
].join(", ");

/**
 * Scroll-triggered fade-in. Content is visible without JS: an inline script in <head> only adds
 * `js-reveal` to <html> when JS runs and reduced motion is off, and removes it again if this
 * component never mounts.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    if (!root.classList.contains("js-reveal")) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    // Small stagger between siblings that reveal together (max 4 steps).
    for (const el of elements) {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL_SELECTOR)) : [];
      const index = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 80}ms`);
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
