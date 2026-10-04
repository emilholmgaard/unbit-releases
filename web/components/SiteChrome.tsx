import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { DOWNLOAD_URL } from "@/lib/site";
import { alternativesPath } from "@/lib/competitors";
import { bestPath, guidePath } from "@/lib/guides";
import { featuresPath } from "@/lib/features";
import { helpPath } from "@/lib/help";
import { LAWYERS_CONTENT } from "@/lib/lawyers-content";
import { hasLawyersPage, lawyersPath } from "@/lib/lawyers";
import DownloadLink from "@/components/DownloadLink";

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
        <DownloadLink locale={locale} place="header" kind="releases" className="pill dark small hide-sm" href={RELEASES}>{t.nav.releases}</DownloadLink>
        <DownloadLink locale={locale} place="header" className="pill white small" href={DOWNLOAD_URL}>{t.nav.download}</DownloadLink>
      </div>
    </header>
  );
}

/** Same footer as the home page, including links to the guides and alternatives indexes. */
export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="footer">
      <div className="foot-brand">
        <a className="brand" href={`/${locale}`}><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
        <p>© 2026 Unbit</p>
        <p className="site-note">{t.footer.siteNote}</p>
      </div>
      <div className="foot-cols">
        <div>
          <h2>{t.footer.product}</h2>
          <DownloadLink locale={locale} place="footer" href={DOWNLOAD_URL}>{t.nav.download}</DownloadLink>
          <a href={`/${locale}#how`}>{t.nav.how}</a>
          <a href={`/${locale}#features`}>{t.nav.features}</a>
          <a href={featuresPath(locale)}>{t.features.more.seeAll}</a>
          <a href={`/${locale}#privacy`}>{t.nav.privacy}</a>
        </div>
        <div>
          <h2>{t.footer.resources}</h2>
          <a href={`/${locale}#faq`}>{t.nav.faq}</a>
          <a href={guidePath(locale)}>{t.footer.guides}</a>
          <a href={helpPath(locale)}>{t.footer.help}</a>
          <a href={bestPath(locale)}>{t.guides.bestTitle}</a>
          <a href={alternativesPath(locale)}>{t.footer.alternatives}</a>
          {hasLawyersPage(locale) && <a href={lawyersPath(locale)}>{LAWYERS_CONTENT[locale].footerLabel}</a>}
          <DownloadLink locale={locale} place="footer" kind="releases" href={`${RELEASES}`}>{t.footer.releaseNotes}</DownloadLink>
          <a href="https://github.com/emilholmgaard/unbit-releases">{t.footer.github}</a>
        </div>
      </div>
      <p className="legal">{t.footer.legal}</p>
    </footer>
  );
}
