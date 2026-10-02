import type { LawyersLocale } from "@/lib/lawyers";
import { SOURCE_ADVOKATSAMFUNDET, SOURCE_DOMSTOLE } from "@/lib/lawyers";

/** Copy for the lawyers page. Links use the GuideText syntax: [label](guide-key | home | download | https://…), **bold**. */
export type LawyersSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  outro?: string[];
};

export type LawyersContent = {
  meta: { title: string; description: string; ogTitle: string };
  h1: string;
  lead: string;
  updated: string;
  breadcrumbLabel: string;
  actions: { download: string; note: string };
  disclaimer: { label: string; text: string };
  sections: LawyersSection[];
  checklist: { id: string; title: string; intro: string; items: string[]; outro: string[] };
  note: {
    id: string;
    title: string;
    intro: string;
    copy: string;
    copied: string;
    download: string;
    filename: string;
    textLabel: string;
    lines: string[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  sources: { id: string; title: string; intro: string; items: string[]; outro: string };
  relatedTitle: string;
  guidesLabel: string;
  footerLabel: string;
  indexCard: { title: string; text: string; cta: string };
};

const da: LawyersContent = {
  meta: {
    title: "Åbn krypteret USB-stick med digital sag på Mac – til advokater | Unbit",
    description:
      "Til advokater og forsvarere: sådan åbner du en BitLocker-krypteret USB-stick med digital sag på Mac, skrivebeskyttet og lokalt. Med tjekliste til jeres egen vurdering og en sikkerhedsnote til IT.",
    ogTitle: "Åbn krypteret USB-stick med digital sag på Mac – til advokater",
  },
  h1: "Åbn en krypteret USB-stick med digital sag på Mac",
  lead:
    "Til advokater og forsvarere, der får digitalt sagsmateriale fra anklagemyndigheden, politiet eller retten på en BitLocker-krypteret USB-stick, men arbejder på Mac. Siden forklarer, hvad Unbit gør og ikke gør, og hvad advokatfirmaet selv bør vurdere, før værktøjet tages i brug.",
  updated: "Opdateret {date}",
  breadcrumbLabel: "Brødkrumme",
  actions: { download: "Download Unbit", note: "Gå til sikkerhedsnoten" },
  disclaimer: {
    label: "Ikke juridisk rådgivning",
    text:
      "Siden er almen information fra Unbit og ikke juridisk rådgivning. Unbit er **ikke** et officielt godkendt, certificeret eller anbefalet værktøj hos politiet, anklagemyndigheden, domstolene eller Advokatsamfundet, og brugen af Unbit sikrer ikke i sig selv, at GDPR eller tavshedspligten er overholdt. Det er advokatfirmaet selv, der vurderer, om værktøjet er egnet.",
  },
  sections: [
    {
      id: "hvem",
      title: "Hvem er siden til?",
      paragraphs: [
        "Siden er skrevet til advokater, forsvarere, bistandsadvokater og medarbejdere i advokatfirmaer, der får udleveret en digital sag på en USB-stick krypteret med Windows BitLocker, og som arbejder på en Mac. Den kan også bruges som oplæg til firmaets IT-ansvarlige eller databeskyttelsesansvarlige, som skal tage stilling til, om et nyt værktøj må bruges.",
        "Unbit er en lille macOS-app til at åbne BitLocker-krypterede eksterne drev. Appen er ikke udviklet specielt til retsvæsenet, og Unbit har ingen aftale med politi, anklagemyndighed eller domstole.",
      ],
    },
    {
      id: "problemet",
      title: "Problemet: BitLocker-stikket kan ikke åbnes på en Mac",
      paragraphs: [
        "Ifølge [Domstolenes vejledning](" + SOURCE_DOMSTOLE + ") (version 2.0) sender anklagemyndigheden digitale retssager til retten, forsvarere og eventuelle bistandsadvokater på et USB-stick, der er krypteret med Windows BitLocker. Adgangskoden sendes separat via sikker mail. På en Windows-pc beder BitLocker automatisk om koden, når stikket sættes i. macOS kan derimod ikke åbne BitLocker-krypterede drev på egen hånd.",
        "Når stikket sættes i en Mac, tilbyder macOS typisk kun at ignorere, skubbe ud eller initialisere drevet. **Vælg aldrig Initialiser** – det sletter drevets indhold.",
        "For Mac nævner vejledningen tredjepartsprogrammet »M3 Mac Bitlocker Loader«. Vejledningen beskriver ingen godkendelsesprocedure for programmer og siger ikke, at andre programmer frit kan bruges i stedet for. Vi har heller ikke fundet en offentlig regel om, at et bestemt program skal være godkendt af politiet. Vejledningen er imidlertid ældre, og vi kan ikke udtale os om, hvad den enkelte anklagemyndighed forventer. Se afsnittet om kilder nederst.",
      ],
    },
    {
      id: "hjaelp",
      title: "Sådan hjælper Unbit",
      paragraphs: ["Unbit låser et BitLocker-krypteret eksternt drev op med adgangskode eller 48-cifret gendannelsesnøgle og åbner det i Finder. Det er det, appen gør – og ikke mere."],
      bullets: [
        "**Åbner stikket skrivebeskyttet.** Unbit skriver ikke til stikket. Drevet vises i Finder som et skrivebeskyttet drev, og appen læser kun.",
        "**Ingen macFUSE og ingen drivere.** Der skal ikke installeres macFUSE, dislocker eller lignende. Unbit er en almindelig Mac-app, signeret med Developer ID og notariseret af Apple. En valgfri engangsopsætning installerer dog en lille, begrænset læsehjælper, som kræver administratoradgangskode – se sikkerhedsnoten.",
        "**Alt sker på din Mac.** Dekrypteringen foregår lokalt i appen. Filer, koder og drevoplysninger sendes ikke til en cloud-tjeneste eller til Unbit. Det dekrypterede drev gives til macOS gennem en lokal forbindelse på selve Macen (127.0.0.1), og der skrives ikke en dekrypteret kopi til disken.",
        "**Koden bliver på Macen.** Adgangskoden eller gendannelsesnøglen indtastes i appen og sendes ikke videre. Hvis du selv vælger »Husk dette drev på denne Mac«, gemmes koden først efter en vellykket oplåsning, og kun i din lokale macOS-nøglering (ikke synkroniseret via iCloud). Valget er som standard slået fra.",
        "**Ingen analyse af drevets indhold.** Appen har ingen analyse- eller telemetrifunktioner. Den eneste netværkstrafik, vi kender til i appen, er det automatiske opdateringstjek (Sparkle) én gang i døgnet via GitHub; det omfatter ikke drevets indhold, filnavne eller koder.",
      ],
      outro: [
        "**Begrænsninger:** Unbit understøtter kun eksterne drev (ikke interne diske), kræver macOS 13 eller nyere og kan åbne drev, der er krypteret med adgangskode eller 48-cifret gendannelsesnøgle. Unbit er ikke et retsteknisk værktøj og udarbejder ikke logs eller kontrolsummer over stikkets indhold. BitLocker-stik kan ikke åbnes på en iPad, hverken med Unbit eller andre værktøjer.",
      ],
    },
    {
      id: "trin",
      title: "Sådan åbner du stikket – trin for trin",
      steps: [
        "Læs de vilkår (udleveringsvilkår) og den vejledning, der fulgte med sagen fra anklagemyndigheden, politiet eller retten, og tjek, at I må bruge et program som Unbit. Adgangskoden kommer typisk separat via sikker mail.",
        "[Download Unbit](download), flyt appen til mappen **Programmer**, og åbn den derfra. Appen ligger i menulinjen.",
        "Første gang: vælg **Opsæt læseadgang…** i Unbit og godkend med din Mac-adgangskode. Det er en engangsopsætning, der installerer en lille læsehjælper. Springer du den over, beder Unbit om administratorgodkendelse hver gang et stik åbnes.",
        "Sæt USB-stikket i, og vælg stikkets partition på listen i Unbit. Tryk aldrig »Initialiser«, hvis macOS spørger.",
        "Vælg **Adgangskode** og indtast koden fra anklagemyndigheden. Har du i stedet en 48-cifret gendannelsesnøgle, vælger du fanen **Recovery-key**.",
        "Lad feltet »Husk dette drev på denne Mac« stå fra, medmindre jeres firma har besluttet, at koder må gemmes i nøgleringen.",
        "Tryk **Åbn drev** og godkend med din Mac-adgangskode, hvis du bliver bedt om det. Stikket åbner i Finder, kun til læsning.",
        "Arbejd med materialet efter de vilkår, I har fået. Vær opmærksom på, at filer, der kopieres fra stikket til en anden placering, ikke længere er krypteret af BitLocker.",
        "Tryk **Luk sikkert**, når du er færdig, og tag først derefter stikket ud. Behandl og aflever stikket efter de vilkår, I har fået.",
      ],
      outro: ["Flere detaljer og fejlfinding: [Sådan åbner du et BitLocker-drev på Mac](open) og [BitLocker USB-stik på Mac](usb)."],
    },
    {
      id: "sikkerhed",
      title: "Sikkerhedsovervejelser for advokatfirmaet",
      paragraphs: [
        "[Advokatsamfundets omtale af vejledningen om GDPR for advokater](" + SOURCE_ADVOKATSAMFUNDET + ") (maj 2025) lægger vægt på, at personoplysninger behandles sikkert, og at advokatfirmaet selv beslutter, hvordan risici vurderes, og hvilket sikkerhedsniveau der er passende. Ansvaret for sikker behandling ligger altså hos firmaet. Punkterne herunder er forslag til, hvad firmaet kan tage stilling til – ikke en udtømmende eller godkendt liste.",
      ],
      bullets: [
        "**Databeskyttelse og lokal behandling.** Unbit behandler indholdet lokalt på Macen, og indholdet overføres ikke til Unbit eller til en cloud-tjeneste. Hvad det betyder for jeres databeskyttelsesvurdering (fx i forhold til databehandleraftaler), afgør I selv.",
        "**Beskyt selve Macen.** Slå FileVault til, brug skærmlås med kort tidsfrist, hold macOS opdateret, og undgå delte brugerkonti. Så længe stikket er åbent, kan den, der bruger Macen, læse indholdet.",
        "**Kopier er ikke længere krypteret.** Domstolenes vejledning advarer om, at filer overført fra stikket til andet medie, fildrev eller mail ikke længere er krypterede. Beslut, om materialet må kopieres ud, og hvor kopierne i givet fald må ligge. macOS kan desuden lægge spor uden for stikket, fx miniaturer, Quick Look-cache, seneste dokumenter, søgeindeks og sikkerhedskopier – vurder, om det er relevant for jeres opsætning.",
        "**Tag stilling til nøgleringen.** Som standard gemmes ingen koder. Gemmer I en kode, kan den, der har adgang til jeres macOS-brugerkonto, åbne det pågældende stik. Overvej at undlade det på delte eller bærbare Macs, og brug **Glem kode** i tandhjulsmenuen, når stikket ikke længere skal bruges.",
        "**Læsehjælperen.** Engangsopsætningen installerer en root-tjeneste (launchd) på Macen, der kun kan åbne eksterne diske skrivebeskyttet. Vil firmaet ikke have den, kan I undlade opsætningen og godkende med administratoradgangskode hver gang. Hjælperen kan fjernes med **Fjern læsehjælper…**. På firmastyrede Macs kan det kræve, at IT udfører opsætningen.",
        "**Luk sikkert og håndtér stikket korrekt.** Brug **Luk sikkert**, før stikket tages ud, og følg vilkårene for opbevaring, sletning eller aflevering af stikket.",
        "**Kilde og opdateringer.** Hent kun appen fra unbit.app eller Unbits GitHub-udgivelser, og kontrollér signaturen (se sikkerhedsnoten). Appen søger selv efter opdateringer og verificerer dem med en digital signatur. Revurdér vurderingen ved større nye versioner.",
      ],
    },
  ],
  checklist: {
    id: "tjekliste",
    title: "Sådan vurderer I, om værktøjet er egnet",
    intro:
      "Brug punkterne som udgangspunkt for firmaets egen risikovurdering. Det er ikke en godkendelsesprocedure, og at have afkrydset alle punkter er ikke en garanti for, at brugen er i orden.",
    items: [
      "Vilkår: Har vi læst de udleveringsvilkår og den vejledning, anklagemyndigheden, politiet eller retten har givet, og forbyder de ikke brug af andre programmer end de nævnte?",
      "Risikovurdering: Har vi vurderet risikoen ved behandlingen og valgt et passende sikkerhedsniveau i overensstemmelse med firmaets persondatapolitik – og er Unbit omfattet af den vurdering?",
      "IT-gennemgang: Har IT læst sikkerhedsnoten nedenfor og accepteret de tilladelser, appen beder om (administratoradgang, evt. Fuld diskadgang, evt. nøglering)?",
      "Ikke officielt godkendt: Er vi indforstået med, at Unbit ikke er godkendt, certificeret eller anbefalet af politi, domstole eller Advokatsamfundet, og fremgår det af vores vurdering?",
      "Macen: Er FileVault slået til, er skærmlåsen sat op, er macOS opdateret, og bruges Macen ikke af andre?",
      "Koder: Har vi besluttet, om adgangskoder og gendannelsesnøgler må gemmes i nøgleringen (standard: nej)?",
      "Kopier: Har vi besluttet, om materiale må kopieres ud af stikket, og hvor kopierne må ligge og slettes?",
      "Kilde: Henter vi appen fra unbit.app eller GitHub-udgivelserne og har kontrolleret Apples notarisering og udviklersignaturen?",
      "Test: Har vi afprøvet fremgangsmåden på et ikke-fortroligt BitLocker-testdrev, før et rigtigt sagsstik åbnes?",
      "Ansvar og dokumentation: Er det besluttet, hvem der har ansvaret, hvor vurderingen er dokumenteret, og hvornår den revurderes?",
    ],
    outro: [
      "**Skriftlig afklaring.** Er der tvivl, kan firmaet bede den udstedende anklagemyndighed om en skriftlig afklaring af, om brug af et bestemt program er i orden. Det er en mulighed, der kan fjerne resterende usikkerhed – ikke et dokumenteret krav.",
    ],
  },
  note: {
    id: "sikkerhedsnote",
    title: "Sikkerhedsnote til jeres IT",
    intro:
      "En kort tekst, du kan kopiere eller hente og sende videre til IT eller den databeskyttelsesansvarlige. Noten er skrevet af Unbit – den er ikke en uafhængig revision.",
    copy: "Kopiér noten",
    copied: "Kopieret",
    download: "Hent som tekstfil",
    filename: "unbit-sikkerhedsnote.txt",
    textLabel: "Sikkerhedsnote (kan kopieres)",
    lines: [
      "SIKKERHEDSNOTE – Unbit (macOS-app til at åbne BitLocker-krypterede eksterne drev)",
      "Udarbejdet af Unbit, 2. oktober 2026. Gælder Unbit 1.0.x. Kilde: https://unbit.app/da/advokater",
      "",
      "Noten er skrevet af udvikleren og er ikke en uafhængig sikkerhedsrevision. Unbit er ikke godkendt, certificeret eller anbefalet af politi, anklagemyndighed, domstole eller Advokatsamfundet. Vurderingen af, om værktøjet er egnet, foretages af advokatfirmaet.",
      "",
      "FORMÅL",
      "Unbit åbner BitLocker-krypterede eksterne drev (USB-stik, SSD, HDD) på en Mac med adgangskode eller 48-cifret gendannelsesnøgle. Det bruges fx til digitale sager på USB-stik krypteret med Windows BitLocker.",
      "",
      "HVAD APPEN GØR",
      "- Læser drevets BitLocker-metadata og dekrypterer nøglerne i appen (egen Swift-implementering).",
      "- Dekrypterer data løbende og stiller dem til rådighed for macOS som et skrivebeskyttet diskbillede (hdiutil attach -readonly) via en lokal server på 127.0.0.1 med en tilfældig adresse. Der skrives ingen dekrypteret kopi til disken.",
      "- Åbner drevet i Finder (kun læsning). »Luk sikkert« afmonterer og skubber drevet ud.",
      "",
      "HVAD APPEN IKKE GØR",
      "- Den skriver ikke til drevet (enheden åbnes skrivebeskyttet).",
      "- Den installerer ikke macFUSE, dislocker, kernel-udvidelser eller andre drivere.",
      "- Den sender ikke drevets indhold, filnavne, adgangskoder eller gendannelsesnøgler til nogen, bruger ingen cloud-tjeneste og har ingen analyse- eller telemetrifunktioner.",
      "- Den understøtter ikke interne diske og er ikke et retsteknisk værktøj (ingen kontrolsummer eller logs over indholdet).",
      "",
      "TILLADELSER OG ÆNDRINGER PÅ MACEN",
      "- Administratoradgangskode: Funktionen »Opsæt læseadgang« (engangsopsætning) installerer en begrænset launchd-tjeneste, der kører som root, under /Library/LaunchDaemons og /Library/PrivilegedHelperTools (navngivet efter Unbits app-id). Tjenesten accepterer kun forbindelser fra den bruger, der er logget ind ved konsollen, og fra den nøjagtigt installerede, signerede app. Den åbner kun eksterne, fysiske partitioner skrivebeskyttet og giver appen en filbeskrivelse. Den modtager aldrig adgangskoder. Den kan fjernes med »Fjern læsehjælper…« i appen. Uden opsætning kræves administratorgodkendelse hver gang et drev åbnes.",
      "- Fuld diskadgang: macOS kan kræve det for direkte læsning af drevet. Det kræves desuden for de valgfrie funktioner »Åbn kendte drev automatisk« og »Besked, når et drev tilsluttes« (begge slået fra som standard).",
      "- Nøglering: Kun hvis brugeren vælger »Husk dette drev på denne Mac« (slået fra som standard). Koden gemmes først efter en vellykket oplåsning som almindeligt adgangskodeemne i brugerens lokale nøglering (ikke synkroniseret) og kan slettes med »Glem kode«.",
      "- Notifikationer (valgfri, spørger macOS) og Start ved login (slået fra som standard).",
      "- Udklipsholder: læses kun, når brugeren selv trykker »Indsæt gendannelsesnøgle«.",
      "- Appen kører ikke i App Sandbox (nødvendigt for direkte læsning af drevet), bruger hardened runtime og er signeret med Developer ID og notariseret af Apple.",
      "",
      "NETVÆRK",
      "- Appen indeholder kun ét netværkskald, vi kender til: automatisk opdateringstjek via Sparkle 2 én gang i døgnet (kan også startes manuelt). Opdateringsfeedet hostes på GitHub Pages (github.io), og selve opdateringen hentes fra github.com (udgivelsesfiler). Opdateringer verificeres med en EdDSA-signatur. Sparkles valgfri systemprofilering er ikke slået til.",
      "- Det lokale diskbillede serveres kun på 127.0.0.1 (loopback), med højst 16 samtidige forbindelser og et tilfældigt 128-bit token i adressen.",
      "- Hjemmesiden unbit.app (ikke appen) bruger Vercel Analytics og Speed Insights til besøgsstatistik.",
      "",
      "LOGGING OG FEJLRAPPORT",
      "- Appen gemmer hverken koder eller filnavne i log. Tidsmålinger kan ses i Konsol (subsystem med Unbits app-id) uden koder, volumen-id'er eller filnavne.",
      "- »Kopiér fejlrapport« indeholder ikke koder, drev- eller volumennavne, stier eller andet, brugeren har indtastet.",
      "",
      "KONTROL AF APPEN",
      "- spctl -a -vv /Applications/Unbit.app  (forventet: accepted, source=Notarized Developer ID)",
      "- codesign -dv --verbose=2 /Applications/Unbit.app  (Team ID: 6XTQ98822R)",
      "- Test først på et ikke-fortroligt BitLocker-testdrev.",
      "",
      "FJERNELSE",
      "- Vælg »Fjern læsehjælper…« i appen, slet appen fra Programmer, og slet evt. gemte koder med »Glem kode« eller i Nøglering (emner med servicenavn efter Unbits app-id).",
      "",
      "BEMÆRK",
      "Beskrivelsen bygger på udviklerens egen dokumentation og kan ændre sig i nyere versioner. Brug af Unbit ændrer ikke på advokatfirmaets ansvar for selv at vurdere risici og sikkerhedsniveau, eller på de vilkår, der er givet af den myndighed, der har udleveret materialet.",
    ],
  },
  faqTitle: "Ofte stillede spørgsmål",
  faq: [
    {
      q: "Er Unbit godkendt af politiet, domstolene eller Advokatsamfundet?",
      a: "Nej. Unbit er ikke et officielt godkendt, certificeret eller anbefalet værktøj hos politiet, anklagemyndigheden, domstolene eller Advokatsamfundet. Unbit er et almindeligt program, og det er advokatfirmaet selv, der vurderer, om det er egnet.",
    },
    {
      q: "Må jeg bruge Unbit i stedet for »M3 Mac Bitlocker Loader«?",
      a: "Det kan vi ikke afgøre for jer. [Domstolenes vejledning](" + SOURCE_DOMSTOLE + ") nævner M3-programmet til Mac, men beskriver ingen godkendelsesprocedure og siger ikke, at andre programmer frit kan bruges i stedet. Vejledningen er ældre. Tjek de vilkår, I har fået udleveret fra anklagemyndigheden eller politiet, vurder det selv, og overvej om nødvendigt at bede den udstedende anklagemyndighed om en skriftlig afklaring. Det er en mulighed, ikke et dokumenteret krav.",
    },
    {
      q: "Overholder Unbit GDPR og tavshedspligten?",
      a: "Intet enkeltstående værktøj sikrer i sig selv overholdelse af GDPR eller tavshedspligten, og det påstår vi ikke. Unbit behandler indholdet lokalt på din Mac, og indholdet sendes ikke til Unbit eller en cloud-tjeneste. Ansvaret for en samlet, sikker behandling – risikovurdering og passende sikkerhedsniveau – ligger hos advokatfirmaet, jf. [Advokatsamfundets omtale af GDPR-vejledningen](" + SOURCE_ADVOKATSAMFUNDET + ").",
    },
    {
      q: "Ændrer Unbit noget på USB-stikket?",
      a: "Nej, Unbit er bygget til kun at læse: drevet åbnes skrivebeskyttet, og macOS får det som et skrivebeskyttet diskbillede. Unbit er dog ikke et retsteknisk værktøj og udarbejder ikke kontrolsummer eller logs, der dokumenterer, at stikket er uændret.",
    },
    {
      q: "Skal jeg installere macFUSE eller andre drivere?",
      a: "Nej. Unbit bruger ikke macFUSE, dislocker eller kernel-udvidelser. Appen kan som valgfri engangsopsætning installere en lille læsehjælper, der kræver administratoradgangskode – se sikkerhedsnoten.",
    },
    {
      q: "Hvor bliver adgangskoden af?",
      a: "Koden indtastes i appen og bruges lokalt til at låse stikket op. Den sendes ikke til nogen. Kun hvis du selv vælger »Husk dette drev på denne Mac«, gemmes den efter en vellykket oplåsning i din lokale macOS-nøglering. Du kan slette den igen med »Glem kode«.",
    },
    {
      q: "Hvilken netværkstrafik har appen?",
      a: "Det eneste netværkskald, vi kender til i appen, er det automatiske opdateringstjek (Sparkle) én gang i døgnet. Feedet ligger på GitHub Pages, og selve opdateringen hentes fra GitHub og verificeres med en digital signatur. Det omfatter ikke drevets indhold, filnavne eller koder. Hjemmesiden unbit.app bruger Vercel Analytics og Speed Insights til besøgsstatistik; det gælder ikke appen.",
    },
    {
      q: "Stikket vil ikke åbne – hvad gør jeg?",
      a: "Tjek, at koden er skrevet præcist, som den er modtaget, og prøv evt. gendannelsesnøglen. Sæt stikket i igen, og tryk »Prøv igen«. Bruger du en USB-hub eller adapter, så prøv en direkte USB-port. Hjælper det ikke, så bed afsenderen om at bekræfte koden eller sende stikket igen. Er stikket krypteret på anden måde end med adgangskode eller gendannelsesnøgle, kan Unbit ikke åbne det. Se også [guiden til BitLocker USB-stik på Mac](usb).",
    },
    {
      q: "Virker det på iPad eller iPhone?",
      a: "Nej, Unbit er kun til Mac. Domstolenes vejledning oplyser, at BitLocker-stik ikke kan åbnes på en iPad.",
    },
    {
      q: "Hvordan fjerner jeg Unbit igen?",
      a: "Vælg »Fjern læsehjælper…« i tandhjulsmenuen, afslut appen, og slet den fra Programmer. Gemte koder kan fjernes med »Glem kode« i appen eller i Nøglering.",
    },
  ],
  sources: {
    id: "kilder",
    title: "Kilder",
    intro: "Siden bygger på følgende offentlige kilder. Kontrollér selv, hvad der gælder på det tidspunkt, I læser dette.",
    items: [
      "[Vejledning til retten og forsvarere om åbning af digital sag på krypteret USB-stik](" + SOURCE_DOMSTOLE + ") (Danmarks Domstole, version 2.0, PDF). Beskriver, at anklagemyndigheden sender digitale sager på et Windows-BitLocker-krypteret USB-stick med kode via sikker mail, nævner programmet »M3 Mac Bitlocker Loader« til Mac og advarer om, at filer overført til andet medie ikke længere er krypterede. Vejledningen beskriver ingen godkendelsesprocedure for programmer.",
      "[Sådan arbejder du med overholdelsen af GDPR som advokat](" + SOURCE_ADVOKATSAMFUNDET + ") (Advokatsamfundet, 23. maj 2025). Omtaler Advokatsamfundets GDPR-vejledning for advokater fra marts 2025 og understreger, at advokatfirmaet bør vurdere risici og beslutte, hvilket sikkerhedsniveau der er passende.",
    ],
    outro:
      "Unbit er ikke tilknyttet Danmarks Domstole, anklagemyndigheden, politiet eller Advokatsamfundet, og henvisningerne er ikke en tilslutning fra dem.",
  },
  relatedTitle: "Læs også",
  guidesLabel: "Vejledninger",
  footerLabel: "Advokater",
  indexCard: {
    title: "Til advokater: krypteret USB-stick med digital sag",
    text: "Sådan åbner advokater og forsvarere en BitLocker-krypteret sagsstik på Mac – med tjekliste til firmaets egen vurdering og en sikkerhedsnote til IT.",
    cta: "Læs siden til advokater",
  },
};

const en: LawyersContent = {
  meta: {
    title: "Open an encrypted USB stick with digital case files on Mac – for lawyers | Unbit",
    description:
      "For Danish defence lawyers and law firms: how to open a BitLocker-encrypted USB stick with digital case material on a Mac, read-only and locally. With a checklist for your own assessment and a security note for IT.",
    ogTitle: "Open an encrypted USB stick with digital case files on Mac – for lawyers",
  },
  h1: "Open an encrypted USB stick with digital case files on Mac",
  lead:
    "For lawyers and defence counsel in Denmark who receive digital case material from the prosecution, the police or the court on a BitLocker-encrypted USB stick but work on a Mac. This page explains what Unbit does and does not do, and what your firm should assess itself before using it.",
  updated: "Updated {date}",
  breadcrumbLabel: "Breadcrumb",
  actions: { download: "Download Unbit", note: "Go to the security note" },
  disclaimer: {
    label: "Not legal advice",
    text:
      "This page is general information from Unbit and is not legal advice. Unbit is **not** an officially approved, certified or recommended tool of the police, the prosecution service, the courts or the Danish Bar and Law Society (Advokatsamfundet), and using Unbit does not in itself ensure compliance with the GDPR or professional secrecy. The law firm assesses for itself whether the tool is suitable.",
  },
  sections: [
    {
      id: "who",
      title: "Who is this page for?",
      paragraphs: [
        "This page is written for lawyers, defence counsel, victims’ counsel and staff at law firms who are handed a digital case on a USB stick encrypted with Windows BitLocker and who work on a Mac. It can also serve as a starting point for the firm’s IT or data protection officer, who has to decide whether a new tool may be used.",
        "Unbit is a small macOS app for opening BitLocker-encrypted external drives. It was not built specifically for the justice system, and Unbit has no agreement with the police, the prosecution service or the courts.",
      ],
    },
    {
      id: "problem",
      title: "The problem: a BitLocker stick can’t be opened on a Mac",
      paragraphs: [
        "According to the [Danish Courts’ guidance](" + SOURCE_DOMSTOLE + ") (in Danish, version 2.0), the prosecution service sends digital court cases to the court, defence counsel and any victims’ counsel on a USB stick encrypted with Windows BitLocker. The password is sent separately by secure email. On a Windows PC, BitLocker asks for the password automatically when the stick is inserted. macOS, however, can’t open BitLocker-encrypted drives on its own.",
        "When the stick is inserted into a Mac, macOS typically only offers to ignore, eject or initialise the drive. **Never choose Initialise** – it erases the drive.",
        "For Mac, the guidance mentions the third-party program “M3 Mac Bitlocker Loader”. It describes no approval procedure for programs and does not say that other programs may freely be used instead. We have not found a public rule that a particular program must be approved by the police either. The guidance is, however, older, and we can’t say what an individual prosecution office expects. See the sources at the bottom of the page.",
      ],
    },
    {
      id: "help",
      title: "How Unbit helps",
      paragraphs: ["Unbit unlocks a BitLocker-encrypted external drive with a password or 48-digit recovery key and opens it in Finder. That is what the app does – nothing more."],
      bullets: [
        "**Opens the stick read-only.** Unbit does not write to the stick. The drive appears in Finder as a read-only drive, and the app only reads.",
        "**No macFUSE and no drivers.** You don’t install macFUSE, dislocker or similar. Unbit is an ordinary Mac app, signed with a Developer ID and notarised by Apple. An optional one-time setup does install a small, restricted read helper, which requires an administrator password – see the security note.",
        "**Everything happens on your Mac.** Decryption runs locally in the app. Files, codes and drive details are not sent to a cloud service or to Unbit. The decrypted drive is handed to macOS over a local connection on the Mac itself (127.0.0.1), and no decrypted copy is written to disk.",
        "**The code stays on the Mac.** The password or recovery key is entered in the app and not sent anywhere. If you choose “Remember this drive on this Mac”, the code is saved only after a successful unlock, and only in your local macOS keychain (not synced via iCloud). The option is off by default.",
        "**No analysis of the drive’s contents.** The app has no analytics or telemetry. The only network traffic we know of in the app is the automatic update check (Sparkle) once a day via GitHub; it does not include the drive’s contents, file names or codes.",
      ],
      outro: [
        "**Limitations:** Unbit supports external drives only (not internal disks), requires macOS 13 or later, and opens drives protected with a password or a 48-digit recovery key. Unbit is not a forensic tool and does not produce logs or checksums of the stick’s contents. BitLocker sticks can’t be opened on an iPad, with Unbit or any other tool.",
      ],
    },
    {
      id: "steps",
      title: "Step by step",
      steps: [
        "Read the terms and instructions that came with the case from the prosecution, the police or the court, and check that you may use a program like Unbit. The password usually arrives separately by secure email.",
        "[Download Unbit](download), move the app to **Applications**, and open it from there. It lives in the menu bar.",
        "First time only: choose **Set Up Read Access…** in Unbit and approve with your Mac password. This one-time setup installs a small read helper. If you skip it, Unbit asks for administrator approval every time a drive is opened.",
        "Insert the USB stick and select its partition in Unbit. If macOS offers to initialise the drive, don’t.",
        "Choose **Password** and enter the code from the prosecution. If you have a 48-digit recovery key instead, use the **Recovery Key** tab.",
        "Leave “Remember this drive on this Mac” off unless your firm has decided that codes may be stored in the keychain.",
        "Click **Open Drive** and approve with your Mac password if asked. The stick opens in Finder, read-only.",
        "Work with the material under the terms you were given. Note that files copied from the stick to another location are no longer encrypted by BitLocker.",
        "Click **Eject Safely** when you are done, and only then remove the stick. Handle and return the stick as the terms require.",
      ],
      outro: ["More detail and troubleshooting: [How to open a BitLocker drive on Mac](open) and [BitLocker USB drives on Mac](usb)."],
    },
    {
      id: "security",
      title: "Security considerations for the law firm",
      paragraphs: [
        "[Advokatsamfundet’s article on its GDPR guidance for lawyers](" + SOURCE_ADVOKATSAMFUNDET + ") (May 2025, in Danish) stresses that personal data must be processed securely and that the law firm itself decides how risks are assessed and which security level is appropriate. Responsibility for secure handling therefore rests with the firm. The points below are suggestions for what the firm may consider – not an exhaustive or approved list.",
      ],
      bullets: [
        "**Data protection and local processing.** Unbit processes the contents locally on the Mac, and the contents are not transferred to Unbit or a cloud service. What that means for your data protection assessment (for example regarding data processor agreements) is for you to decide.",
        "**Protect the Mac itself.** Turn on FileVault, use a screen lock with a short timeout, keep macOS up to date, and avoid shared user accounts. While the stick is open, anyone using the Mac can read its contents.",
        "**Copies are no longer encrypted.** The Danish Courts’ guidance warns that files transferred from the stick to another medium, drive or email are no longer encrypted. Decide whether material may be copied out and, if so, where the copies may be kept. macOS may also leave traces outside the stick, such as thumbnails, Quick Look caches, recent documents, search indexes and backups – assess whether that is relevant to your setup.",
        "**Decide on keychain storage.** By default no codes are saved. If you save a code, anyone with access to your macOS user account can open that stick. Consider not doing so on shared or laptop Macs, and use **Forget Code** in the gear menu once the stick is no longer needed.",
        "**The read helper.** The one-time setup installs a root launchd service on the Mac that can only open external disks read-only. If the firm doesn’t want it, skip the setup and approve with an administrator password each time. The helper can be removed with **Remove Read Helper…**. On managed Macs, IT may need to perform the setup.",
        "**Eject safely and handle the stick properly.** Use **Eject Safely** before removing the stick, and follow the terms for keeping, deleting or returning it.",
        "**Source and updates.** Download the app only from unbit.app or Unbit’s GitHub releases, and verify the signature (see the security note). The app checks for updates itself and verifies them with a digital signature. Revisit your assessment for major new versions.",
      ],
    },
  ],
  checklist: {
    id: "checklist",
    title: "How to assess whether the tool is suitable",
    intro:
      "Use these points as a starting point for the firm’s own risk assessment. This is not an approval procedure, and ticking every box is no guarantee that the use is acceptable.",
    items: [
      "Terms: Have we read the terms and instructions the prosecution, police or court provided, and do they not rule out programs other than those mentioned?",
      "Risk assessment: Have we assessed the risk of the processing and chosen an appropriate security level in line with the firm’s data protection policy – and does that assessment cover Unbit?",
      "IT review: Has IT read the security note below and accepted the permissions the app asks for (administrator access, possibly Full Disk Access, possibly the keychain)?",
      "Not officially approved: Do we understand that Unbit is not approved, certified or recommended by the police, courts or Advokatsamfundet, and is that stated in our assessment?",
      "The Mac: Is FileVault on, is the screen lock set up, is macOS up to date, and is the Mac not used by others?",
      "Codes: Have we decided whether passwords and recovery keys may be saved in the keychain (default: no)?",
      "Copies: Have we decided whether material may be copied out of the stick, and where copies may be kept and deleted?",
      "Source: Do we download the app from unbit.app or the GitHub releases, and have we checked Apple’s notarisation and the developer signature?",
      "Testing: Have we tried the procedure on a non-confidential BitLocker test drive before opening a real case stick?",
      "Responsibility and documentation: Have we decided who is responsible, where the assessment is documented, and when it is reviewed?",
    ],
    outro: [
      "**Written clarification.** If in doubt, the firm can ask the issuing prosecution office for written clarification on whether using a particular program is acceptable. This is an option that may remove remaining uncertainty – not a documented requirement.",
    ],
  },
  note: {
    id: "security-note",
    title: "Security note for your IT",
    intro:
      "A short text you can copy or download and forward to your IT department or data protection officer. The note is written by Unbit – it is not an independent audit.",
    copy: "Copy the note",
    copied: "Copied",
    download: "Download as text file",
    filename: "unbit-security-note.txt",
    textLabel: "Security note (copyable)",
    lines: [
      "SECURITY NOTE – Unbit (macOS app for opening BitLocker-encrypted external drives)",
      "Prepared by Unbit, 2 October 2026. Applies to Unbit 1.0.x. Source: https://unbit.app/en/lawyers",
      "",
      "This note is written by the developer and is not an independent security audit. Unbit is not approved, certified or recommended by the police, the prosecution service, the courts or Advokatsamfundet. The law firm assesses whether the tool is suitable.",
      "",
      "PURPOSE",
      "Unbit opens BitLocker-encrypted external drives (USB sticks, SSDs, HDDs) on a Mac using a password or 48-digit recovery key. It is used, for example, for digital case files on USB sticks encrypted with Windows BitLocker.",
      "",
      "WHAT THE APP DOES",
      "- Reads the drive’s BitLocker metadata and decrypts the keys inside the app (its own Swift implementation).",
      "- Decrypts data on the fly and makes it available to macOS as a read-only disk image (hdiutil attach -readonly) through a local server on 127.0.0.1 with a random address. No decrypted copy is written to disk.",
      "- Opens the drive in Finder (read-only). “Eject Safely” unmounts and ejects the drive.",
      "",
      "WHAT THE APP DOES NOT DO",
      "- It does not write to the drive (the device is opened read-only).",
      "- It does not install macFUSE, dislocker, kernel extensions or other drivers.",
      "- It does not send the drive’s contents, file names, passwords or recovery keys to anyone, uses no cloud service and has no analytics or telemetry.",
      "- It does not support internal disks and is not a forensic tool (no checksums or logs of the contents).",
      "",
      "PERMISSIONS AND CHANGES TO THE MAC",
      "- Administrator password: “Set Up Read Access” (one-time setup) installs a restricted launchd service running as root under /Library/LaunchDaemons and /Library/PrivilegedHelperTools (named after Unbit’s app ID). The service only accepts connections from the console user and from the exact installed, signed app. It opens only external, physical partitions read-only and hands the app a file descriptor. It never receives passwords. It can be removed with “Remove Read Helper…” in the app. Without the setup, administrator approval is required each time a drive is opened.",
      "- Full Disk Access: macOS may require it for direct reads of the drive. It is also required for the optional “Open known drives automatically” and “Notify when a drive is connected” features (both off by default).",
      "- Keychain: only if the user chooses “Remember this drive on this Mac” (off by default). The code is saved after a successful unlock as an ordinary password item in the user’s local keychain (not synced) and can be deleted with “Forget Code”.",
      "- Notifications (optional; macOS asks) and Start at Login (off by default).",
      "- Clipboard: read only when the user clicks “Paste Recovery Key”.",
      "- The app does not run in the App Sandbox (needed for direct reads of the drive), uses the hardened runtime, is signed with a Developer ID and is notarised by Apple.",
      "",
      "NETWORK",
      "- The only network call we know of in the app is the automatic update check via Sparkle 2, once a day (it can also be started manually). The update feed is hosted on GitHub Pages (github.io), and the update itself is downloaded from github.com (release files). Updates are verified with an EdDSA signature. Sparkle’s optional system profiling is not enabled.",
      "- The local disk image is served only on 127.0.0.1 (loopback), with at most 16 concurrent connections and a random 128-bit token in the address.",
      "- The website unbit.app (not the app) uses Vercel Analytics and Speed Insights for visitor statistics.",
      "",
      "LOGGING AND ERROR REPORT",
      "- The app does not store codes or file names in logs. Timing measurements can be seen in Console (subsystem named after Unbit’s app ID) without codes, volume IDs or file names.",
      "- “Copy Error Report” does not contain codes, drive or volume names, paths or anything the user typed.",
      "",
      "VERIFYING THE APP",
      "- spctl -a -vv /Applications/Unbit.app  (expected: accepted, source=Notarized Developer ID)",
      "- codesign -dv --verbose=2 /Applications/Unbit.app  (Team ID: 6XTQ98822R)",
      "- Test first on a non-confidential BitLocker test drive.",
      "",
      "REMOVAL",
      "- Choose “Remove Read Helper…” in the app, delete the app from Applications, and delete any saved codes with “Forget Code” or in Keychain Access (items whose service name is based on Unbit’s app ID).",
      "",
      "NOTE",
      "This description is based on the developer’s own documentation and may change in newer versions. Using Unbit does not change the law firm’s responsibility to assess risks and security levels itself, or the terms set by the authority that supplied the material.",
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Is Unbit approved by the police, the courts or Advokatsamfundet?",
      a: "No. Unbit is not an officially approved, certified or recommended tool of the police, the prosecution service, the courts or Advokatsamfundet. It is an ordinary program, and the law firm itself assesses whether it is suitable.",
    },
    {
      q: "May I use Unbit instead of “M3 Mac Bitlocker Loader”?",
      a: "We can’t decide that for you. The [Danish Courts’ guidance](" + SOURCE_DOMSTOLE + ") mentions the M3 program for Mac but describes no approval procedure and does not say that other programs may freely be used instead. It is an older document. Check the terms you received from the prosecution or the police, assess it yourself, and if necessary consider asking the issuing prosecution office for written clarification. That is an option, not a documented requirement.",
    },
    {
      q: "Does Unbit comply with the GDPR and professional secrecy?",
      a: "No single tool ensures compliance with the GDPR or professional secrecy by itself, and we don’t claim that. Unbit processes the contents locally on your Mac, and the contents are not sent to Unbit or a cloud service. Responsibility for secure handling overall – risk assessment and an appropriate security level – rests with the law firm, see [Advokatsamfundet’s article on its GDPR guidance](" + SOURCE_ADVOKATSAMFUNDET + ").",
    },
    {
      q: "Does Unbit change anything on the USB stick?",
      a: "No. Unbit is built to read only: the drive is opened read-only and macOS receives it as a read-only disk image. Unbit is not a forensic tool, however, and does not produce checksums or logs documenting that the stick is unchanged.",
    },
    {
      q: "Do I need to install macFUSE or other drivers?",
      a: "No. Unbit doesn’t use macFUSE, dislocker or kernel extensions. As an optional one-time setup the app can install a small read helper that requires an administrator password – see the security note.",
    },
    {
      q: "Where does the password go?",
      a: "You enter it in the app and it is used locally to unlock the stick. It isn’t sent to anyone. Only if you choose “Remember this drive on this Mac” is it saved, after a successful unlock, in your local macOS keychain. You can delete it again with “Forget Code”.",
    },
    {
      q: "What network traffic does the app have?",
      a: "The only network call we know of in the app is the automatic update check (Sparkle) once a day. The feed is on GitHub Pages, and the update itself is downloaded from GitHub and verified with a digital signature. It does not include the drive’s contents, file names or codes. The website unbit.app uses Vercel Analytics and Speed Insights for visitor statistics; that does not apply to the app.",
    },
    {
      q: "The stick won’t open – what should I do?",
      a: "Check that the code is typed exactly as received, and try the recovery key if you have one. Re-insert the stick and click Try Again. If you use a hub or adapter, try a direct USB port. If that doesn’t help, ask the sender to confirm the code or send the stick again. If the stick is protected in a way other than a password or recovery key, Unbit can’t open it. See also the [guide to BitLocker USB drives on Mac](usb).",
    },
    {
      q: "Does it work on iPad or iPhone?",
      a: "No, Unbit is for Mac only. The Danish Courts’ guidance states that BitLocker sticks can’t be opened on an iPad.",
    },
    {
      q: "How do I remove Unbit again?",
      a: "Choose “Remove Read Helper…” in the gear menu, quit the app, and delete it from Applications. Saved codes can be removed with “Forget Code” in the app or in Keychain Access.",
    },
  ],
  sources: {
    id: "sources",
    title: "Sources",
    intro: "This page is based on the following public sources (both in Danish). Check for yourself what applies at the time you read this.",
    items: [
      "[Vejledning til retten og forsvarere om åbning af digital sag på krypteret USB-stik](" + SOURCE_DOMSTOLE + ") (Danish Courts, version 2.0, PDF). Describes that the prosecution sends digital cases on a Windows-BitLocker-encrypted USB stick with the password by secure email, mentions the program “M3 Mac Bitlocker Loader” for Mac, and warns that files transferred to another medium are no longer encrypted. It describes no approval procedure for programs.",
      "[Sådan arbejder du med overholdelsen af GDPR som advokat](" + SOURCE_ADVOKATSAMFUNDET + ") (Advokatsamfundet, 23 May 2025). Discusses Advokatsamfundet’s March 2025 GDPR guidance for lawyers and stresses that the law firm should assess risks and decide which security level is appropriate.",
    ],
    outro:
      "Unbit is not affiliated with the Danish Courts, the prosecution service, the police or Advokatsamfundet, and these references do not imply their endorsement.",
  },
  relatedTitle: "Related guides",
  guidesLabel: "Guides",
  footerLabel: "Lawyers",
  indexCard: {
    title: "For lawyers: encrypted USB stick with digital case files",
    text: "How Danish lawyers and defence counsel can open a BitLocker-encrypted case stick on a Mac – with a checklist for the firm’s own assessment and a security note for IT.",
    cta: "Read the page for lawyers",
  },
};

export const LAWYERS_CONTENT: Record<LawyersLocale, LawyersContent> = { da, en };
