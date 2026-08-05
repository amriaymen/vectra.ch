import type { Dictionary } from './content.en';
import { SWISS_ENTITY } from './config';
/** Siehe content.en.ts — die Herkunftsangabe ist an die Schweizer Gesellschaft gekoppelt. */
const herkunft = {
  descriptionOpener: SWISS_ENTITY
    ? 'Schweizer Studio für Software und Kommunikation.'
    : 'Studio für Software und Kommunikation für Schweizer Institutionen.',
  kicker: SWISS_ENTITY ? 'Operative Software · Schweiz' : 'Operative Software · Für die Schweiz',
  rights: SWISS_ENTITY
    ? 'Vectra — Schweizer Managementsysteme & Kommunikation.'
    : 'Vectra — Managementsysteme & Kommunikation für Schweizer Institutionen.',
};

/**
 * Swiss High German (de-CH).
 *
 * ACTION REQUIRED — this is a careful first draft, not a reviewed translation.
 * A Swiss buyer in the DACH region spots weak German immediately, and it costs more
 * credibility than an English-only site would. Have a native reviewer pass over
 * it before /de is linked publicly.
 *
 * Typed as `Dictionary`, so a missing or misspelled key fails `npm run build`.
 */
const de: Dictionary = {
  meta: {
    title: 'Vectra | Managementsysteme & Kommunikation für Schweizer Institutionen',
    description:
      `${herkunft.descriptionOpener} Managementsysteme — Schulverwaltung, HR und Lohnbuchhaltung, Raumreservationen — gehostet in der Schweiz. Plus Marke, Erklärvideos und Kampagnen. Fixpreis-Meilensteine.`,
    keywords: [
      'Schulverwaltungssoftware Schweiz',
      'HR und Lohnsystem Schweiz',
      'Raumreservationssoftware',
      'Massgeschneiderte Systementwicklung',
      'Web-Applikationsentwicklung Schweiz',
      'Erklärvideo Agentur',
      'Vectra',
    ],
    ogAlt: 'Vectra — Managementsysteme und Kommunikation für Schweizer Institutionen',
  },

  nav: {
    work: 'Referenzen',
    process: 'Prozess',
    pricing: 'Preise',
    faqs: 'FAQs',
    // Problemorientiert statt lösungsorientiert: Interessenten kommen mit einem
    // Betriebsproblem, nicht mit einem bereits definierten Projekt.
    cta: 'Bedarf schildern',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schliessen',
    menuTitle: 'Seiten-Navigation',
    language: 'Sprache',
    home: 'Vectra — Startseite',
  },

  hero: {
    kicker: herkunft.kicker,
    titleLine1: 'Wir bauen das System,',
    titleLine2: 'dann machen wir es begehrenswert.',
    body: 'Schweizer Softwarestudio. Wir entwickeln operative Software, massgeschneiderte Anwendungen und die Kommunikationsstrategien, die deren Akzeptanz sichern.',
    primaryCta: 'Projekt berechnen',
    secondaryCta: 'Unsere Arbeiten ansehen',
    proof: 'Software im Einsatz in Schweizer Schulen, Sportzentren, Gemeinden und Unternehmen.',
    mediaLabel: 'Das Schoolze Schulverwaltungsportal im Einsatz',
  },

  engagementModels: {
    title: 'Wie wir zusammenarbeiten',
    items: [
      { step: '01', title: 'Softwarelizenz', desc: 'Nutzen Sie eine unserer bestehenden Plattformen.\nSchulverwaltung\nSportplatzbuchung\nHR & Lohn' },
      { step: '02', title: 'Massgeschneidertes Projekt', desc: 'Benötigen Sie etwas Einzigartiges?\n\nWir konzipieren und entwickeln es.' },
      { step: '03', title: 'Laufende Partnerschaft', desc: 'Benötigen Sie kontinuierliches Design, Entwicklung und Wachstum?\n\nMonatliches Abonnement.' }
    ]
  },

  whoWeServe: {
    kicker: 'Branchen & Bereiche',
    title: 'Wir sind auf operative Software spezialisiert.',
    list: ['Bildungswesen', 'Sportanlagen', 'Öffentlicher Sektor', 'KMU & Startups'],
    footer: 'Wir entwickeln auch massgeschneiderte Software für Startups und Unternehmen.',
    badge: 'Spezialisierte Systeme'
  },

  decisionMatrix: {
    title: 'Ist Vectra das Richtige für Sie?',
    subtitle: 'Wählen Sie den Weg, der zu Ihrer Situation passt:',
    columns: ['Wenn Sie...', 'Dann wählen Sie...'],
    rows: [
      { condition: 'Eine bereits entwickelte Software benötigen', choice: 'Eines unserer Produkte lizenzieren' },
      { condition: 'Eine auf Ihre Organisation zugeschnittene Software benötigen', choice: 'Massgeschneidertes Projekt' },
      { condition: 'Kontinuierliche Unterstützung bei Design, Entwicklung oder Wachstum benötigen', choice: 'Abonnement' }
    ]
  },

  whyVectra: {
    title: 'Warum Organisationen Vectra wählen',
    trustTitle: 'Institutionell geprüft',
    items: [
      { label: 'Meilensteine zum Festpreis', detail: 'Jeder Meilenstein wird vor Beginn offeriert. Keine unbegrenzte stundenbasierte Abrechnung.' },
      { label: 'In der Schweiz gehostete Infrastruktur', detail: 'Die Systeme, die wir für Sie bauen, laufen auf Schweizer Infrastruktur unter Schweizer Gerichtsstand. Anbieter und Rechenzentrum nennen wir schriftlich.' },
      { label: 'Sie besitzen den Code', detail: 'Quellcode, Schemata und Designdateien gehen vom ersten Tag an in Ihren Besitz über.' },
      { label: 'Direkter Zugang zu den Ingenieuren', detail: 'Sie arbeiten mit den Ingenieuren zusammen, die die Arbeit ausführen. Keine Account Manager.' },
      { label: 'Ein Team für Software und Akzeptanz', detail: 'Das Team, das das System gebaut hat, erklärt es auch. Die Story passt zum Produkt.' }
    ],
    // Nur Beschriftungen. Die Werte sind Fakten und stehen in CREDENTIALS
    // (config.ts); ein nicht gesetzter Wert ist null und wird nicht angezeigt.
    credentials: {
      uid: 'Schweizer Firmenregistrierung',
      insurance: 'Versicherung',
      stack: 'Technologie'
    }
  },

  trust: [
    {
      // Bewusst an erster Stelle: für eine Schule oder Gemeinde entscheidet
      // diese Frage, ob überhaupt weitergelesen wird.
      label: 'Ihre Daten bleiben in der Schweiz',
      detail:
        'Das System, das wir für Sie bauen, wird bei einem Schweizer Anbieter unter Schweizer Jurisdiktion gehostet. Kein US-Hyperscaler.',
    },
    {
      label: 'Nach den Regeln Ihres Kantons',
      detail:
        'Schulen und Gemeinden unterstehen dem kantonalen Datenschutzgesetz, nicht dem Bundesgesetz. Wir bauen nach den Vorgaben Ihres Kantons.',
    },
    {
      label: 'Fixpreis-Meilensteine',
      detail: 'Jeder Meilenstein wird vor Start offeriert. Keine unbegrenzte Abrechnung nach Aufwand.',
    },
    {
      label: 'Der Code gehört Ihnen',
      detail: 'Quellcode, Datenbankschemas und Design-Dateien gehen vom ersten Tag an in Ihren Besitz über.',
    },
  ],

  problem: {
    title: 'Die meisten Institutionen brauchen zwei Partner: Einen, der das System baut, und einen, der es erklären kann.',
    body1:
      'Ein Software-Team und eine Kommunikationsagentur separat zu beauftragen, bedeutet, zweimal für denselben Kontext zu bezahlen – und mit der Kluft dazwischen zu leben: Ein System, das funktioniert, aber niemand nutzt, oder eine Kampagne, die etwas verspricht, das die Software nicht kann.',
    body2:
      'Wir machen beides, mit einem Team und einem Projektumfang. Meilenstein-Preise anstelle eines offenen Retainers, erfahrene Entwickler und Designer anstelle einer wechselnden Besetzung und Code, der uneingeschränkt Ihnen gehört.',
  },

  tracks: {
    title: 'Zwei Bereiche. Ein Team.',
    intro: 'Go baut die Software. Sketch sorgt für den Erfolg am Markt. Wählen Sie eines oder beides — der Preis pro Meilenstein ist in jedem Fall fix.',
    badge: 'Am häufigsten angefragt',
    ctaBuild: 'Entwicklung offerieren lassen',
    ctaTell: 'Kampagne offerieren lassen',
    build: {
      kicker: 'Go — wir bauen es',
      title: 'Die Systeme, auf denen Ihre Institution läuft',
      promise:
        'Verwaltung, Planung, Zeiterfassung, Lohnbuchhaltung und Abrechnung — entwickelt für die tatsächlichen Abläufe Ihrer Organisation, nicht als Standard-Vorlage.',
      services: [
        {
          name: 'Schul- & Institutionsverwaltung',
          detail: 'Einschreibungen, Anwesenheiten, Noten, Elternportale, Rechnungsstellung und standortübergreifende Verwaltung.',
        },
        {
          name: 'HR, Zeiterfassung & Lohn',
          detail: 'Ein- und Ausstempeln, Absenzen- und Vertragsverwaltung, Lohnberechnung und Reporting.',
        },
        {
          name: 'Reservation & Anlagenverwaltung',
          detail: 'Ressourcen-Kalender, Mitgliederverwaltung, Online-Buchungen und automatisierte Zahlungen.',
        },
        {
          name: 'Integrationen & Datenmigration',
          detail: 'Anbindung neuer Systeme an Buchhaltung, Zahlungsanbieter und Altsysteme sowie die Übernahme bestehender Daten.',
        },
      ],
    },
    tell: {
      kicker: 'Sketch — wir machen es erfolgreich',
      title: 'Kommunikation, die zur Nutzung anregt',
      promise:
        'Dasselbe Team, das das System gebaut hat, erklärt es auch — so entspricht die Kommunikation dem Produkt, anstatt etwas zu beschreiben, das nicht existiert.',
      services: [
        {
          name: 'Markenidentität & Design-Systeme',
          detail: 'Logo-Systeme, Typografie, Farben und Komponenten-Bibliotheken, die über alle Produkte hinweg konsistent bleiben.',
        },
        {
          name: 'Animierte Erklärvideos',
          detail: '2D- und 3D-Animationen, die ein komplexes System in unter einer Minute verständlich machen.',
        },
        {
          name: 'Onboarding- & Adoptionsmaterial',
          detail: 'Trainings-Walkthroughs, In-App-Anleitungen und Dokumentationen für Mitarbeitende, damit das System tatsächlich genutzt wird.',
        },
        {
          name: 'Kampagnen & Lead-Funnels',
          detail: 'Landing Pages, E-Mail-Sequenzen und CRM-Automatisierung, direkt mit Ihrer Pipeline verknüpft.',
        },
      ],
    },
  },

  products: {
    title: 'Systeme, die wir bereits betreiben',
    intro: 'Diese Produkte demonstrieren unsere Engineering-Kompetenz. Jedes massgeschneiderte Projekt profitiert von unserer jahrelangen Erfahrung in der Produktentwicklung.',
    forWhoLabel: 'Entwickelt für',
    problemLabel: 'Problem',
    solutionLabel: 'Lösung',
    outcomeLabel: 'Ergebnis',
    modulesLabel: 'Was es leistet',
    scaleLabel: 'Grösse',
    stackLabel: 'Technologie',
    readMore: 'Zum Produkt',
    statusAvailable: 'Ab sofort verfügbar',
    statusRunning: 'Im produktiven Einsatz',
    demoCta: 'Demo buchen',
    adaptCta: 'Zu diesem System anfragen',
    alsoTitle: 'Ausserdem umgesetzt',
    alsoIntro: 'Produkt- und Markenarbeiten jenseits unserer Kernkompetenz Managementsysteme.',
    domains: {
      education: 'Bildung',
      sports: 'Sport & Freizeit',
      hr: 'HR & Lohn',
      product: 'Produkt',
      brand: 'Marke',
    },
    /*
     * Das sind unsere eigenen Produkte: Jeder Eintrag beschreibt die SOFTWARE —
     * für wen sie gebaut ist und was sie leistet. Niemals die Situation eines
     * konkreten Kunden: eine erfundene Fallgeschichte ist fabrizierter Beleg.
     */
    items: {
      spotbase: {
        tagline: 'Sportanlagenverwaltung & Buchung',
        forWho: 'Sportzentren, Vereine und Gemeinden, die buchbare Anlagen verwalten.',
        summary: 'Ressourcenkalender, Online-Reservationen, Mitgliedschaften und Zahlung in einem System, sodass eine Buchung und das zugehörige Geld einen einzigen Datensatz bilden.',
        problem: 'Anlagen verwalten Buchungen telefonisch, was zu Doppelbuchungen und nicht erfassten Einnahmen führt.',
        solution: 'Aufbau einer Self-Service-Buchungsplattform mit integrierter Zahlung und Ressourcenregeln.',
        outcome: 'Keine Doppelbuchungen und Echtzeitdaten zur Anlagennutzung.',
        modules: ['Ressourcenkalender', 'Online-Buchung', 'Mitgliedschaften', 'Zahlungen', 'Nutzungsberichte'],
        scale: '',
      },
      schoolze: {
        tagline: 'Schulverwaltungsportal',
        forWho: 'Primar- und Sekundarschulen sowie Schulgruppen mit mehreren Standorten.',
        summary: 'Einschreibung, Anwesenheit, Notengebung, Elternkommunikation und Rechnungsstellung in einem Portal, mit rollenbezogenem Zugriff für Verwaltung, Lehrpersonal und Eltern.',
        problem: 'Schulen verwalten Hunderte von Schülern mit unzusammenhängenden Tabellenkalkulationen und Papierformularen.',
        solution: 'Aufbau einer zentralisierten Plattform für Noten, Anwesenheit und Elternkommunikation.',
        outcome: 'Reduzierter Verwaltungsaufwand und abgestimmte Rechnungsstellung.',
        modules: ['Einschreibung und Akten', 'Anwesenheit', 'Noten und Zeugnisse', 'Elternportal', 'Rechnungsstellung'],
        scale: '',
      },
      'sb-pointage': {
        tagline: 'Zeiterfassung & Lohnbuchhaltung',
        forWho: 'Arbeitgeber mit Schicht- oder Stundenpersonal, deren Stunden ohne Doppelerfassung in die Lohnabrechnung gelangen müssen.',
        summary: 'Check-in und Checkout, Urlaubs- und Vertragsverwaltung, Lohnberechnung und Lohnexport — eine einzige Kette von der Stechuhr bis zur Lohnabrechnung.',
        problem: 'Papier-Stundenzettel verursachen monatliche Verzögerungen bei der Lohnabrechnung und Streitigkeiten über den Urlaubssaldo.',
        solution: 'Bereitstellung von Terminals und mobiler Zeiterfassung, die direkt in automatisierte Lohnberechnungen einfliessen.',
        outcome: 'Fehlerfreie Lohnexporte und vollständig prüfbare Personalakten.',
        modules: ['Check-in / Checkout', 'Urlaubsverwaltung', 'Lohnberechnung', 'Lohnexport', 'Personalakten'],
        scale: '',
      },
      raqim: {
        tagline: 'Standortübergreifende Schulverwaltung',
        forWho: 'Schulgruppen, die eine konsolidierte Sicht über mehrere Standorte benötigen.',
        summary: 'Akademische Aufzeichnungen, Personalverwaltung, Terminplanung und Berichterstattung über mehrere Standorte hinweg, wobei Zahlen zentral konsolidiert anstatt standortweise zusammengestellt werden.',
        problem: 'Standortübergreifende Gruppen kämpfen mit fragmentierten Daten und mangelndem konsolidierten Reporting.',
        solution: 'Aufbau einer mandantenfähigen Administrationsplattform, die Akten über alle Campus hinweg vereinheitlicht.',
        outcome: 'Echtzeit-Transparenz und standardisierte Prozesse in der gesamten Organisation.',
        modules: ['Standortübergreifende Verwaltung', 'Akademische Akten', 'Personalverwaltung', 'Planung', 'Konsolidiertes Reporting'],
        scale: '',
      },
    },
    also: {
      hellodesk: { name: 'Hellodesk', detail: 'Buchungsplattform für Coworking-Spaces — Suche, Reservationen und Host-Onboarding.' },
      audio: { name: 'Live-Audio-App', detail: 'Community-Audio-Produkt — Mobile-First Räume, Einladungen und Interessens-Graph.' },
      spectrum: { name: 'Spectrum', detail: 'Markenidentität und Logo-System.' },
    },
  },

  benefits: {
    title: 'Warum Teams uns wählen',
    intro: 'Ein Team für die Software und die Story, zu Bedingungen, die es Ihnen erlauben, nach jedem Meilenstein zu stoppen.',
    items: [
      {
        title: 'Um Ihre Abläufe herum gebaut',
        detail:
          'Managementsysteme, entwickelt für die tatsächlichen Abläufe Ihrer Organisation — nicht als Standard-Vorlage, an die Sie sich anpassen müssen.',
      },
      {
        title: 'Direkter Kontakt zu Senior-Profilen',
        detail: 'Sie arbeiten direkt mit den Ingenieuren, Architekten und Designern zusammen, die die Arbeit machen. Kein Account-Manager, der Nachrichten weiterleitet.',
      },
      {
        title: 'Lieferung in Wochen, nicht Quartalen',
        detail: 'Ein erstes Modul ist in 3 bis 5 Wochen einsatzbereit. Jeder Meilenstein endet mit einem funktionierenden System, das Sie testen können.',
      },
    ],
  },

  process: {
    title: 'Wie ein Projekt abläuft',
    intro: 'Drei Schritte, offeriert und geplant, bevor die Arbeit beginnt.',
    steps: [
      {
        step: '01',
        title: 'Anforderungsanalyse & Architektur',
        detail:
          'Wir analysieren den Prozess, den Sie optimieren möchten, und liefern einen schriftlichen Projektplan mit Meilensteinen, Zeitplan und Fixpreis pro Meilenstein.',
      },
      {
        step: '02',
        title: 'Entwicklung & Review',
        detail:
          'Sie arbeiten direkt mit den Entwicklern und Designern zusammen. Jeder Meilenstein endet in einem funktionierenden Review-Termin am System, nicht mit einem Statusbericht.',
      },
      {
        step: '03',
        title: 'Übergabe & Skalierung',
        detail:
          'Wir stellen das System online, schulen Ihr Team und übergeben den Code sowie alle Assets. Laufende Arbeiten werden nur auf monatlicher Basis fortgeführt, wenn Sie dies wünschen.',
      },
    ],
  },

  pricing: {
    title: 'Drei Arten der Zusammenarbeit',
    intro: 'Publizierte Tarife, feste Meilensteine und kein kostenpflichtiges Scoping.',
    onRequest: 'Auf Anfrage',
    models: {
      license: {
        name: 'Softwarelizenz',
        detail: 'Stellen Sie sofort eine unserer bestehenden Plattformen bereit.',
        includes: ['Sofort einsatzbereite Software', 'Schweizer Hosting inklusive', 'Sofortige Bereitstellung', 'Laufende Updates'],
        cta: 'Produkte ansehen'
      },
      project: {
        name: 'Projekt',
        detail: 'Massgeschneiderte Software mit festem Umfang, vor Beginn nach Meilensteinen offeriert und geplant.',
        includes: ['Massgeschneiderte Architektur', 'Lieferung nach Meilensteinen', 'Festpreis', 'Vollständiges geistiges Eigentum'],
        cta: 'Projekt berechnen'
      },
      subscription: {
        name: 'Abonnement',
        detail: 'Laufender Zugriff auf unsere Software- und Designkapazitäten nach dem Launch. Eine langfristige Produktpartnerschaft.',
        includes: ['Kontinuierliche Entwicklung', 'UI/UX und Motion Design', 'Priorisierte Planung', 'Jederzeit pausieren oder kündigen'],
        cta: 'Abonnement abschliessen'
      }
    },
    tiers: {
      perMonth: '/Monat',
      perYear: '/Jahr',
      note: 'Jahresvertrag: zwei Monate geschenkt.',
      names: { design: 'Design', build: 'Build', scale: 'Scale' }
    }
  },

  scope: {
    title: 'Fixpreis-Offerte anfragen',
    intro:
      'Beantworten Sie fünf kurze Fragen und wir erstellen Ihnen in etwa einer Minute einen ersten Projektplan — Phasen, Leistungen, Zeitplan und einen Preisrahmen — direkt auf dieser Seite. Kein Anruf nötig und völlig kostenlos.',
    aside: 'Sprechen Sie lieber persönlich mit uns? Buchen Sie stattdessen einen Termin über den Banner unten.',
    stepOf: 'Schritt {current} von {total}',
    stepNames: ['Was Sie brauchen', 'Module', 'Grösse', 'Zeitplan', 'Ihre Angaben'],
    next: 'Weiter',
    back: 'Zurück',
    submit: 'Offerte generieren',
    submitting: 'Wird erstellt…',
    progress: {
      reading: 'Ihre Anforderungen werden gelesen',
      drafting: 'Phasen und Leistungen werden entworfen',
      estimating: 'Zeitplan und Kostenrahmen werden geschätzt',
    },
    q1: { title: 'Welche Art von System benötigen Sie?', hint: 'Wählen Sie die treffendste Option.' },
    q2: { title: 'Welche Bestandteile brauchen Sie?', hint: 'Wählen Sie alles Zutreffende aus.' },
    q3: { title: 'Wie gross ist das Projekt?', hint: 'Grobe Schätzungen reichen aus.' },
    q4: { title: 'Wann soll das System live gehen?', hint: 'Und mit welchem ungefähren Budget planen Sie?' },
    q5: { title: 'Wohin dürfen wir die Offerte senden?', hint: '' },
    fields: {
      users: 'Wie viele Personen werden das System in etwa nutzen?',
      sites: 'Wie viele Standorte oder Niederlassungen?',
      existing: 'Mit welchen Systemen muss es kompatibel sein?',
      existingPlaceholder: 'z.B. unsere Buchhaltungssoftware, eine bestehende Schülerdatenbank, Stripe',
      name: 'Name',
      email: 'Geschäftliche E-Mail',
      company: 'Organisation / Firma',
      notes: 'Müssen wir noch etwas anderes wissen?',
      notesPlaceholder: 'z.B. wir haben drei Standorte und die Anwesenheit wird wöchentlich manuell abgestimmt',
    },
    domains: {
      education: 'Schule oder Bildungsinstitution',
      sports: 'Sport- oder Freizeitanlage',
      hr: 'HR, Zeiterfassung oder Lohn',
      other: 'Etwas anderes',
    },
    timelines: {
      urgent: { label: 'So bald wie möglich', detail: 'Ein erstes Modul, 3–5 Wochen' },
      standard: { label: 'Nächstes Quartal', detail: 'Vollständiges System, 6–10 Wochen' },
      ongoing: { label: 'Laufende Kapazität', detail: 'Abonnement, Monat für Monat' },
    },
    budgets: {
      unsure: 'Noch unsicher',
      small: "Unter CHF 15'000",
      medium: "CHF 15'000 – 60'000",
      large: "Über CHF 60'000",
    },
    result: {
      title: 'Ihr erster Projektplan',
      disclaimer:
        'Dies ist eine erste grobe Schätzung, die auf Ihren Antworten basiert, kein verbindliches Angebot. Wir bestätigen den genauen Umfang und Preis schriftlich, bevor die Arbeit beginnt.',
      phases: 'Phasen',
      deliverables: 'Leistungen',
      timeline: 'Geschätzter Zeitplan',
      weeks: 'Wochen',
      range: 'Richtpreisrahmen',
      assumptions: 'Unsere Annahmen',
      risks: 'Faktoren, die die Schätzung beeinflussen könnten',
      outOfScope: 'Nicht enthalten',
      emailed: 'Wir haben eine Kopie an Sie und an unser Team gesendet. Sie erhalten innerhalb eines Arbeitstages eine schriftliche Offerte.',
      restart: 'Neu starten',
      book: 'Gespräch zur Verfeinerung buchen',
    },
    errors: {
      generic: 'Etwas ist schiefgelaufen.',
      notSent: 'Ihre Daten wurden nicht gesendet — bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
      degraded:
        'Wir haben Ihre Anfrage erhalten. Die sofortige Entwurfsgenerierung ist derzeit nicht verfügbar, daher senden wir Ihnen die Offerte per E-Mail zu.',
    },
  },

  faqs: {
    title: 'Häufig gestellte Fragen',
    items: [
      {
        question: 'Welche Art von Systemen bauen Sie?',
        answer:
          'Operative Managementsysteme: Schul- und Institutionsverwaltung, HR mit Zeiterfassung und Lohnbuchhaltung sowie Buchungs- oder Anlagenverwaltung. Wir starten bei dem Prozess, den Sie optimieren wollen, nicht bei einer Produktvorlage.',
      },
      {
        question: 'Sie bieten sowohl Entwicklung als auch Kommunikation an — ist das nicht zu breit gefächert?',
        answer:
          'Wir arbeiten in zwei Bereichen. "Build" umfasst Managementsysteme sowie Web- und Mobile-Apps. "Tell" deckt Markenidentität, Erklärvideos und Kampagnen ab. Die meisten Kunden starten mit einem Bereich. Der Vorteil beider Bereiche unter einem Dach ist, dass dieselben Leute, die das System bauen, es auch erklären — so entspricht die Kommunikation dem tatsächlichen Endprodukt.',
      },
      {
        question: 'Wie ist die Preisgestaltung strukturiert?',
        answer:
          'Auf zwei Arten. Ein Fixpreis pro Meilenstein für Projektarbeiten oder ein publiziertes monatliches Abonnement für fortlaufende Kapazität. Sie erhalten Projektumfang, Zeitplan und Preis schriftlich, bevor ein Meilenstein beginnt, und können jederzeit zwischen zwei Meilensteinen stoppen.',
      },
      {
        question: 'Wie sehen typische Zeitpläne aus?',
        answer:
          'Ein erstes Modul oder MVP dauert etwa 3 bis 5 Wochen. Eine vollständige Managementplattform benötigt 6 bis 10 Wochen. Arbeiten in den Bereichen Branding und Erklärvideos nehmen 1 bis 3 Wochen in Anspruch. Sie erhalten einen Meilenstein-Fahrplan mit Terminen, bevor die Arbeit beginnt.',
      },
      {
        question: 'Können Sie die Systeme integrieren, die wir bereits nutzen?',
        answer:
          'Ja. Wir bauen Integrationen zu Buchhaltungssoftware, Zahlungsanbietern und bestehenden Datenbanken, einschliesslich On-Premise-Systemen, die nur eine Datenbankverbindung bereitstellen, und migrieren Ihre historischen Daten.',
      },
      {
        question: 'Unser System enthält personenbezogene Daten. Wie gehen Sie damit um?',
        answer:
          'Schüler-, Personal- und Lohndaten sind besonders schützenswerte Personendaten. Die Zugriffskontrolle ist deshalb Teil der Architektur und kein nachträglicher Zusatz: rollenbasierte Berechtigungen, Audit-Protokollierung, Verschlüsselung im Ruhezustand und Datenminimierung by Design. Wichtig: Schulen und Gemeinden sind kantonale bzw. kommunale Organe — es gilt somit Ihr kantonales Datenschutzgesetz und die Aufsicht liegt bei Ihrer kantonalen Datenschutzbeauftragten, nicht beim Bundesgesetz. Wir bauen nach den Vorgaben Ihres Kantons und liefern den Eintrag im Bearbeitungsverzeichnis sowie eine Datenschutz-Folgenabschätzung, die Sie direkt weiterreichen können. Für private Arbeitgeber gilt stattdessen das revDSG, nach dem wir ebenfalls arbeiten.',
      },
      {
        question: 'Wo werden unsere Daten gehostet?',
        answer:
          'Das System, das wir für Sie bauen, läuft in der Schweiz, bei einem Schweizer Anbieter, unter Schweizer Jurisdiktion — nicht bei einem US-Hyperscaler. Wir nennen Anbieter und Rechenzentrum schriftlich, damit Ihre Datenschutzbeauftragte dies überprüfen kann. Unsere eigene Website ist ein separater Fall: Das Sofort-Scoping-Formular übermittelt Ihre Eingaben an Dienste ausserhalb der Schweiz, die unsere Datenschutzerklärung namentlich nennt.',
      },
      {
        question: 'Wir sind eine Schule oder Gemeinde. Wie läuft die Beschaffung ab?',
        answer:
          'Unterhalb der kantonalen Schwelle für das Einladungsverfahren kann ein Auftrag in der Regel ohne offene Ausschreibung vergeben werden — bei Dienstleistungen liegt das meist unter CHF 150’000, die Schwellenwerte unterscheiden sich jedoch je Kanton und werden alle zwei Jahre angepasst; prüfen Sie den aktuellen Wert für Ihren Kanton. Darüber hinaus reichen wir über SIMAP ein und liefern das übliche Dossier: Referenzen, Versicherungsnachweis, Datenschutzkonzept und Subunternehmererklärung. Unsere Fixpreis-Meilensteine sind so aufgebaut, wie öffentliche Budgets bewilligt werden.',
      },
      {
        question: 'Besitzen wir den Quellcode und die Design-Assets?',
        answer:
          'Ja, vollumfänglich. Bei der Übergabe erhalten Sie den Quellcode, die Datenbankschemas, die Design-System-Dateien und die Medien-Assets. Es gibt keine Lizenzen, die erneuert werden müssen, und nichts hindert Sie daran, zu einem anderen Team zu wechseln.',
      },
      {
        question: 'Bieten Sie nach dem Launch eine laufende Wartung an?',
        answer:
          'Ja — Post-Launch-Wartung, Cloud-Infrastruktur-Management, Sicherheitsupdates und fortlaufende Weiterentwicklung von Funktionen, entweder als monatliches Projektbudget oder über das Abonnement.',
      },
    ],
  },

  procurement: {
    title: 'Beschaffung für Schulen, Gemeinden und öffentliche Stellen',
    intro:
      'Öffentliche Stellen beschaffen nach den Regeln des öffentlichen Beschaffungswesens. Wir arbeiten innerhalb dieser Regeln statt daran vorbei und dimensionieren Projekte entsprechend.',
    points: [
      {
        title: 'Oft ohne offene Ausschreibung',
        detail:
          'Unterhalb der kantonalen Schwelle für das Einladungsverfahren — bei Dienstleistungen meist unter CHF 150’000 — kann ein Auftrag in der Regel freihändig vergeben werden. Die Schwellenwerte unterscheiden sich je Kanton und werden alle zwei Jahre angepasst; prüfen Sie den aktuellen Wert für Ihren Kanton.',
      },
      {
        title: 'Wir reichen über SIMAP ein',
        detail:
          'Oberhalb der Schwelle offerieren wir im ordentlichen Verfahren und liefern das übliche Dossier: Referenzen, Versicherungsnachweis, Datenschutzkonzept und Subunternehmererklärung.',
      },
      {
        title: 'Meilensteine passend zum Budgetzyklus',
        detail:
          'Fixpreis-Meilensteine entsprechen der Art, wie öffentliche Budgets bewilligt und freigegeben werden, statt eine Gesamtsumme zu Beginn zu verlangen.',
      },
      {
        title: 'Die Unterlagen, die Ihre Datenschutzstelle verlangt',
        detail:
          'Eintrag im Bearbeitungsverzeichnis, Datenschutz-Folgenabschätzung und schriftliche Bestätigung des Hosting-Standorts — als Teil des Auftrags erstellt, nicht nachträglich.',
      },
    ],
  },

  cta: {
    title: 'Noch unsicher, was Sie benötigen? Sprechen Sie 30 Minuten mit einem Software-Architekten, nicht mit dem Vertrieb.',
    button: '30-Minuten-Gespräch buchen',
  },

  footer: {
    title: 'Erzählen Sie uns, was Ihre Organisation ausbremst.',
    button: 'Offerte anfragen',
    note: 'Sie erhalten einen schriftlichen Projektplan mit Meilensteinen und Preisen, bevor Sie sich zu etwas verpflichten.',
    legal: 'AGB · Datenschutz · Impressum — demnächst',
    rights: herkunft.rights,
    team: 'Verteiltes Team, das zu Schweizer Bürozeiten arbeitet. Kundendaten in der Schweiz gehostet.',
    social: 'Social Media',
  },

  proof: {
    systems: 'Systeme in Produktion',
    years: 'Jahre Erfahrung',
    institutions: 'Betreute Institutionen',
  },

  testimonials: {
    title: 'Was die Verantwortlichen dieser Systeme sagen',
  },

  pages: {
    home: 'Startseite',
    solutions: 'Lösungen',
    services: 'Dienstleistungen',
    servicesInArea: 'Dienstleistungen in diesem Bereich',
    included: 'Was eine Entwicklung beinhaltet',
    relatedWork: 'Ähnliche Projekte',
    problemTitle: 'Das Problem',
    solutionTitle: 'Was wir bauen',
    pricingTitle: 'Was es kostet',
    pricingBody:
      'Fixpreis pro Meilenstein, schriftlich vereinbart, bevor der Meilenstein beginnt. Die Aufwandschätzung ist kostenlos und Sie können jederzeit zwischen zwei Meilensteinen stoppen.',
    pricingCta: 'Fixpreis-Offerte anfragen',
    allSolutions: 'Alle Lösungen',
    solutionsIntro:
      'Vier Bereiche, für die wir entwickeln — jeweils mit den Systemen, Dienstleistungen und Preisen, die dafür gelten. Beginnen Sie mit dem Bereich, der dem tatsächlichen Betrieb Ihrer Institution entspricht.',
  },

  hubs: {
    'school-management': {
      // `navShort` ist die Beschriftung im Header. Sie muss kurz genug bleiben,
      // damit drei Bereiche, Sprachwahl und CTA bei 1024px nebeneinander passen.
      navShort: 'Schulen',
      navLabel: 'Schul- & Institutionsverwaltung',
      navDetail: 'Einschreibungen, Anwesenheiten, Noten, Elternportale, Rechnungsstellung.',
      kicker: 'Lösungen · Bildung',
      h1: 'Schulverwaltungssoftware für Schweizer Institutionen',
      intro:
        'Ein System für Einschreibungen, Anwesenheiten, Noten, Elternkommunikation und Rechnungsstellung — das die Excel-Listen und Papierformulare ersetzt, die jeden Monatsabschluss verlangsamen.',
      problem: [
        'Anwesenheiten werden auf Papier erfasst und später abgetippt, sodass Register und Rechnungen jede Woche manuell abgeglichen werden müssen.',
        'Jeder Standort hat eigene Prozesse, sodass es keine konsolidierte akademische oder operative Übersicht über die Organisation gibt.',
        'Eltern rufen an oder schreiben E-Mails, um Informationen zu erhalten, die über ein Self-Service-Portal verfügbar sein könnten.',
      ],
      solution: [
        'Ein einziger Datensatz pro Schüler, von der Einschreibung über die Notengebung bis zum Abschlusszeugnis.',
        'Anwesenheitserfassung, die direkt in die Rechnungsstellung fliesst, damit beide Datenbestände stets übereinstimmen.',
        'Ein Elternportal für Absenzen, Berichte, Zahlungen und Nachrichten.',
        'Standortübergreifende Verwaltung mit konsolidiertem Reporting über alle Campus hinweg.',
      ],
      faqs: [
        {
          question: 'Kann es parallel zu unserem bestehenden System betrieben werden?',
          answer:
            'Ja. Wir starten oft mit einem Modul — z. B. Anwesenheit oder Rechnungsstellung —, das an Ihre bestehenden Aufzeichnungen angebunden ist, und erweitern es von dort aus. So bleibt der erste Meilenstein klein und risikofrei.',
        },
        {
          question: 'Wie werden die Schülerdaten geschützt?',
          answer:
            'Rollenbasierte Berechtigungen, Audit-Protokollierung, Verschlüsselung im Ruhezustand und Datenminimierung sind Teil der Systemarchitektur, nicht bloss ein nachträglicher Zusatz. Die Daten werden in der Schweiz gehostet. Schulen und Gemeinden unterstehen dem kantonalen Datenschutzgesetz statt dem Bundesgesetz: Wir bauen nach den Vorgaben Ihres Kantons und übergeben Ihnen den Eintrag im Bearbeitungsverzeichnis und die Folgenabschätzung, die Ihre kantonale Datenschutzbeauftragte verlangen wird.',
        },
      ],
    },
    'hr-and-payroll': {
      navShort: 'HR & Lohn',
      navLabel: 'HR, Zeiterfassung & Lohn',
      navDetail: 'Ein- und Ausstempeln, Absenzen, Lohnberechnung, Reporting.',
      kicker: 'Lösungen · HR & Lohn',
      h1: 'HR-, Zeiterfassungs- und Lohnsoftware',
      intro:
        'Arbeitsstunden einmal erfasst, direkt am Arbeitsplatz, und bis zur Lohnberechnung weitergeführt — ganz ohne Excel-Tabellen dazwischen.',
      problem: [
        'Stunden werden auf Papier oder in Excel erfasst und vor der Lohnabrechnung erneut eingegeben, was den Monatsabschluss verlangsamt und anfällig für Fehler macht.',
        'Feriensaldi existieren nur in den Köpfen oder einer geteilten Datei, was Urlaubsansprüche schwer nachvollziehbar macht.',
        'Es gibt keine verlässliche Aufzeichnung darüber, wer wann wo gearbeitet hat, was sofort problematisch wird, wenn jemand danach fragt.',
      ],
      solution: [
        'Ein- und Ausstempeln, das von den Mitarbeitenden tatsächlich genutzt werden kann — am Terminal oder auf dem Smartphone.',
        'Ferienanträge, Freigaben und Saldi werden automatisch berechnet.',
        'Lohnberechnung basierend auf den erfassten Arbeitsstunden, mit payroll-fertigen Exporten.',
        'Vertrags- und Personalakten an einem zentralen Ort, mit vollständigem Audit-Trail.',
      ],
      faqs: [
        {
          question: 'Deckte es Schweizer Lohn-Spezifikationen ab?',
          answer:
            'Wir bauen die Berechnungsregeln passend zu Ihren kantonalen und vertraglichen Anforderungen und exportieren im Format, das Ihr Treuhänder oder Lohnanbieter erwartet. Wir integrieren uns in Ihr bestehendes Lohnsystem anstatt es komplett zu ersetzen, es sei denn, Sie wünschen eine Gesamtlösung.',
        },
        {
          question: 'Was ist mit Mitarbeitenden ohne Firmenhandy?',
          answer:
            'Ein gemeinsames Terminal — ein Tablet am Eingang mit Badge oder PIN-Eingabe — funktioniert genauso gut wie individuelle Geräte. Die meisten unserer Implementierungen nutzen beides.',
        },
      ],
    },
    'booking-and-facilities': {
      navShort: 'Sport & Anlagen',
      navLabel: 'Buchungs- & Anlagenverwaltung',
      navDetail: 'Ressourcen-Kalender, Online-Reservationen, Mitgliedschaften, Zahlungen.',
      kicker: 'Lösungen · Anlagen',
      h1: 'Software für Buchungs- und Anlagenverwaltung',
      intro:
        'Ein Kalender pro Ressource, online buchbar, mit direkt angebundener Mitgliedschaftsverwaltung und Bezahlung — so gehören Doppelbuchungen der Vergangenheit an und Sie sehen genau, wie gut Ihre Anlagen ausgelastet sind.',
      problem: [
        'Buchungen treffen per Telefon und Nachricht ein, was Doppelbuchungen verursacht und keine Aufzeichnungen hinterlässt.',
        'Niemand kann genau sagen, welcher Platz, Raum oder Court sich tatsächlich rechnet.',
        'Zahlungen werden getrennt von der Buchung einkassiert, was die Abstimmung zu einer manuellen Aufgabe macht.',
      ],
      solution: [
        'Ein Kalender pro Ressource mit Regeln für Öffnungszeiten, Dauer und Berechtigungen, wer was buchen darf.',
        'Self-Service Online-Reservationen mit sofortiger Bestätigung.',
        'Mitgliedschaften, Abonnemente und Einzelbuchungen im selben System.',
        'Auslastungs- und Umsatzberichte pro Anlage.',
      ],
      faqs: [
        {
          question: 'Können Mitglieder online bezahlen?',
          answer:
            'Ja — mit Kreditkarte und Schweizer Zahlungsmitteln. Die Zahlung ist direkt mit der Buchung verknüpft, sodass Reservation und Zahlung einen einzigen Datensatz bilden, nicht zwei separate.',
        },
        {
          question: 'Wir haben mehrere Standorte. Funktioniert das?',
          answer:
            'Ja. Ressourcen werden nach Standort gruppiert, mit standortspezifischen Regeln und Berechtigungen sowie einem konsolidierten Reporting über alle Anlagen hinweg.',
        },
      ],
    },
    'brand-and-communication': {
      // Nicht im Header — erhalten, damit jeder Bereich dieselbe Form behält.
      navShort: 'Marke',
      navLabel: 'Marke & Kommunikation',
      navDetail: 'Identitätssysteme, Erklärvideos, Adoptionsmaterial.',
      kicker: 'Lösungen · Kommunikation',
      h1: 'Markenauftritt und Kommunikation für technische Produkte',
      intro:
        'Das Team, das das System gebaut hat, erklärt es auch. So entspricht Ihre Botschaft dem tatsächlichen Produkt, anstatt Funktionen zu bewerben, die es gar nicht gibt.',
      problem: [
        'Ein System funktioniert einwandfrei, wird aber nicht genutzt, weil es den Nutzern nicht richtig erklärt wurde.',
        'Eine Marketingkampagne verspricht Funktionen, die die Software in Wirklichkeit nicht bietet.',
        'Materialien werden von einer Agentur erstellt, die das eigentliche Produkt nie von innen gesehen hat.',
      ],
      solution: [
        'Identitätssysteme und Komponenten-Bibliotheken, die über alle Produkte hinweg konsistent bleiben.',
        'Animierte Erklärvideos, die ein komplexes System in unter einer Minute begreiflich machen.',
        'Onboarding- und Schulungsmaterialien, die dafür sorgen, dass ein System tatsächlich genutzt wird.',
        'Landing Pages und Funnels, die direkt in Ihre Vertriebs-Pipeline münden.',
      ],
      faqs: [
        {
          question: 'Können Sie die Kommunikation übernehmen, ohne das System gebaut zu haben?',
          answer:
            'Ja. Viele Kunden bringen ein bereits existierendes Produkt zu uns, um es besser zu erklären. Wir bitten jedoch zuerst um Zugang dazu — wir kommunizieren nicht über Software, die wir nicht selbst getestet haben.',
        },
        {
          question: 'Wie lange dauert die Produktion eines Erklärvideos?',
          answer:
            'Ein bis drei Wochen, abhängig von der Länge und davon, ob 3D-Elemente integriert werden. Skript und Storyboard werden stets von Ihnen freigegeben, bevor die eigentliche Animation beginnt.',
        },
      ],
    },
  },

  services: {
    'school-management-software': {
      h1: 'Schulverwaltungssoftware, passend zu Ihrem Prozess',
      intro:
        'Eine massgeschneiderte Administrationsplattform für Schulen und Bildungsinstitutionen — keine Vorlage, die Sie zwingt, Ihre bewährten Abläufe zu ändern.',
      problem:
        'Standard-Schulsoftware zwingt Ihnen deren Prozesslogik auf. Wenn diese nicht passt, wird die Lücke mit Excel-Listen gefüllt, und diese Listen werden schliesslich zum eigentlichen Kernsystem.',
      solution:
        'Wir bilden zuerst Ihre tatsächlichen administrativen Abläufe ab und bauen anschliessend die Module, die diese unterstützen — Einschreibungen, Anwesenheiten, Noten, Rechnungsstellung — mit Ihrer Terminologie und Ihren Regeln.',
      includes: [
        'Schüler- und Familienakten mit Dokumentenablage',
        'Anwesenheitserfassung und Absenzen-Workflows',
        'Notengebung, Zeugnisse und Reporting',
        'Rechnungsstellung gekoppelt an Einschreibungen und Anwesenheit',
        'Rollenbasierter Zugriff für Lehrpersonen, Verwaltung und Eltern',
      ],
      faqs: [
        {
          question: 'Wie lange dauert es, bis wir den ersten Teil nutzen können?',
          answer:
            'Ein erstes funktionierendes Modul ist in 3 bis 5 Wochen einsatzbereit. Wir definieren den ersten Meilenstein ganz bewusst so, dass er für sich allein nützlich ist, anstatt darauf zu warten, bis die gesamte Plattform fertig ist.',
        },
        {
          question: 'Können unsere historischen Daten übernommen werden?',
          answer:
            'Ja — siehe Datenmigration. Wir übertragen Datensätze aus Tabellen, Exporten oder einer alten Datenbank und gleichen die Ergebnisse vor dem Go-Live gemeinsam mit Ihnen ab.',
        },
      ],
    },
    'parent-portal': {
      h1: 'Elternportal für Schulen',
      intro:
        'Ein Self-Service-Portal, das routinebedingte Elternanfragen von der Telefonleitung des Sekretariats fernhält.',
      problem:
        'Das Verwaltungspersonal verbringt einen grossen Teil der Woche damit, Fragen zu beantworten, deren Antworten ohnehin schon irgendwo stehen: eine Absenz, ein Zeugnis, eine Rechnung, ein Termin.',
      solution:
        'Ein Portal, in dem Eltern ihre eigenen Kinder sehen — Anwesenheit, Noten, Rechnungen, Dokumente und Nachrichten — mit Berechtigungen, die niemals die Daten einer anderen Familie preisgeben.',
      includes: [
        'Familien-Login strikt auf eigene Kinder beschränkt',
        'Absenzenmeldung und Begründung',
        'Zeugnisse und Berichte nach Freigabe',
        'Rechnungen und Zahlungsstatus',
        'Ankündigungen und Direktnachrichten',
      ],
      faqs: [
        {
          question: 'Was verhindert, dass Eltern die Daten anderer Kinder sehen?',
          answer:
            'Der Zugriff wird serverseitig pro Beziehung durchgesetzt, nicht indem Teile der Benutzeroberfläche versteckt werden. Dies ist der am stärksten getestete Bereich jedes von uns gebauten Portals, da ein Fehler hier ein Datenschutzvorfall wäre.',
        },
        {
          question: 'Müssen Eltern eine App installieren?',
          answer:
            'Nein. Es funktioniert im Browser auf dem Smartphone. Eine native App ist möglich, aber den zusätzlichen Aufwand und die App-Store-Freigaben selten wert.',
        },
      ],
    },
    'time-tracking': {
      h1: 'Zeiterfassungssoftware für Schweizer Arbeitgeber',
      intro: 'Arbeitsstunden einmal erfasst, direkt am Arbeitsplatz, in einem Format, das die Lohnbuchhaltung nutzen kann.',
      problem:
        'Stundenzettel auf Papier und geteilte Tabellen werden vor der Lohnabrechnung abgetippt. Jede erneute Eingabe birgt das Risiko eines Fehlers, den niemand bemerkt, bis jemand falsch bezahlt wird.',
      solution:
        'Ein- und Ausstempeln an einem gemeinsamen Terminal oder auf dem Handy, wobei die Regeln für Pausen, Überstunden und Schichten einmal hinterlegt und konsistent angewendet werden.',
      includes: [
        'Ein-/Ausstempeln per Badge, PIN oder Smartphone',
        'Pausen-, Überstunden- und Schicht-Regelwerke',
        'Standort- und teambasierte Ansichten',
        'Korrektur-Workflow mit Audit-Trail',
        'Export im Format Ihres Lohnanbieters',
      ],
      faqs: [
        {
          question: 'Können Vorgesetzte Fehler korrigieren?',
          answer:
            'Ja, über einen Korrektur-Workflow, der dokumentiert, wer was und warum geändert hat. Stille Anpassungen sind genau das, was eine Zeiterfassung rechtlich unhaltbar macht.',
        },
        {
          question: 'Funktioniert es offline?',
          answer:
            'Ein Terminal erfasst weiter, falls die Verbindung abbricht, und synchronisiert sich, sobald sie wiederhergestellt ist. Einen Vormittag an Zeitbuchungen wegen Netzwerkproblemen zu verlieren, ist inakzeptabel.',
        },
      ],
    },
    payroll: {
      h1: 'Lohnbuchhaltung und Gehaltsmanagement',
      intro: 'Lohnberechnungen basierend auf erfassten Arbeitsstunden, nicht auf Excel-Tabellen.',
      problem:
        'Lohnabrechnungen, die jeden Monat aus verschiedenen Quellen manuell zusammengestellt werden, sind langsam, schwer zu überprüfen und unmöglich zu reproduzieren, wenn jemand ein halbes Jahr später eine Abrechnung infrage stellt.',
      solution:
        'Berechnungsregeln, die einmal kodiert werden und dann basierend auf erfassten Stunden und Verträgen laufen, um reproduzierbare Resultate und einen sauberen Export für Ihren Treuhänder zu liefern.',
      includes: [
        'Lohnberechnung aus erfassten Stunden und Verträgen',
        'Regelwerke für Zulagen, Abzüge und Überstunden',
        'Reproduzierbare monatliche Läufe mit kompletter Historie',
        'Payroll-fertiger Export',
        'Mitarbeiterbezogene Historie und Audit-Trail',
      ],
      faqs: [
        {
          question: 'Ersetzen Sie unseren Lohnanbieter?',
          answer:
            'Normalerweise nicht. Wir erzeugen saubere, korrekte Eingabedaten für den Anbieter, den Sie bereits nutzen. Den gesamten Prozess zu ersetzen ist möglich, aber selten der günstigste Weg, um das eigentliche Problem zu lösen.',
        },
        {
          question: 'Können wir einen vergangenen Monat neu berechnen?',
          answer:
            'Ja. Berechnungsläufe sind reproduzierbar und versioniert, sodass Sie exakt nachweisen können, wie eine Zahl zustande kam.',
        },
      ],
    },
    'facility-booking': {
      h1: 'Anlagen- und Platzbuchungssoftware',
      intro:
        'Online-Reservation für Sportanlagen, Räume und geteilte Ressourcen, direkt mit Zahlungen verknüpft.',
      problem:
        'Buchungen per Telefon und E-Mail verursachen Doppelbuchungen und hinterlassen keine verlässlichen Daten darüber, welche Anlage tatsächlich genutzt wird oder Umsatz generiert.',
      solution:
        'Ein Kalender pro Ressource mit echten Buchungsregeln, Self-Service-Reservation, Mitgliedschaften und Berichten zu Auslastung und Umsatz.',
      includes: [
        'Kalender pro Ressource mit Verfügbarkeitsregeln',
        'Self-Service-Buchung mit sofortiger Bestätigung',
        'Mitgliedschaften, Abos und Einzelbuchungen',
        'Online-Zahlung gekoppelt an die Reservation',
        'Auslastungs- und Umsatzberichte pro Anlage',
      ],
      faqs: [
        {
          question: 'Können wir weiterhin telefonische Buchungen annehmen?',
          answer:
            'Ja — Ihre Mitarbeiter buchen in denselben Kalender ein, sodass Telefon und Website sich niemals überschneiden können.',
        },
        {
          question: 'Können wir unterschiedliche Regeln pro Ressource festlegen?',
          answer:
            'Ja: Öffnungszeiten, minimale und maximale Dauer, Vorlaufzeiten, wer buchen darf und Preise, alles individuell pro Anlage.',
        },
      ],
    },
    'explainer-video': {
      h1: 'Animierte Erklärvideos für Software',
      intro:
        'Ein kurzer Animationsfilm, der ein komplexes System in unter einer Minute verständlich macht.',
      problem:
        'Technische Produkte verlieren das Publikum in den ersten dreissig Sekunden. Eine Demo ist zu lang, ein Screenshot sagt zu wenig, und ein Textblock voller Features erklärt nicht, warum es wichtig ist.',
      solution:
        'Skript, Storyboard und 2D- oder 3D-Animation, produziert von Personen, die die Software tatsächlich benutzt haben — so erklärt der Film das echte Produkt und keine reine Marketing-Vision davon.',
      includes: [
        'Skript und Storyboard, vor der Animation freigegeben',
        '2D- oder 3D-Animation in Ihrem Marken-Stil',
        'Voiceover und Sounddesign',
        'Formate angepasst für Web, Social Media und Pitch-Decks',
        'Quelldateien bei Übergabe',
      ],
      faqs: [
        {
          question: 'Wie lang sollte es sein?',
          answer:
            'Sechzig bis neunzig Sekunden für einen Produkt-Erklärfilm. Länger nur dann, wenn er eine Live-Demo ersetzt, und in diesem Fall gliedern wir ihn in Kapitel.',
        },
        {
          question: 'Besitzen wir die Animationsdateien?',
          answer:
            'Ja, inklusive der Projekt-Quelldateien. Es gibt keine zu erneuernden Lizenzen und nichts hindert ein anderes Studio daran, daran weiterzuarbeiten.',
        },
      ],
    },
    'web-app-development': {
      h1: 'Massgeschneiderte Web-Applikationsentwicklung',
      intro:
        'Full-Stack-Applikationen für Organisationen, deren Prozesse in keine Standardsoftware passen.',
      problem:
        'Wenn bestehende Tools fast, aber nicht ganz passen, wird die Lücke mit Handarbeit gefüllt — und diese Handarbeit wird still und heimlich zum teuersten Teil des Betriebs.',
      solution:
        'Eine Web-Applikation, die um Ihre tatsächlichen Abläufe herum entwickelt wird, auf einem Stack, für den Sie leicht Entwickler finden, wobei der Code und die Schemas vom ersten Tag an Ihnen gehören.',
      includes: [
        'Gemeinsame Architektur und Datenmodellierung',
        'Web-Applikation basierend auf Next.js, Node und PostgreSQL',
        'Rollenbasierte Zugriffskontrolle und Audit-Logging',
        'Integrationen mit Ihren bestehenden Systemen',
        'Deployment, Übergabe und Schulung',
      ],
      faqs: [
        {
          question: 'Auf welchem Technologie-Stack entwickeln Sie?',
          answer:
            'Next.js, Node und PostgreSQL, gehostet in der Schweiz. Bewusst standardisierte Entscheidungen — Sie müssen in der Lage sein, jemanden einzustellen, der damit umgehen kann.',
        },
        {
          question: 'Was passiert, wenn wir später das Team wechseln möchten?',
          answer:
            'Sie haben bereits alles: Quellcode, Datenbankschemas, Infrastrukturkonfigurationen und Dokumentationen werden fortlaufend an Sie übergeben, nicht erst am Ende.',
        },
      ],
    },
    'data-migration': {
      h1: 'Datenmigration für Managementsysteme',
      intro:
        'Jahrelange Aufzeichnungen sicher aus Excel und Altsystemen transferieren, abgeglichen vor dem Go-Live.',
      problem:
        'Migration ist der Grund, warum Systemwechsel oft scheitern. Die Daten sind chaotischer als erwartet, und niemand bemerkt den Verlust, bis das alte System abgeschaltet wird.',
      solution:
        'Wir analysieren zuerst die Quelldaten, vereinbaren mit Ihnen die Regeln für schwierige Fälle, migrieren in Testläufen und gleichen Datensätze und Summen ab, bevor etwas live geht.',
      includes: [
        'Datenprofiling und Qualitätsbericht der Quelle',
        'Vereinbarte Behandlung von Duplikaten, Lücken und Konflikten',
        'Wiederholbare Testläufe statt einer Einweg-Umstellung',
        'Abgleich von Zählungen und Summen vor dem Go-Live',
        'Ein dokumentierter Rollback-Plan',
      ],
      faqs: [
        {
          question: 'Unsere Daten sind in einem schlechten Zustand. Ist das ein Problem?',
          answer:
            'Das ist normal, deshalb ist der erste Schritt das Profiling und nicht das Migrieren. Sie erhalten einen Bericht darüber, was dupliziert ist, fehlt oder widersprüchlich ist, und Sie legen die Regeln fest, bevor wir etwas verschieben.',
        },
        {
          question: 'Können wir beide Systeme parallel betreiben?',
          answer:
            'Ja. Für alles, was mit Lohnbuchhaltung oder Rechnungsstellung zu tun hat, empfehlen wir dies sogar für mindestens einen Zyklus, um die Ergebnisse vergleichen zu können.',
        },
      ],
    },
  },
};

export default de;
