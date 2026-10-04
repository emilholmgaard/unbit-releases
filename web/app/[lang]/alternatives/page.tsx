import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { alternativesPath, competitors } from "@/lib/competitors";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";
import DownloadLink from "@/components/DownloadLink";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { alternatives: a } = await getDictionary();
  const path = alternativesPath(locale);
  return {
    title: a.index.metaTitle,
    description: a.index.metaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, alternativesPath(l)])), "x-default": alternativesPath("en") },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: a.index.ogTitle,
      description: a.index.metaDescription,
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: a.index.ogTitle }],
    },
    twitter: { card: "summary_large_image", title: a.index.ogTitle, description: a.index.metaDescription, images: ["/og.png"] },
  };
}

export default async function AlternativesIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const a = t.alternatives;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: a.index.h1,
    description: a.index.metaDescription,
    inLanguage: locale,
    url: `${SITE_URL}${alternativesPath(locale)}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: competitors.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.index.cardTitle.replace("{name}", c.name),
        url: `${SITE_URL}${alternativesPath(locale, c.slug)}`,
      })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <section className="hero alt-hero">
          <h1>{a.index.h1}</h1>
          <p className="sub">{a.index.sub}</p>
          <div className="actions">
            <DownloadLink locale={locale} place="hero" className="pill white" href={DOWNLOAD_URL}>{t.hero.download}</DownloadLink>
            <a className="pill dark" href={`/${locale}`}>Unbit</a>
          </div>
        </section>

        <section className="alt-list" aria-label={a.index.h1}>
          {competitors.map((c) => (
            <a key={c.slug} className="card alt-card" href={alternativesPath(locale, c.slug)}>
              <h2>{a.index.cardTitle.replace("{name}", c.name)}</h2>
              <p>{a.competitors[c.key].tagline}</p>
              <span className="alt-more">{a.index.cardCta} <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </section>

        <p className="alt-disclaimer">{a.page.disclaimer.replace("{name}", competitors.map((c) => c.name).join(", ")).replace("{date}", new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date("2026-10-01T00:00:00Z")))}</p>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
