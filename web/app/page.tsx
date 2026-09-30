import Image from "next/image";
import { DESCRIPTION, DOWNLOAD_URL, RELEASES_URL, SITE_URL, latestRelease } from "@/lib/site";

export const revalidate = 600;

const FAQ: { q: string; a: string }[] = [
  { q: "Should I use the password or the recovery key?", a: "Either one works. The password is the one chosen when BitLocker was turned on for the drive. The recovery key is the 48-digit key (8 groups of 6 digits) that Windows asked you to save at the same time, for example to a Microsoft account, a file or a printout. Pick whichever you have in the app." },
  { q: "Why does Unbit need Full Disk Access?", a: "To decrypt the drive, Unbit has to read the raw, encrypted data straight from the USB device. macOS only allows that for apps with Full Disk Access. Unbit uses it to read the drive you choose and nothing else." },
  { q: "Can I write to the drive?", a: "No. Unbit is read-only by design and never writes to the drive. You can open files and copy them to your Mac. To change files on the drive, use Windows." },
  { q: "Does it work on Apple silicon and Intel Macs?", a: "Yes. Unbit is a universal app that runs natively on both Apple silicon and Intel Macs with macOS 13 Ventura or later." },
  { q: "Which drives are supported?", a: "External drives and USB sticks encrypted with BitLocker or BitLocker To Go on Windows 7 or later, using AES-CBC (with or without the Elephant diffuser) or AES-XTS, with 128- or 256-bit keys. Once unlocked, macOS reads the file system on the drive itself." },
  { q: "Is my password stored anywhere?", a: "Only if you tick \"Remember this drive on this Mac\". The code is then saved encrypted in your macOS keychain after a successful unlock, and you can forget it at any time from the gear menu. It's never sent anywhere." },
];

export default async function Home() {
  const { version, minOS, date } = await latestRelease();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Unbit",
      description: DESCRIPTION,
      url: `${SITE_URL}/`,
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
            <a className="brand" href="/"><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
            <nav className="links" aria-label="Main">
              <a href="#how">How it works</a>
              <a href="#features">Features</a>
              <a href="#privacy">Privacy</a>
              <a href="#faq">FAQ</a>
            </nav>
            <a className="pill dark small hide-sm" href="https://github.com/emilholmgaard/unbit-releases/releases">Releases</a>
            <a className="pill white small" href={DOWNLOAD_URL}>Download</a>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="hero">
            <a className="badge" href="https://github.com/emilholmgaard/unbit-releases/releases/latest">
              <strong><span>Unbit {version}</span> is here</strong><span className="dot">·</span>What's new
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <h1>Meet <Image className="inline-icon" src="/icon.png" width={96} height={96} alt="" loading="eager" fetchPriority="high" /> Unbit</h1>
            <p className="sub">Open BitLocker-encrypted USB drives on your Mac. Read-only, with no extra drivers. Just enter the password or recovery key.</p>
            <div className="actions">
              <a className="pill white" href={DOWNLOAD_URL}>
                <svg aria-hidden="true" width="15" height="18" viewBox="0 0 814 1000" fill="currentColor"><path d="M788 341c-6 4-108 62-108 190 0 149 131 201 135 203-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-167 41s-106-58-156-128C44 791 0 669 0 553c0-186 121-285 240-285 63 0 116 42 156 42 38 0 97-44 169-44 27 0 125 2 190 75zM554 167c30-35 51-84 51-133 0-7-1-14-2-19-48 2-106 32-141 73-27 31-53 80-53 130 0 8 1 15 2 18 3 1 9 1 14 1 43 0 97-29 129-70z"/></svg>
                Download for macOS
              </a>
              <a className="pill dark" href="#how">How it works</a>
            </div>
            <p className="meta"><span>Version {version} · macOS {minOS} or later</span> · Apple silicon &amp; Intel · Notarized by Apple</p>
          </section>

          {/* App mockup */}
          <section className="mockup" aria-label="Unbit in the menu bar">
            <div className="menubar" aria-hidden="true">
              <span className="mb-left"><b>Finder</b><span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Window</span></span>
              <span className="mb-right">
                <span className="readout"><svg width="16" height="12" viewBox="0 0 24 16" fill="currentColor"><rect x="1" y="3" width="22" height="10" rx="3"/></svg>8.4M/s</span>
                <span>Wed 23:54</span>
              </span>
            </div>
            <div className="desk">
              <figure>
                <Image src="/shot-unlock.png" width={320} height={538} alt="Unbit menu bar window with a detected SanDisk drive and a BitLocker password field" />
                <figcaption>Pick the drive and enter your password or recovery key</figcaption>
              </figure>
              <figure>
                <Image src="/shot-open.png" width={320} height={431} alt="Unbit menu bar window showing an open drive, read activity and storage used" />
                <figcaption>Browse it in Finder, then eject it safely</figcaption>
              </figure>
            </div>
          </section>

          {/* How it works */}
          <section className="section" id="how">
            <div className="section-head">
              <h2>How it works</h2>
              <p>Three steps from a locked drive to your files in Finder. The one-time setup takes about a minute.</p>
            </div>
            <div className="grid three">
              <article className="step">
                <span className="num">1</span>
                <h3>Drag to Applications</h3>
                <p>Open the DMG and drag Unbit into your Applications folder. It lives in the menu bar, not the Dock.</p>
              </article>
              <article className="step">
                <span className="num">2</span>
                <h3>Grant Full Disk Access</h3>
                <p>A short guide shows you where to switch it on in System Settings. You only do this once.</p>
              </article>
              <article className="step">
                <span className="num">3</span>
                <h3>Plug in and unlock</h3>
                <p>Unbit spots the drive automatically. Enter the password or recovery key, and the drive opens in Finder.</p>
              </article>
            </div>
          </section>

          {/* Feature spotlight */}
          <section className="spotlight" aria-labelledby="spot-title">
            <div className="spot-text">
              <h2 id="spot-title">Read-only, by design</h2>
              <p>Unbit attaches the unlocked drive to macOS as read-only. Nothing is ever written back, so your files, and the drive's BitLocker setup, stay exactly as Windows left them. Copy what you need, then eject.</p>
            </div>
            <div className="grad-panel teal" aria-hidden="true"><span>Read-only</span></div>
          </section>

          {/* Features */}
          <section className="section" id="features">
            <div className="section-head">
              <h2>Everything you need, nothing you don't</h2>
              <p>A small, focused menu bar app for one job: getting to the files on a BitLocker drive.</p>
            </div>
            <div className="grid three">
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><path d="M8 14h3"/></svg>
                <h3>No drivers or macFUSE</h3>
                <p>No kernel extensions and no third-party file system layers. Unbit uses the disk image support already built into macOS.</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/></svg>
                <h3>Decrypts on demand</h3>
                <p>Only the parts macOS actually reads are decrypted, as they're read. No waiting for a full copy of the drive.</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v6a5 5 0 0 1-10 0V7Z"/><path d="M9 3v4M15 3v4M12 18v3"/></svg>
                <h3>Detects drives automatically</h3>
                <p>Plug in a drive and it appears in Unbit right away. Unplug it and Unbit tidies up on its own.</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4 4 13h16L12 4Z"/><path d="M4 18h16"/></svg>
                <h3>Safe eject</h3>
                <p>One click closes the drive and ejects it, so you know when it's safe to unplug. Quitting closes an open drive first.</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/></svg>
                <h3>Remembers drives, if you want</h3>
                <p>Tick "Remember this drive" and the code is stored encrypted in your macOS keychain, never anywhere else.</p>
              </article>
              <article className="feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15"/><path d="M4 20v-5h5"/></svg>
                <h3>Updates itself, notarized by Apple</h3>
                <p>Signed with Developer ID and notarized by Apple. New versions arrive through signed automatic updates.</p>
              </article>
            </div>
            <p className="features-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z"/></svg><span><strong>Available in 11 languages</strong> – English, Danish, Swedish, Norwegian, German, French, Spanish, Italian, Dutch, Finnish and Polish.</span></p>
          </section>

          {/* Privacy */}
          <section className="spotlight privacy" id="privacy" aria-labelledby="privacy-title">
            <div className="spot-text">
              <h2 id="privacy-title">Your drive never leaves your Mac</h2>
              <p>Decryption happens entirely on your Mac. Your password, recovery key and files are never sent anywhere. The app has no accounts, analytics or tracking. The only thing Unbit fetches from the internet is its daily update check.</p>
              <ul className="ticks">
                <li>Decrypted data stays on your Mac</li>
                <li>Saved codes live only in your keychain</li>
                <li>No accounts, analytics or tracking in the app</li>
              </ul>
            </div>
            <div className="grad-panel orange" aria-hidden="true"><span>Stays on<br />your Mac</span></div>
          </section>

          {/* Download */}
          <section className="download-row" aria-labelledby="dl-title">
            <div>
              <h2 id="dl-title">Download Unbit</h2>
              <p>Free to download. One app for Apple silicon and Intel Macs running macOS 13 or later.</p>
            </div>
            <div className="dl-list">
              <a className="dl" href={DOWNLOAD_URL}>
                <svg width="18" height="22" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true"><path d="M788 341c-6 4-108 62-108 190 0 149 131 201 135 203-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-167 41s-106-58-156-128C44 791 0 669 0 553c0-186 121-285 240-285 63 0 116 42 156 42 38 0 97-44 169-44 27 0 125 2 190 75zM554 167c30-35 51-84 51-133 0-7-1-14-2-19-48 2-106 32-141 73-27 31-53 80-53 130 0 8 1 15 2 18 3 1 9 1 14 1 43 0 97-29 129-70z"/></svg>
                <span><strong>macOS</strong><small>Apple silicon &amp; Intel · <span>{version}</span></small></span>
                <svg className="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>
              </a>
              <a className="dl" href="https://github.com/emilholmgaard/unbit-releases/releases">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>
                <span><strong>All releases</strong><small>Release notes and earlier versions</small></span>
                <svg className="end" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq" id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title">FAQs</h2>
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
            <h2>Open your BitLocker drive</h2>
            <p>No Windows PC required.</p>
            <div className="actions">
              <a className="pill white" href={DOWNLOAD_URL}>Download for macOS</a>
              <a className="pill dark" href="https://github.com/emilholmgaard/unbit-releases/releases/latest">What's new</a>
            </div>
            <div className="arcs" aria-hidden="true">
              <svg viewBox="0 0 900 360" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="450" cy="470" r="400"/><circle cx="450" cy="470" r="250"/><circle cx="450" cy="470" r="120"/></svg>
              <Image src="/icon.png" width={112} height={112} alt="" />
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="foot-brand">
            <a className="brand" href="/"><Image src="/icon.png" width={24} height={24} alt="" />Unbit</a>
            <p>© 2026 Emil Holmgaard</p>
            <p className="site-note">This website uses privacy-friendly, cookieless analytics.</p>
          </div>
          <div className="foot-cols">
            <div>
              <h2>Product</h2>
              <a href={DOWNLOAD_URL}>Download</a>
              <a href="#how">How it works</a>
              <a href="#features">Features</a>
              <a href="#privacy">Privacy</a>
            </div>
            <div>
              <h2>Resources</h2>
              <a href="#faq">FAQ</a>
              <a href="https://github.com/emilholmgaard/unbit-releases/releases">Release notes</a>
              <a href="https://github.com/emilholmgaard/unbit-releases">GitHub</a>
            </div>
          </div>
          <p className="legal">BitLocker is a trademark of Microsoft Corporation. Unbit is an independent app and is not affiliated with or endorsed by Microsoft. Mac and macOS are trademarks of Apple Inc.</p>
        </footer>
    </>
  );
}
