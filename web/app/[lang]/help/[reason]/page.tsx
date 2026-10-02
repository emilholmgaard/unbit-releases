import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { formatGuideDate, guidePath, guideSlug } from "@/lib/guides";
import { HELP_GUIDES, HELP_MODIFIED, HELP_PUBLISHED, HELP_REASONS, getHelpReason, helpPath } from "@/lib/help";
import { languages, locales } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../../dictionaries";
import { getGuideContent } from "../../guide/content";
import { getHelpContent } from "../content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((l) => HELP_REASONS.map((r) => ({ lang: l, reason: r.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/help/[reason]">): Promise<Metadata> {
  const { reason } = await params;
  const locale = await lang();
  const entry = getHelpReason(reason);
  if (!hasLocale(locale) || !entry) notFound();
  const { ui, reasons } = await getHelpContent();
  const r = reasons[entry.slug];
  const title = ui.metaTitle.replace("{title}", r.title);
  const description = r.meaning;
  const path = helpPath(locale, entry.slug);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, helpPath(l, entry.slug)])), "x-default": helpPath("en", entry.slug) },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime: HELP_PUBLISHED,
      modifiedTime: HELP_MODIFIED,
      authors: ["Unbit"],
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function HelpReason({ params }: PageProps<"/[lang]/help/[reason]">) {
  const { reason } = await params;
  const locale = await lang();
  const entry = getHelpReason(reason);
  if (!hasLocale(locale) || !entry) notFound();
  const t = await getDictionary();
  const { ui, categories, reasons } = await getHelpContent();
  const { articles, ui: guideUi } = await getGuideContent();
  const r = reasons[entry.slug];
  const steps = categories[entry.category].steps;
  const url = `${SITE_URL}${helpPath(locale, entry.slug)}`;
  const guides = HELP_GUIDES[entry.category];
  const others = HELP_REASONS.filter((o) => o.slug !== entry.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: r.title,
      description: r.meaning,
      inLanguage: locale,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${SITE_URL}/og.png`,
      datePublished: HELP_PUBLISHED,
      dateModified: HELP_MODIFIED,
      author: { "@type": "Organization", name: "Unbit", url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: "Unbit", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Unbit", item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: ui.helpLabel, item: `${SITE_URL}${helpPath(locale)}` },
        { "@type": "ListItem", position: 3, name: r.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <article className="guide">
          <nav className="crumbs" aria-label={ui.breadcrumb}>
            <a href={`/${locale}`}>Unbit</a><span aria-hidden="true">/</span><a href={helpPath(locale)}>{ui.helpLabel}</a>
          </nav>
          <header className="guide-head">
            <h1>{r.title}</h1>
            <p className="guide-meta">{guideUi.updated.replace("{date}", formatGuideDate(HELP_MODIFIED, locale))}</p>
          </header>

          <section className="guide-section" aria-labelledby="meaning">
            <h2 id="meaning">{ui.whatItMeans}</h2>
            <p>{r.meaning}</p>
          </section>

          <section className="guide-section" aria-labelledby="try">
            <h2 id="try">{ui.whatToTry}</h2>
            <ol className="guide-steps">
              {steps.map((s) => (<li key={s}>{s}</li>))}
            </ol>
          </section>

          <section className="guide-section" aria-labelledby="stuck">
            <h2 id="stuck">{ui.stillStuckTitle}</h2>
            <p>{ui.stillStuckText}</p>
          </section>

          <section className="guide-related" aria-labelledby="related-title">
            <h2 id="related-title">{ui.guidesTitle}</h2>
            <div className="alt-list">
              {guides.map((key) => (
                <a key={key} className="card alt-card" href={guidePath(locale, guideSlug(key))}>
                  <h3>{articles[key].h1}</h3>
                  <p>{articles[key].summary}</p>
                  <span className="alt-more">{guideUi.readMore} <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </section>

          <section className="guide-related" aria-labelledby="others-title">
            <h2 id="others-title">{ui.otherTitle}</h2>
            <ul className="guide-bullets">
              {others.map((o) => (<li key={o.slug}><a href={helpPath(locale, o.slug)}>{reasons[o.slug].title}</a></li>))}
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
