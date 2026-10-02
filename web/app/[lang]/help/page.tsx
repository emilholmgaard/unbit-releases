import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HELP_MODIFIED, HELP_REASONS, helpPath } from "@/lib/help";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";
import { getHelpContent } from "./content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { ui } = await getHelpContent();
  const path = helpPath(locale);
  return {
    title: ui.indexMetaTitle,
    description: ui.indexMetaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, helpPath(l)])), "x-default": helpPath("en") },
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

export default async function HelpIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const { ui, reasons } = await getHelpContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ui.indexH1,
    description: ui.indexMetaDescription,
    inLanguage: locale,
    url: `${SITE_URL}${helpPath(locale)}`,
    dateModified: HELP_MODIFIED,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: HELP_REASONS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: reasons[r.slug].title,
        url: `${SITE_URL}${helpPath(locale, r.slug)}`,
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
          {HELP_REASONS.map((r) => (
            <a key={r.slug} className="card alt-card" href={helpPath(locale, r.slug)}>
              <h2>{reasons[r.slug].title}</h2>
              <p>{reasons[r.slug].meaning}</p>
              <span className="alt-more">{ui.readMore} <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </section>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
