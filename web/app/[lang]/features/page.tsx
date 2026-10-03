import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { FEATURES_MODIFIED, GROUP_ICONS, featuresPath } from "@/lib/features";
import { languages, locales } from "@/lib/i18n";
import { DOWNLOAD_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const { features, hero } = await getDictionary();
  const { metaTitle, metaDescription, title } = features.more;
  const path = featuresPath(locale);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(locales.map((l) => [l, featuresPath(l)])), "x-default": featuresPath("en") },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title,
      description: metaDescription,
      locale: languages[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => languages[l].ogLocale),
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${hero.h1After} – ${title}` }],
    },
    twitter: { card: "summary_large_image", title, description: metaDescription, images: ["/og.png"] },
  };
}

const split = (item: string) => {
  const [name, ...rest] = item.split(" – ");
  return { name, text: rest.join(" – ") };
};

export default async function FeaturesPage() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const more = t.features.more;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: more.title,
    description: more.metaDescription,
    inLanguage: locale,
    url: `${SITE_URL}${featuresPath(locale)}`,
    dateModified: FEATURES_MODIFIED,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    about: { "@type": "SoftwareApplication", name: "Unbit", applicationCategory: "UtilitiesApplication", operatingSystem: "macOS", url: `${SITE_URL}/${locale}` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: more.groups
        .flatMap((group) => group.items.map((item) => split(item).name))
        .map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} t={t} />
      <main>
        <section className="hero alt-hero">
          <h1>{more.title}</h1>
          <p className="sub">{more.intro}</p>
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.hero.download}</a>
            <a className="pill dark" href={`/${locale}`}>Unbit</a>
          </div>
        </section>

        <nav className="fx-jump" aria-label={more.jump}>
          {more.groups.map((group, i) => (
            <a key={group.title} href={`#group-${i + 1}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: GROUP_ICONS[i] }} />
              {group.title}
            </a>
          ))}
        </nav>

        {more.groups.map((group, i) => (
          <section className="fx-group" id={`group-${i + 1}`} key={group.title} aria-labelledby={`group-${i + 1}-title`}>
            <div className="fx-head">
              <span className="fx-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: GROUP_ICONS[i] }} />
              </span>
              <h2 id={`group-${i + 1}-title`}>{group.title}</h2>
            </div>
            <ul className="fx-grid">
              {group.items.map((item) => {
                const { name, text } = split(item);
                return (
                  <li className="card fx-item" key={name}>
                    <h3>{name}</h3>
                    {text ? <p>{text}</p> : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="fx-end">
          <div className="actions">
            <a className="pill white" href={DOWNLOAD_URL}>{t.hero.download}</a>
            <a className="pill dark" href={`/${locale}#faq`}>{t.faq.title}</a>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
