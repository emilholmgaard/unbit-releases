import type { Metadata } from "next";
import Image from "next/image";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import GuideText from "@/components/GuideText";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GUIDES, GUIDES_MODIFIED, GUIDES_PUBLISHED, formatGuideDate, getGuide, guidePath, plain } from "@/lib/guides";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../../dictionaries";
import { getGuideContent } from "../content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((l) => GUIDES.map((g) => ({ lang: l, slug: g.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/guide/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await lang();
  const guide = getGuide(slug);
  if (!hasLocale(locale) || !guide) notFound();
  const { articles } = await getGuideContent();
  const a = articles[guide.key];
  const path = guidePath(locale, guide.slug);
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, guidePath(l, guide.slug)])), "x-default": guidePath("en", guide.slug) },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title: a.metaTitle,
      description: a.metaDescription,
      publishedTime: GUIDES_PUBLISHED,
      modifiedTime: GUIDES_MODIFIED,
      authors: ["Unbit"],
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: a.metaTitle }],
    },
    twitter: { card: "summary_large_image", title: a.metaTitle, description: a.metaDescription, images: ["/og.png"] },
  };
}

export default async function GuideArticle({ params }: PageProps<"/[lang]/guide/[slug]">) {
  const { slug } = await params;
  const locale = await lang();
  const guide = getGuide(slug);
  if (!hasLocale(locale) || !guide) notFound();
  const t = await getDictionary();
  const { ui, articles } = await getGuideContent();
  const a = articles[guide.key];
  const url = `${SITE_URL}${guidePath(locale, guide.slug)}`;
  const related = GUIDES.filter((g) => g.key !== guide.key);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.h1,
      description: a.metaDescription,
      inLanguage: locale,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${SITE_URL}/og.png`,
      datePublished: GUIDES_PUBLISHED,
      dateModified: GUIDES_MODIFIED,
      author: { "@type": "Organization", name: "Unbit", url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: "Unbit", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: a.faq.map((item) => ({
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
        { "@type": "ListItem", position: 2, name: ui.guides, item: `${SITE_URL}${guidePath(locale)}` },
        { "@type": "ListItem", position: 3, name: a.h1, item: url },
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
            <a href={`/${locale}`}>Unbit</a><span aria-hidden="true">/</span><a href={guidePath(locale)}>{ui.guides}</a>
          </nav>
          <header className="guide-head">
            <h1>{a.h1}</h1>
            <p className="guide-meta">{ui.updated.replace("{date}", formatGuideDate(GUIDES_MODIFIED, locale))}</p>
            <p className="guide-lead"><GuideText text={a.lead} locale={locale} /></p>
          </header>

          {a.sections.map((s, i) => (
            <section key={s.title} className="guide-section" aria-labelledby={`s${i + 1}`}>
              <h2 id={`s${i + 1}`}>{s.title}</h2>
              {s.intro.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
              {s.steps.length > 0 && (
                <ol className="guide-steps">
                  {s.steps.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
                </ol>
              )}
              {s.bullets.length > 0 && (
                <ul className="guide-bullets">
                  {s.bullets.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
                </ul>
              )}
              {s.outro.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
              {guide.key === "open" && i === 2 && (
                <div className="guide-shots">
                  <figure>
                    <Image src="/shot-unlock.png" unoptimized width={340} height={568} sizes="(max-width: 600px) 80vw, 300px" loading="lazy" alt={t.mockup.unlockAlt} />
                    <figcaption>{t.mockup.unlockCaption}</figcaption>
                  </figure>
                  <figure>
                    <Image src="/shot-open.png" unoptimized width={340} height={461} sizes="(max-width: 600px) 80vw, 300px" loading="lazy" alt={t.mockup.openAlt} />
                    <figcaption>{t.mockup.openCaption}</figcaption>
                  </figure>
                </div>
              )}
            </section>
          ))}

          <section className="faq guide-faq" aria-labelledby="faq-title">
            <h2 id="faq-title">{ui.faqTitle}</h2>
            <div className="faq-list">
              {a.faq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p><GuideText text={item.a} locale={locale} /></p>
                </details>
              ))}
            </div>
          </section>

          <section className="guide-related" aria-labelledby="related-title">
            <h2 id="related-title">{ui.relatedTitle}</h2>
            <div className="alt-list">
              {related.map((g) => (
                <a key={g.slug} className="card alt-card" href={guidePath(locale, g.slug)}>
                  <h3>{articles[g.key].h1}</h3>
                  <p>{articles[g.key].summary}</p>
                  <span className="alt-more">{ui.readMore} <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </section>
        </article>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
