import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { DOWNLOAD_URL } from "@/lib/site";
import { alternativesPath } from "@/lib/competitors";

const RELEASES = "https://github.com/emilholmgaard/unbit-releases/releases";

/** Same header as the home page, with section links pointing back to the home page's anchors (used by the alternatives pages). */
export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <header className="nav-wrap">
      <div className="nav">
        <a className="brand" href={`/${locale}`}><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
        <nav className="links" aria-label={t.nav.label}>
          <a href={`/${locale}#how`}>{t.nav.how}</a>
          <a href={`/${locale}#features`}>{t.nav.features}</a>
          <a href={`/${locale}#privacy`}>{t.nav.privacy}</a>
          <a href={`/${locale}#faq`}>{t.nav.faq}</a>
        </nav>
        <LanguageSwitcher locale={locale} label={t.language.label} />
        <a className="pill dark small hide-sm" href={RELEASES}>{t.nav.releases}</a>
        <a className="pill white small" href={DOWNLOAD_URL}>{t.nav.download}</a>
      </div>
    </header>
  );
}

/** Same footer as the home page, including the link to the alternatives index. */
export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="footer">
      <div className="foot-brand">
        <a className="brand" href={`/${locale}`}><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
        <p>© 2026 Emil Holmgaard</p>
        <p className="site-note">{t.footer.siteNote}</p>
      </div>
      <div className="foot-cols">
        <div>
          <h2>{t.footer.product}</h2>
          <a href={DOWNLOAD_URL}>{t.nav.download}</a>
          <a href={`/${locale}#how`}>{t.nav.how}</a>
          <a href={`/${locale}#features`}>{t.nav.features}</a>
          <a href={`/${locale}#privacy`}>{t.nav.privacy}</a>
        </div>
        <div>
          <h2>{t.footer.resources}</h2>
          <a href={`/${locale}#faq`}>{t.nav.faq}</a>
          <a href={alternativesPath(locale)}>{t.footer.alternatives}</a>
          <a href={`${RELEASES}`}>{t.footer.releaseNotes}</a>
          <a href="https://github.com/emilholmgaard/unbit-releases">{t.footer.github}</a>
        </div>
      </div>
      <p className="legal">{t.footer.legal}</p>
    </footer>
  );
}
