import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GUIDES, bestPath, guidePath } from "@/lib/guides";
import { languages, locales } from "@/lib/i18n";
import { hasLawyersPage, lawyersPath } from "@/lib/lawyers";
import { LAWYERS_CONTENT } from "@/lib/lawyers-content";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";
import { getGuideContent } from "./content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { ui } = await getGuideContent();
  const path = guidePath(locale);
  return {
    title: ui.indexMetaTitle,
    description: ui.indexMetaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, guidePath(l)])), "x-default": guidePath("en") },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: ui.indexH1,
      description: ui.indexMetaDescription,
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: ui.indexH1 }],
    },
    twitter: { card: "summary_large_image", title: ui.indexH1, description: ui.indexMetaDescription, images: ["/og.png"] },
  };
}

export default async function GuideIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const { ui, articles } = await getGuideContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ui.indexH1,
    description: ui.indexMetaDescription,
    inLanguage: locale,
    url: `${SITE_URL}${guidePath(locale)}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: articles[g.key].h1,
        url: `${SITE_URL}${guidePath(locale, g.slug)}`,
      })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <section className="hero alt-hero">
          <h1>{ui.indexH1}</h1>
          <p className="sub">{ui.indexSub}</p>
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.hero.download}</a>
            <a className="pill dark" href={`/${locale}`}>Unbit</a>
          </div>
        </section>

        <section className="alt-list guide-list" aria-label={ui.indexH1}>
          {GUIDES.map((g) => (
            <a key={g.slug} className="card alt-card" href={guidePath(locale, g.slug)}>
              <h2>{articles[g.key].h1}</h2>
              <p>{articles[g.key].summary}</p>
              <span className="alt-more">{ui.readMore} <span aria-hidden="true">→</span></span>
            </a>
          ))}
          <a className="card alt-card best-callout" href={bestPath(locale)}>
            <h2>{t.guides.bestTitle}</h2>
            <p>{t.guides.bestText}</p>
            <span className="alt-more">{t.guides.bestCta} <span aria-hidden="true">→</span></span>
          </a>
          {hasLawyersPage(locale) && (
            <a className="card alt-card best-callout" href={lawyersPath(locale)}>
              <h2>{LAWYERS_CONTENT[locale].indexCard.title}</h2>
              <p>{LAWYERS_CONTENT[locale].indexCard.text}</p>
              <span className="alt-more">{LAWYERS_CONTENT[locale].indexCard.cta} <span aria-hidden="true">→</span></span>
            </a>
          )}
        </section>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
