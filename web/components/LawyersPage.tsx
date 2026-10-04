import type { Metadata } from "next";
import GuideText from "@/components/GuideText";
import NoteActions from "@/components/NoteActions";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getGuideContent } from "@/app/[lang]/guide/content";
import { GUIDES, formatGuideDate, guidePath, plain } from "@/lib/guides";
import { languages } from "@/lib/i18n";
import { LAWYERS_MODIFIED, LAWYERS_PUBLISHED, LAWYERS_LOCALES, lawyersPath, type LawyersLocale } from "@/lib/lawyers";
import { LAWYERS_CONTENT } from "@/lib/lawyers-content";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import DownloadLink from "@/components/DownloadLink";

const RELATED = ["open", "usb", "recovery", "safe"] as const;

/** hreflang alternates: only Danish and English exist for this page; x-default is English. */
export function lawyersMetadata(locale: LawyersLocale): Metadata {
  const c = LAWYERS_CONTENT[locale];
  const path = lawyersPath(locale);
  const other = LAWYERS_LOCALES.filter((l) => l !== locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(LAWYERS_LOCALES.map((l) => [l, lawyersPath(l)])), "x-default": lawyersPath("en") },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title: c.meta.ogTitle,
      description: c.meta.description,
      publishedTime: LAWYERS_PUBLISHED,
      modifiedTime: LAWYERS_MODIFIED,
      authors: ["Unbit"],
      locale: languages[locale].ogLocale,
      alternateLocale: other.map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: c.meta.ogTitle }],
    },
    twitter: { card: "summary_large_image", title: c.meta.ogTitle, description: c.meta.description, images: ["/og.png"] },
  };
}

export default async function LawyersPage({ locale }: { locale: LawyersLocale }) {
  const c = LAWYERS_CONTENT[locale];
  const t = await getDictionary();
  const g = await getGuideContent();
  const url = `${SITE_URL}${lawyersPath(locale)}`;
  const noteText = c.note.lines.join("\n");
  const updated = c.updated.replace("{date}", formatGuideDate(LAWYERS_MODIFIED, locale));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: c.h1,
      headline: c.h1,
      description: c.meta.description,
      inLanguage: locale,
      url,
      mainEntityOfPage: url,
      image: `${SITE_URL}/og.png`,
      datePublished: LAWYERS_PUBLISHED,
      dateModified: LAWYERS_MODIFIED,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
      about: { "@type": "SoftwareApplication", name: "Unbit", applicationCategory: "UtilitiesApplication", operatingSystem: "macOS" },
      author: { "@type": "Organization", name: "Unbit", url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: "Unbit", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` } },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: c.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Unbit", item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: g.ui.guides, item: `${SITE_URL}${guidePath(locale)}` },
        { "@type": "ListItem", position: 3, name: c.h1, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <article className="guide lawyers">
          <nav className="crumbs" aria-label={c.breadcrumbLabel}>
            <a href={`/${locale}`}>Unbit</a><span aria-hidden="true">/</span><a href={guidePath(locale)}>{g.ui.guides}</a><span aria-hidden="true">/</span><span>{c.footerLabel}</span>
          </nav>
          <header className="guide-head">
            <h1>{c.h1}</h1>
            <p className="guide-meta">{updated}</p>
            <p className="guide-lead">{c.lead}</p>
            <aside className="best-disclosure lawyers-disclaimer" role="note" aria-label={c.disclaimer.label}>
              <strong>{c.disclaimer.label}.</strong> <GuideText text={c.disclaimer.text} locale={locale} />
            </aside>
            <div className="actions lawyers-actions">
              <DownloadLink locale={locale} place="hero" className="pill white" href={DOWNLOAD_URL}>{c.actions.download}</DownloadLink>
              <a className="pill dark" href={`#${c.note.id}`}>{c.actions.note}</a>
            </div>
          </header>

          {c.sections.map((s) => (
            <section key={s.id} id={s.id} className="guide-section" aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.paragraphs?.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
              {s.steps && (
                <ol className="guide-steps">
                  {s.steps.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
                </ol>
              )}
              {s.bullets && (
                <ul className="guide-bullets">
                  {s.bullets.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
                </ul>
              )}
              {s.outro?.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
            </section>
          ))}

          <section id={c.checklist.id} className="guide-section" aria-labelledby={`${c.checklist.id}-title`}>
            <h2 id={`${c.checklist.id}-title`}>{c.checklist.title}</h2>
            <p>{c.checklist.intro}</p>
            <ul className="checklist">
              {c.checklist.items.map((item) => (<li key={item}>{item}</li>))}
            </ul>
            {c.checklist.outro.map((p) => (<p key={p}><GuideText text={p} locale={locale} /></p>))}
          </section>

          <section id={c.note.id} className="guide-section" aria-labelledby={`${c.note.id}-title`}>
            <h2 id={`${c.note.id}-title`}>{c.note.title}</h2>
            <p>{c.note.intro}</p>
            <NoteActions text={noteText} copy={c.note.copy} copied={c.note.copied} download={c.note.download} filename={c.note.filename} />
            <pre className="note-text" lang={locale} tabIndex={0} aria-label={c.note.textLabel}>{noteText}</pre>
          </section>

          <section className="faq guide-faq" aria-labelledby="faq-title">
            <h2 id="faq-title">{c.faqTitle}</h2>
            <div className="faq-list">
              {c.faq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p><GuideText text={item.a} locale={locale} /></p>
                </details>
              ))}
            </div>
          </section>

          <section id={c.sources.id} className="guide-section" aria-labelledby={`${c.sources.id}-title`}>
            <h2 id={`${c.sources.id}-title`}>{c.sources.title}</h2>
            <p>{c.sources.intro}</p>
            <ul className="guide-bullets">
              {c.sources.items.map((item) => (<li key={item}><GuideText text={item} locale={locale} /></li>))}
            </ul>
            <p>{c.sources.outro}</p>
          </section>

          <section className="guide-related" aria-labelledby="related-title">
            <h2 id="related-title">{c.relatedTitle}</h2>
            <div className="alt-list">
              {RELATED.map((key) => {
                const slug = GUIDES.find((x) => x.key === key)!.slug;
                return (
                  <a key={key} className="card alt-card" href={guidePath(locale, slug)}>
                    <h3>{g.articles[key].h1}</h3>
                    <p>{g.articles[key].summary}</p>
                    <span className="alt-more">{g.ui.readMore} <span aria-hidden="true">→</span></span>
                  </a>
                );
              })}
            </div>
          </section>

          <p className="alt-disclaimer">{c.disclaimer.label}. {plain(c.disclaimer.text)}</p>
        </article>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
