import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import GuideText from "@/components/GuideText";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { alternativesPath, competitors } from "@/lib/competitors";
import { BEST_MODIFIED, BEST_PUBLISHED, GUIDES, bestPath, formatGuideDate, guidePath, plain } from "@/lib/guides";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL, latestRelease } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";
import { getGuideContent } from "../guide/content";
import { getBestContent } from "./content";

export const revalidate = 600;

/** Display order of the products. `slug` is the matching /alternatives page (none for Unbit itself). */
type ProductKey = "unbit" | "iboysoft" | "hasleo" | "uubyte" | "anylinuxfs" | "parallels";
const PRODUCTS: { key: ProductKey; name: string; slug?: string }[] = [
  { key: "unbit", name: "Unbit" },
  ...(["iboysoft", "hasleo", "uubyte", "anylinuxfs", "parallels"] as const).map((key) => {
    const c = competitors.find((x) => x.key === key)!;
    return { key, name: c.name, slug: c.slug };
  }),
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { meta } = await getBestContent();
  const path = bestPath(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, bestPath(l)])), "x-default": bestPath("en") },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title: meta.ogTitle,
      description: meta.description,
      publishedTime: BEST_PUBLISHED,
      modifiedTime: BEST_MODIFIED,
      authors: ["Unbit"],
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: meta.ogTitle }],
    },
    twitter: { card: "summary_large_image", title: meta.ogTitle, description: meta.description, images: ["/og.png"] },
  };
}

export default async function BestBitLockerForMac() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const b = await getBestContent();
  const g = await getGuideContent();
  const { minOS } = await latestRelease();
  const url = `${SITE_URL}${bestPath(locale)}`;
  const fill = (text: string) => text.replaceAll("{minOS}", minOS);
  const productUrl = (slug?: string) => `${SITE_URL}${slug ? alternativesPath(locale, slug) : `/${locale}`}`;
  const updated = b.ui.updated.replace("{date}", formatGuideDate(BEST_MODIFIED, locale));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: b.h1,
      description: b.meta.description,
      inLanguage: locale,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${SITE_URL}/og.png`,
      datePublished: BEST_PUBLISHED,
      dateModified: BEST_MODIFIED,
      author: { "@type": "Organization", name: "Unbit", url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: "Unbit", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: b.h1,
      inLanguage: locale,
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: productUrl(p.slug),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: b.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Unbit", item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: b.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <article className="guide best">
          <nav className="crumbs" aria-label={b.ui.breadcrumb}>
            <a href={`/${locale}`}>Unbit</a><span aria-hidden="true">/</span><span>{b.h1}</span>
          </nav>
          <header className="guide-head">
            <h1>{b.h1}</h1>
            <p className="guide-meta">{updated}</p>
            <p className="guide-lead"><GuideText text={fill(b.lead)} locale={locale} /></p>
            <p className="best-disclosure"><GuideText text={b.disclosure} locale={locale} /></p>
          </header>

          <section className="guide-section" aria-labelledby="quick-title">
            <h2 id="quick-title">{b.quick.title}</h2>
            <ul className="guide-bullets">
              {b.quick.items.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
            </ul>
          </section>

          <section className="guide-section" aria-labelledby="how-title">
            <h2 id="how-title">{b.how.title}</h2>
            {b.how.intro.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
            <ul className="guide-bullets">
              {b.how.criteria.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
            </ul>
            {b.how.outro.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
          </section>

          <section className="guide-section best-compare" id="compare" aria-labelledby="compare-title">
            <h2 id="compare-title">{b.table.title}</h2>
            <div className="alt-table-wrap">
              <table className="alt-table best-table">
                <caption className="sr-only">{b.table.title}</caption>
                <thead>
                  <tr>
                    <th scope="col">{b.table.columns.tool}</th>
                    <th scope="col">{b.table.columns.price}</th>
                    <th scope="col">{b.table.columns.write}</th>
                    <th scope="col">{b.table.columns.silicon}</th>
                    <th scope="col">{b.table.columns.setup}</th>
                    <th scope="col">{b.table.columns.unlock}</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => {
                    const r = b.table.rows[p.key];
                    const us = p.key === "unbit" ? "us" : undefined;
                    return (
                      <tr key={p.key}>
                        <th scope="row"><strong>{p.name}</strong><span className="best-type">{r.type}</span></th>
                        <td className={us} data-label={b.table.columns.price}>{r.price}</td>
                        <td className={us} data-label={b.table.columns.write}>{r.write}</td>
                        <td className={us} data-label={b.table.columns.silicon}>{r.silicon}</td>
                        <td className={us} data-label={b.table.columns.setup}>{r.setup}</td>
                        <td className={us} data-label={b.table.columns.unlock}>{r.unlock}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="alt-disclaimer">{b.table.note}</p>
          </section>

          <section className="guide-section" aria-labelledby="products-title">
            <h2 id="products-title">{b.products.title}</h2>
            {PRODUCTS.map((p) => {
              const d = b.products.items[p.key];
              return (
                <div key={p.key} className="best-product" id={p.key}>
                  <h3>{p.name}</h3>
                  <p className="best-for"><strong>{b.products.bestFor}</strong> {d.bestFor}</p>
                  <p><GuideText text={fill(d.text)} locale={locale} /></p>
                  <div className="alt-pick-grid best-pros">
                    <div className="card">
                      <h4>{b.products.pros}</h4>
                      <ul className="ticks">{d.pros.map((x) => (<li key={x}>{fill(x)}</li>))}</ul>
                    </div>
                    <div className="card">
                      <h4>{b.products.cons}</h4>
                      <ul className="ticks cons">{d.cons.map((x) => (<li key={x}>{fill(x)}</li>))}</ul>
                    </div>
                  </div>
                  {p.slug ? (
                    <p><a href={alternativesPath(locale, p.slug)}>{b.products.compare.replace("{name}", p.name)} <span aria-hidden="true">→</span></a></p>
                  ) : (
                    <p><a href={DOWNLOAD_URL}>{t.nav.download}</a> · <a href={guidePath(locale, GUIDES[0].slug)}>{g.articles.open.h1}</a></p>
                  )}
                </div>
              );
            })}
          </section>

          <section className="guide-section" aria-labelledby="pick-title">
            <h2 id="pick-title">{b.pick.title}</h2>
            {b.pick.paragraphs.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
          </section>

          <section className="faq guide-faq" aria-labelledby="faq-title">
            <h2 id="faq-title">{g.ui.faqTitle}</h2>
            <div className="faq-list">
              {b.faq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p><GuideText text={item.a} locale={locale} /></p>
                </details>
              ))}
            </div>
          </section>

          <section className="guide-related" aria-labelledby="related-title">
            <h2 id="related-title">{b.related}</h2>
            <div className="alt-list">
              {GUIDES.map((x) => (
                <a key={x.slug} className="card alt-card" href={guidePath(locale, x.slug)}>
                  <h3>{g.articles[x.key].h1}</h3>
                  <p>{g.articles[x.key].summary}</p>
                  <span className="alt-more">{g.ui.readMore} <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </section>

          <p className="alt-disclaimer">{b.disclaimer.replace("{date}", formatGuideDate(BEST_MODIFIED, locale))}</p>
        </article>

        <section className="cta grad-cta">
          <h2>{g.ui.ctaTitle}</h2>
          <p>{g.ui.ctaText}</p>
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.cta.download}</a>
            <a className="pill dark" href={alternativesPath(locale)}>{t.footer.alternatives}</a>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
