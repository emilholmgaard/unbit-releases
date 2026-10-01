import Image from "next/image";
import { lang } from "next/root-params";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DOWNLOAD_URL, RELEASES_URL, SITE_URL, latestRelease } from "@/lib/site";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export const revalidate = 600;

export default async function Home() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const t = await getDictionary();
  const FAQ = t.faq.items;
  const { version, minOS, date } = await latestRelease();
  const v = (text: string) => text.replace("{version}", version).replace("{minOS}", minOS);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Unbit",
      description: t.meta.description,
      inLanguage: locale,
      url: `${SITE_URL}/${locale}`,
      image: `${SITE_URL}/icon.png`,
      screenshot: [`${SITE_URL}/shot-unlock.png`, `${SITE_URL}/shot-open.png`],
      operatingSystem: `macOS ${minOS} or later`,
      applicationCategory: "UtilitiesApplication",
      softwareVersion: version,
      ...(date ? { datePublished: date } : {}),
      downloadUrl: DOWNLOAD_URL,
      installUrl: DOWNLOAD_URL,
      releaseNotes: RELEASES_URL,
      fileFormat: "application/x-apple-diskimage",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: "Emil Holmgaard" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="nav-wrap">
          <div className="nav">
            <a className="brand" href={`/${locale}`}><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
            <nav className="links" aria-label={t.nav.label}>
              <a href="#how">{t.nav.how}</a>
              <a href="#features">{t.nav.features}</a>
              <a href="#privacy">{t.nav.privacy}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <LanguageSwitcher locale={locale} label={t.language.label} />
            <a className="pill dark small hide-sm" href="https://github.com/emilholmgaard/unbit-releases/releases">{t.nav.releases}</a>
            <a className="pill white small" href={DOWNLOAD_URL}>{t.nav.download}</a>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="hero">
            <a className="badge" href="https://github.com/emilholmgaard/unbit-releases/releases/latest">
              <strong><span>{v(t.hero.badgeHighlight)}</span> {t.hero.badgeRest}</strong><span className="dot">·</span>{t.hero.badgeLink}
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <h1>{t.hero.h1Before} <Image className="inline-icon" src="/icon.png" width={96} height={96} alt="" loading="eager" fetchPriority="high" /> {t.hero.h1After}</h1>
            <p className="sub">{t.hero.sub}</p>
            <div className="actions">
              <a className="pill white" href={DOWNLOAD_URL}>
                <svg aria-hidden="true" width="15" height="18" viewBox="0 0 814 1000" fill="currentColor"><path d="M788 341c-6 4-108 62-108 190 0 149 131 201 135 203-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-167 41s-106-58-156-128C44 791 0 669 0 553c0-186 121-285 240-285 63 0 116 42 156 42 38 0 97-44 169-44 27 0 125 2 190 75zM554 167c30-35 51-84 51-133 0-7-1-14-2-19-48 2-106 32-141 73-27 31-53 80-53 130 0 8 1 15 2 18 3 1 9 1 14 1 43 0 97-29 129-70z"/></svg>
                {t.hero.download}
              </a>
              <a className="pill dark" href="#how">{t.hero.how}</a>
            </div>
            <p className="meta"><span>{v(t.hero.metaVersion)}</span> · {t.hero.metaRest}</p>
          </section>

          {/* App mockup */}
          <section className="mockup" aria-label={t.mockup.label}>
            <div className="menubar" aria-hidden="true">
              <span className="mb-left"><b>Finder</b>{t.mockup.menu.map((item) => (
                  <span key={item}>{item}</span>
                ))}</span>
              <span className="mb-right">
                <span className="readout"><svg width="16" height="12" viewBox="0 0 24 16" fill="currentColor"><rect x="1" y="3" width="22" height="10" rx="3"/></svg>8.4M/s</span>
                <span>{t.mockup.day} 23:54</span>
              </span>
            </div>
            <div className="desk">
              <figure>
                <Image src="/shot-unlock.png" width={320} height={538} alt={t.mockup.unlockAlt} />
                <figcaption>{t.mockup.unlockCaption}</figcaption>
              </figure>
              <figure>
                <Image src="/shot-open.png" width={320} height={431} alt={t.mockup.openAlt} />
                <figcaption>{t.mockup.openCaption}</figcaption>
              </figure>
            </div>
          </section>

          {/* How it works */}
          <section className="section" id="how">
            <div className="section-head">
              <h2>{t.how.title}</h2>
              <p>{t.how.intro}</p>
            </div>
            <div className="grid three">
              <article className="step">
                <span className="num">1</span>
                <h3>{t.how.steps[0].title}</h3>
                <p>{t.how.steps[0].text}</p>
              </article>
              <article className="step">
                <span className="num">2</span>
                <h3>{t.how.steps[1].title}</h3>
                <p>{t.how.steps[1].text}</p>
              </article>
              <article className="step">
                <span className="num">3</span>
                <h3>{t.how.steps[2].title}</h3>
                <p>{t.how.steps[2].text}</p>
              </article>
            </div>
          </section>

          {/* Feature spotlight */}
          <section className="spotlight" aria-labelledby="spot-title">
            <div className="spot-text">
              <h2 id="spot-title">{t.readOnly.title}</h2>
              <p>{t.readOnly.text}</p>
            </div>
            <div className="grad-panel teal" aria-hidden="true"><span>{t.readOnly.panel}</span></div>
          </section>

          {/* Features */}
          <section className="section" id="features">
            <div className="section-head">
              <h2>{t.features.title}</h2>
              <p>{t.features.intro}</p>
            </div>
            <div className="grid three">
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><path d="M8 14h3"/></svg>
                <h3>{t.features.items[0].title}</h3>
                <p>{t.features.items[0].text}</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/></svg>
                <h3>{t.features.items[1].title}</h3>
                <p>{t.features.items[1].text}</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v6a5 5 0 0 1-10 0V7Z"/><path d="M9 3v4M15 3v4M12 18v3"/></svg>
                <h3>{t.features.items[2].title}</h3>
                <p>{t.features.items[2].text}</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4 4 13h16L12 4Z"/><path d="M4 18h16"/></svg>
                <h3>{t.features.items[3].title}</h3>
                <p>{t.features.items[3].text}</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/></svg>
                <h3>{t.features.items[4].title}</h3>
                <p>{t.features.items[4].text}</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/></svg>
                <h3>{t.features.items[5].title}</h3>
                <p>{t.features.items[5].text}</p>
              </article>
            </div>
            <p className="features-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z"/></svg><span><strong>{t.features.languagesTitle}</strong> – {t.features.languagesText}</span></p>
          </section>

          {/* Privacy */}
          <section className="spotlight privacy" id="privacy" aria-labelledby="privacy-title">
            <div className="spot-text">
              <h2 id="privacy-title">{t.privacy.title}</h2>
              <p>{t.privacy.text}</p>
              <ul className="ticks">
                {t.privacy.ticks.map((tick) => (
                  <li key={tick}>{tick}</li>
                ))}
              </ul>
            </div>
            <div className="grad-panel orange" aria-hidden="true"><span>{t.privacy.panelLine1}<br />{t.privacy.panelLine2}</span></div>
          </section>

          {/* Download */}
          <section className="download-row" aria-labelledby="dl-title">
            <div>
              <h2 id="dl-title">{t.download.title}</h2>
              <p>{t.download.text}</p>
            </div>
            <div className="dl-list">
              <a className="dl" href={DOWNLOAD_URL}>
                <svg width="18" height="22" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true"><path d="M788 341c-6 4-108 62-108 190 0 149 131 201 135 203-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-167 41s-106-58-156-128C44 791 0 669 0 553c0-186 121-285 240-285 63 0 116 42 156 42 38 0 97-44 169-44 27 0 125 2 190 75zM554 167c30-35 51-84 51-133 0-7-1-14-2-19-48 2-106 32-141 73-27 31-53 80-53 130 0 8 1 15 2 18 3 1 9 1 14 1 43 0 97-29 129-70z"/></svg>
                <span><strong>macOS</strong><small>{t.download.macosSub} · <span>{version}</span></small></span>
                <svg className="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>
              </a>
              <a className="dl" href="https://github.com/emilholmgaard/unbit-releases/releases">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>
                <span><strong>{t.download.allTitle}</strong><small>{t.download.allSub}</small></span>
                <svg className="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq" id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title">{t.faq.title}</h2>
            <div className="faq-list">
              {FAQ.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="cta grad-cta">
            <h2>{t.cta.title}</h2>
            <p>{t.cta.text}</p>
            <div className="actions">
              <a className="pill white" href={DOWNLOAD_URL}>{t.cta.download}</a>
              <a className="pill dark" href="https://github.com/emilholmgaard/unbit-releases/releases/latest">{t.cta.whatsNew}</a>
            </div>
            <div className="arcs" aria-hidden="true">
              <svg viewBox="0 0 900 360" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="450" cy="470" r="400"/><circle cx="450" cy="470" r="250"/><circle cx="450" cy="470" r="120"/></svg>
              <Image src="/icon.png" width={112} height={112} alt="" />
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="foot-brand">
            <a className="brand" href={`/${locale}`}><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
            <p>© 2026 Emil Holmgaard</p>
            <p className="site-note">{t.footer.siteNote}</p>
          </div>
          <div className="foot-cols">
            <div>
              <h2>{t.footer.product}</h2>
              <a href={DOWNLOAD_URL}>{t.nav.download}</a>
              <a href="#how">{t.nav.how}</a>
              <a href="#features">{t.nav.features}</a>
              <a href="#privacy">{t.nav.privacy}</a>
            </div>
            <div>
              <h2>{t.footer.resources}</h2>
              <a href="#faq">{t.nav.faq}</a>
              <a href={`/${locale}/alternatives`}>{t.footer.alternatives}</a>
              <a href="https://github.com/emilholmgaard/unbit-releases/releases">{t.footer.releaseNotes}</a>
              <a href="https://github.com/emilholmgaard/unbit-releases">{t.footer.github}</a>
            </div>
          </div>
          <p className="legal">{t.footer.legal}</p>
        </footer>
    </>
  );
}
