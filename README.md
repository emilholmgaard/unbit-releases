# Udgivelser af Unbit

Dette repo indeholder kun udgivelser af Unbit til macOS:

- `appcast.xml` – opdateringsfeed til Sparkle (bruges af appen til automatiske opdateringer).
- DMG-filerne ligger som filer under [Releases](https://github.com/emilholmgaard/unbit-releases/releases).

Download-side: https://unbit.app/ (Next.js-appen i `web/`, Vercel-projektet `unbit` i holm-team, deployes automatisk ved push til main). www.unbit.app og alle *.vercel.app-adresser for produktion sender videre til https://unbit.app med 308. Den kanoniske adresse styres af `NEXT_PUBLIC_SITE_URL` (standard i `web/lib/site.ts`). Nyeste DMG: `releases/latest/download/Unbit.dmg`.

GitHub Pages skal forblive slået til: appen læser `appcast.xml` fra https://emilholmgaard.github.io/unbit-releases/appcast.xml (1.0.2+) og fra raw.githubusercontent.com (1.0.0–1.0.1). Pages-forsiden viderestiller kun til Vercel.

Alle udgivelser er signeret med Developer ID, notariseret af Apple og signeret med Sparkle (EdDSA).
