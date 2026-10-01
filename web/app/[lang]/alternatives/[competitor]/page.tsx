import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LAST_CHECKED, ROW_ORDER, alternativesPath, competitors, formatDate, getCompetitor } from "@/lib/competitors";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL, latestRelease } from "@/lib/site";
import { getDictionary, hasLocale } from "../../dictionaries";

export const revalidate = 600;
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((l) => competitors.map((c) => ({ lang: l, competitor: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/alternatives/[competitor]">): Promise<Metadata> {
  const { competitor: slug } = await params;
  const locale = await lang();
  const c = getCompetitor(slug);
  if (!hasLocale(locale) || !c) notFound();
  const { alternatives: a } = await getDictionary();
  const path = alternativesPath(locale, c.slug);
  const fill = (text: string) => text.replaceAll("{name}", c.name);
  return {
    title: fill(a.page.metaTitle),
    description: fill(a.page.metaDescription),
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, alternativesPath(l, c.slug)])), "x-default": alternativesPath("en", c.slug) },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: fill(a.page.ogTitle),
      description: fill(a.page.metaDescription),
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: fill(a.page.ogTitle) }],
    },
    twitter: { card: "summary_large_image", title: fill(a.page.ogTitle), description: fill(a.page.metaDescription), images: ["/og.png"] },
  };
}

export default async function AlternativePage({ params }: PageProps<"/[lang]/alternatives/[competitor]">) {
  const { competitor: slug } = await params;
  const locale = await lang();
  const c = getCompetitor(slug);
  if (!hasLocale(locale) || !c) notFound();
  const t = await getDictionary();
  const a = t.alternatives;
  const data = a.competitors[c.key];
  const { version, minOS, date } = await latestRelease();
  const fill = (text: string) => text.replaceAll("{name}", c.name).replaceAll("{date}", formatDate(LAST_CHECKED, locale)).replaceAll("{minOS}", minOS);
  const cells = data.cells as Partial<Record<string, string>>;
  const rows = ROW_ORDER.filter((key) => cells[key]).map((key) => ({
    key,
    label: a.rows[key].label,
    them: cells[key] as string,
    unbit: fill(a.rows[key].unbit),
  }));
  const faq = [{ q: fill(a.page.faqGeneric.q), a: fill(a.page.faqGeneric.a) }, ...data.faq];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Unbit",
      description: fill(a.page.metaDescription),
      inLanguage: locale,
      url: `${SITE_URL}/${locale}`,
      image: `${SITE_URL}/icon.png`,
      operatingSystem: `macOS ${minOS} or later`,
      applicationCategory: "UtilitiesApplication",
      softwareVersion: version,
      ...(date ? { datePublished: date } : {}),
      downloadUrl: DOWNLOAD_URL,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: "Emil Holmgaard" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Unbit", item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: a.index.h1, item: `${SITE_URL}${alternativesPath(locale)}` },
        { "@type": "ListItem", position: 3, name: fill(a.page.h1), item: `${SITE_URL}${alternativesPath(locale, c.slug)}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <section className="hero alt-hero">
          <a className="badge" href={alternativesPath(locale)}>
            <span aria-hidden="true">←</span>&nbsp;<strong>{a.page.back}</strong>
          </a>
          <h1>{fill(a.page.h1)}</h1>
          <p className="sub">{fill(a.page.sub)}</p>
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.hero.download}</a>
            <a className="pill dark" href="#compare">{a.page.compareLink}</a>
          </div>
          <p className="meta">{t.hero.metaVersion.replace("{version}", version).replace("{minOS}", minOS)} · {fill(a.page.lastChecked)}</p>
        </section>

        <section className="alt-intro">
          <p>{data.intro}</p>
        </section>

        <section className="alt-compare" id="compare" aria-labelledby="compare-title">
          <h2 id="compare-title">{fill(a.page.tableTitle)}</h2>
          <div className="alt-table-wrap">
            <table className="alt-table">
              <caption className="sr-only">{fill(a.page.tableTitle)}</caption>
              <thead>
                <tr>
                  <th scope="col">{a.page.feature}</th>
                  <th scope="col" className="us">Unbit</th>
                  <th scope="col">{c.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.label}</th>
                    <td className="us" data-label="Unbit">{row.unbit}</td>
                    <td data-label={c.name}>{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="alt-pick" aria-labelledby="pick-title">
          <h2 id="pick-title">{a.page.pickTitle}</h2>
          <div className="alt-pick-grid">
            <div className="card">
              <h3>{fill(a.page.pickThem)}</h3>
              <ul className="ticks">
                {data.themPick.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
            <div className="card">
              <h3>{a.page.pickUnbit}</h3>
              <ul className="ticks">
                {data.unbitPick.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        </section>

        <section className="faq" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">{a.page.faqTitle}</h2>
          <div className="faq-list">
            {faq.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="alt-sources" aria-labelledby="sources-title">
          <h2 id="sources-title">{a.page.sourcesTitle}</h2>
          <p>{fill(a.page.sourcesText)}</p>
          <ul>
            {c.sources.map((s) => (
              <li key={s.url}><a href={s.url} rel="noopener noreferrer nofollow" target="_blank">{s.label}</a></li>
            ))}
          </ul>
          <p className="alt-disclaimer">{fill(a.page.disclaimer)}</p>
        </section>

        <section className="cta grad-cta">
          <h2>{a.page.ctaTitle}</h2>
          <p>{a.page.ctaText}</p>
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.cta.download}</a>
            <a className="pill dark" href={alternativesPath(locale)}>{a.page.back}</a>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
