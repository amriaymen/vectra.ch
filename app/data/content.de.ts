import type { Dictionary } from './content.en';
import { SWISS_ENTITY } from './config';

/** Siehe content.en.ts — die Herkunftsangabe ist an die Schweizer Gesellschaft gekoppelt. */
const herkunft = {
  descriptionOpener: SWISS_ENTITY
    ? 'Schweizer Studio für Software und Design.'
    : 'Studio für Software und Design für Schweizer Organisationen.',
  kicker: SWISS_ENTITY
    ? 'Software- und Designstudio · Schweiz'
    : 'Software- und Designstudio · Für die Schweiz',
  rights: SWISS_ENTITY
    ? 'Vectra — Schweizer Studio für Software und Design.'
    : 'Vectra — Software und Design für Schweizer Organisationen.',
};

/**
 * Swiss High German (de-CH).
 *
 * ACTION REQUIRED — this is a careful first draft, not a reviewed translation.
 * A Swiss buyer in the DACH region spots weak German immediately, and it costs more
 * credibility than an English-only site would. Have a native reviewer pass over
 * it before /de is linked publicly.
 */
const de: Dictionary = {
  meta: {
    title: 'Vectra | SaaS-Produkte, Entwicklung auf Abruf und Design-Abonnement',
    description: `${herkunft.descriptionOpener} Drei Bereiche: unsere eigenen SaaS-Produkte, Entwicklung auf Abruf zum Fixpreis pro Meilenstein und ein Design-Abonnement inklusive Motion Design.`,
    keywords: [
      'SaaS-Produkte Schweiz',
      'Softwareentwicklung auf Abruf',
      'Web-App-Entwicklung Schweiz',
      'Design-Abonnement',
      'Motion Design Abonnement',
      'Erklärvideo',
      'Vectra',
    ],
    ogAlt: 'Vectra — SaaS-Produkte, Entwicklung auf Abruf und Design-Abonnement',
  },

  nav: {
    departments: { saas: 'Produkte', development: 'Entwicklung', design: 'Design' },
    cta: 'Gespräch buchen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schliessen',
    menuTitle: 'Seitennavigation',
    language: 'Sprache',
    home: 'Vectra — Startseite',
  },

  common: {
    onRequest: 'Auf Anfrage',
    from: 'Ab',
    perMonth: '/Monat',
    perYear: '/Jahr',
    faqsTitle: 'Häufig gestellte Fragen',
  },

  hero: {
    kicker: herkunft.kicker,
    titleLine1: 'Software, Entwicklung und Design.',
    titleLine2: 'Ein Studio, drei Bereiche.',
    body: 'Lizenzieren Sie eines unserer SaaS-Produkte, lassen Sie Software rund um Ihre Abläufe entwickeln oder abonnieren Sie ein Designteam, das auch Motion Design macht.',
    primaryCta: '30-Minuten-Gespräch buchen',
    secondaryCta: 'Die drei Bereiche ansehen',
  },

  departments: {
    title: 'Drei Wege, mit uns zu arbeiten',
    intro: 'Jeder Bereich hat seine eigene Seite, sein eigenes Preismodell und seinen eigenen Einstieg.',
    licenceOnRequest: 'Lizenz auf Anfrage',
    items: {
      saas: {
        name: 'SaaS-Produkte',
        summary:
          'Software, die wir selbst entwickelt haben und selbst betreiben, für Schulen, Sportanlagen und Arbeitgeber.',
        points: [
          'Spotbase — Anlagenbuchung und Zahlung',
          'Schoolze und Raqim — Schulverwaltung',
          'SB Pointage — Zeiterfassung und Lohn',
        ],
        cta: 'Produkte ansehen',
      },
      development: {
        name: 'Entwicklung auf Abruf',
        summary:
          'Massgeschneiderte Webanwendungen und Managementsysteme, schriftlich definiert und vor Arbeitsbeginn pro Meilenstein offeriert.',
        points: [
          'Webanwendungen und Managementsysteme',
          'Integrationen und Datenmigration',
          'Der Code gehört Ihnen ab dem ersten Tag',
        ],
        cta: 'Projekt definieren',
      },
      design: {
        name: 'Design-Abonnement',
        summary:
          'Ein erfahrenes Designteam im Monatsabonnement: Produktdesign, Markenidentität und Motion Design.',
        points: [
          'UI/UX und Produktdesign',
          'Markenidentität und Design-Systeme',
          'Motion Design und Erklärvideo',
        ],
        cta: 'Abonnemente ansehen',
      },
    },
  },

  work: {
    title: 'Software, die bereits im Einsatz ist',
    intro:
      'Vier Produkte, die wir selbst entwickelt haben und selbst betreiben. Sie sind der Beleg hinter den beiden anderen Bereichen.',
  },

  products: {
    forWhoLabel: 'Entwickelt für',
    modulesLabel: 'Was es leistet',
    stackLabel: 'Technologie',
    statusAvailable: 'Ab sofort verfügbar',
    statusRunning: 'Im produktiven Einsatz',
    demoCta: 'Demo buchen',
    adaptCta: 'Zu diesem System anfragen',
    domains: {
      education: 'Bildung',
      sports: 'Sport & Freizeit',
      hr: 'HR & Lohn',
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
        summary:
          'Ressourcenkalender, Online-Reservationen, Mitgliedschaften und Zahlung in einem System, sodass eine Buchung und das zugehörige Geld einen einzigen Datensatz bilden.',
        modules: ['Ressourcenkalender', 'Online-Buchung', 'Mitgliedschaften', 'Zahlungen', 'Nutzungsberichte'],
      },
      schoolze: {
        tagline: 'Schulverwaltungsportal',
        forWho: 'Primar- und Sekundarschulen sowie Schulgruppen mit mehreren Standorten.',
        summary:
          'Einschreibung, Anwesenheit, Notengebung, Elternkommunikation und Rechnungsstellung in einem Portal, mit rollenbezogenem Zugriff für Verwaltung, Lehrpersonal und Eltern.',
        modules: ['Einschreibung und Akten', 'Anwesenheit', 'Noten und Zeugnisse', 'Elternportal', 'Rechnungsstellung'],
      },
      'sb-pointage': {
        tagline: 'Zeiterfassung & Lohnbuchhaltung',
        forWho: 'Arbeitgeber mit Schicht- oder Stundenpersonal, deren Stunden ohne Doppelerfassung in die Lohnabrechnung gelangen müssen.',
        summary:
          'Check-in und Checkout, Urlaubs- und Vertragsverwaltung, Lohnberechnung und Lohnexport — eine einzige Kette von der Stechuhr bis zur Lohnabrechnung.',
        modules: ['Check-in / Checkout', 'Urlaubsverwaltung', 'Lohnberechnung', 'Lohnexport', 'Personalakten'],
      },
      raqim: {
        tagline: 'Standortübergreifende Schulverwaltung',
        forWho: 'Schulgruppen, die eine konsolidierte Sicht über mehrere Standorte benötigen.',
        summary:
          'Akademische Aufzeichnungen, Personalverwaltung, Terminplanung und Berichterstattung über mehrere Standorte hinweg, wobei Zahlen zentral konsolidiert anstatt standortweise zusammengestellt werden.',
        modules: ['Standortübergreifende Verwaltung', 'Akademische Akten', 'Personalverwaltung', 'Planung', 'Konsolidiertes Reporting'],
      },
    },
  },

  saas: {
    metaTitle: 'SaaS-Produkte für Schulen, Sportanlagen und Arbeitgeber | Vectra',
    metaDescription:
      'Spotbase, Schoolze, SB Pointage und Raqim: Software, die Vectra entwickelt hat und selbst betreibt, gehostet in der Schweiz.',
    kicker: 'Bereich 01 · SaaS-Produkte',
    h1: 'Software, die wir entwickelt haben und selbst betreiben.',
    intro:
      'Vier Produkte für Schulen, Sportanlagen und Arbeitgeber. Spotbase kann ab sofort lizenziert werden; die anderen sind im produktiven Einsatz und lassen sich an Ihre Organisation anpassen.',
    licence: {
      title: 'Was eine Lizenz umfasst',
      intro: 'Lizenzen werden auf Anfrage schriftlich offeriert, nach einer Demo.',
      steps: [
        {
          step: '01',
          title: 'Sofort einsatzbereite Software',
          detail:
            'Das Produkt existiert und läuft heute. Der Einstieg ist Konfiguration, kein Entwicklungsprojekt.',
        },
        {
          step: '02',
          title: 'Schweizer Hosting inklusive',
          detail:
            'Ihr System läuft bei einem Schweizer Anbieter, unter Schweizer Jurisdiktion. Wir nennen Anbieter und Rechenzentrum schriftlich.',
        },
        {
          step: '03',
          title: 'Laufende Updates',
          detail:
            'Wir betreiben das Produkt selbst: Verbesserungen werden auch nach Ihrer Inbetriebnahme laufend ausgeliefert.',
        },
      ],
    },
    faqs: [
      {
        question: 'Welche Produkte können wir heute lizenzieren?',
        answer:
          'Spotbase. Schoolze, SB Pointage und Raqim sind im produktiven Einsatz, aber noch nicht für die Lizenzierung aufbereitet. Deshalb bieten wir dafür derzeit weder eine Demo noch einen Preis an. Wenn eines davon zu Ihrem Bedarf passt, fragen Sie uns an, und wir sagen Ihnen offen, was möglich ist.',
      },
      {
        question: 'Lässt sich ein Produkt an unsere Organisation anpassen?',
        answer:
          'Ja. Das ist Entwicklung auf Abruf: Wir gehen vom Produkt aus und definieren die Anpassungen als Fixpreis-Meilensteine, schriftlich vereinbart vor Arbeitsbeginn.',
      },
      {
        question: 'Wo werden unsere Daten gehostet?',
        answer:
          'In der Schweiz, bei einem Schweizer Anbieter, unter Schweizer Jurisdiktion — nicht bei einem US-Hyperscaler. Wir nennen Anbieter und Rechenzentrum schriftlich, damit Ihre Datenschutzbeauftragte dies überprüfen kann.',
      },
      {
        question: 'Unser System würde Schüler- und Personaldaten enthalten. Wie gehen Sie damit um?',
        answer:
          'Schüler-, Personal- und Lohndaten sind besonders schützenswerte Personendaten. Die Zugriffskontrolle ist deshalb Teil der Architektur und kein nachträglicher Zusatz: rollenbasierte Berechtigungen, Audit-Protokollierung, Verschlüsselung im Ruhezustand und Datenminimierung by Design. Schulen und Gemeinden unterstehen dem kantonalen Datenschutzgesetz, und wir bauen nach den Vorgaben Ihres Kantons. Für private Arbeitgeber gilt stattdessen das revDSG, nach dem wir ebenfalls arbeiten.',
      },
    ],
  },

  development: {
    metaTitle: 'Softwareentwicklung auf Abruf, Fixpreis pro Meilenstein | Vectra',
    metaDescription:
      'Massgeschneiderte Webanwendungen und Managementsysteme. Schriftlicher Umfang, Fixpreis pro Meilenstein, Schweizer Hosting, und der Code gehört Ihnen.',
    kicker: 'Bereich 02 · Entwicklung auf Abruf',
    h1: 'Massgeschneiderte Software, vor dem Start klar definiert.',
    intro:
      'Webanwendungen und Managementsysteme, gebaut um die tatsächlichen Abläufe Ihrer Organisation. Fixpreis pro Meilenstein, schriftlich vereinbart, und der Code gehört Ihnen.',
    priceNote: 'Fixpreis pro Meilenstein. Die Erstabklärung ist kostenlos.',
    cta: 'Mein Projekt definieren',
    offers: {
      title: 'Was wir entwickeln',
      items: [
        {
          title: 'Webanwendungen',
          detail:
            'Full-Stack-Anwendungen auf Next.js, Node und PostgreSQL, für Prozesse, die kein käufliches Produkt abdeckt.',
        },
        {
          title: 'Managementsysteme',
          detail:
            'Schulverwaltung, HR und Lohn, Buchung und Anlagen: die Art von operativem System, aus der unsere eigenen Produkte bestehen.',
        },
        {
          title: 'Integrationen & Datenmigration',
          detail:
            'Anbindungen an Buchhaltung, Zahlungsanbieter und bestehende Datenbanken sowie die Übernahme historischer Daten, vor dem Go-live abgeglichen.',
        },
        {
          title: 'Wartung & Weiterentwicklung',
          detail:
            'Wartung nach dem Launch, Sicherheitsupdates und neue Funktionen, von Monat zu Monat und nur, wenn Sie es wünschen.',
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
    faqs: [
      {
        question: 'Wie ist die Preisgestaltung strukturiert?',
        answer:
          'Ein Fixpreis pro Meilenstein. Sie erhalten Projektumfang, Zeitplan und Preis schriftlich, bevor ein Meilenstein beginnt, und können jederzeit zwischen zwei Meilensteinen stoppen.',
      },
      {
        question: 'Wie sehen typische Zeitpläne aus?',
        answer:
          'Ein erstes Modul oder MVP dauert etwa 3 bis 5 Wochen. Eine vollständige Managementplattform benötigt 6 bis 10 Wochen. Sie erhalten einen Meilenstein-Fahrplan mit Terminen, bevor die Arbeit beginnt.',
      },
      {
        question: 'Auf welcher Technologie entwickeln Sie?',
        answer:
          'Next.js, Node und PostgreSQL, gehostet in der Schweiz. Bewusst gängige Technologien: Sie müssen jemand anderen einstellen können, der sie beherrscht.',
      },
      {
        question: 'Können Sie die Systeme integrieren, die wir bereits nutzen?',
        answer:
          'Ja. Wir bauen Integrationen zu Buchhaltungssoftware, Zahlungsanbietern und bestehenden Datenbanken, einschliesslich On-Premise-Systemen, die nur eine Datenbankverbindung bereitstellen, und migrieren Ihre historischen Daten.',
      },
      {
        question: 'Besitzen wir den Quellcode und die Design-Assets?',
        answer:
          'Ja, vollumfänglich. Bei der Übergabe erhalten Sie den Quellcode, die Datenbankschemas, die Design-System-Dateien und die Medien-Assets. Es gibt keine Lizenzen, die erneuert werden müssen, und nichts hindert Sie daran, zu einem anderen Team zu wechseln.',
      },
      {
        question: 'Wir sind eine Schule oder Gemeinde. Wie läuft die Beschaffung ab?',
        answer:
          'Unterhalb der kantonalen Schwelle für das Einladungsverfahren kann ein Auftrag in der Regel ohne offene Ausschreibung vergeben werden — bei Dienstleistungen liegt das meist unter CHF 150’000, die Schwellenwerte unterscheiden sich jedoch je Kanton und werden alle zwei Jahre angepasst; prüfen Sie den aktuellen Wert für Ihren Kanton. Darüber hinaus reichen wir über SIMAP ein und liefern das übliche Dossier. Unsere Fixpreis-Meilensteine sind so aufgebaut, wie öffentliche Budgets bewilligt werden.',
      },
      {
        question: 'Wohin sendet das Scoping-Formular unsere Eingaben?',
        answer:
          'Das Sofort-Scoping-Formular übermittelt Ihre Eingaben an Dienste ausserhalb der Schweiz, die unsere Datenschutzerklärung namentlich nennt. Wenn Sie möchten, dass keine Daten die Schweiz verlassen, schreiben Sie uns oder rufen Sie uns an: Wir klären den Umfang dann ohne diese Dienste.',
      },
    ],
  },

  design: {
    metaTitle: 'Design-Abonnement mit Motion Design | Vectra',
    metaDescription:
      'Produktdesign, Markenidentität und Motion Design zum festen Monatspreis. Publizierte Preise, priorisierte Planung, jederzeit pausieren oder kündigen.',
    kicker: 'Bereich 03 · Design-Abonnement',
    h1: 'Ein Designteam im Abonnement, Motion Design inklusive.',
    intro:
      'Produktdesign, Markenidentität und Motion Design zum festen Monatspreis. Priorisierte Planung, und Sie können jederzeit pausieren oder kündigen.',
    cta: 'Abonnemente ansehen',
    disciplines: {
      title: 'Was das Abonnement abdeckt',
      items: [
        {
          title: 'UI/UX und Produktdesign',
          detail: 'Oberflächen, Abläufe und Prototypen für Web- und Mobile-Produkte.',
        },
        {
          title: 'Markenidentität',
          detail:
            'Logo-Systeme, Typografie, Farben und Komponentenbibliotheken, die über alle Produkte hinweg konsistent bleiben.',
        },
        {
          title: 'Motion Design',
          detail:
            '2D- und 3D-Animation in Ihrem Markensystem, mit Formaten für Web, Social Media und Präsentationen.',
        },
        {
          title: 'Erklärvideo',
          detail:
            'Skript, Storyboard und Animation, die ein komplexes Produkt in weniger als einer Minute verständlich machen.',
        },
      ],
    },
    plans: {
      title: 'Drei Abonnemente, publizierte Preise',
      intro: 'Jahresvertrag: zwei Monate geschenkt.',
      featuredLabel: 'Empfohlen',
      names: { design: 'Design', build: 'Build', scale: 'Scale' },
      includesTitle: 'Jedes Abonnement umfasst',
      includes: [
        'UI/UX und Produktdesign',
        'Markenidentität und Design-Systeme',
        'Motion Design und Erklärvideo',
        'Priorisierte Planung',
        'Quelldateien bei jeder Lieferung',
        'Jederzeit pausieren oder kündigen',
      ],
      note: 'Unsicher, welches Abonnement passt? Das klären wir in einem 30-Minuten-Gespräch.',
      cta: 'Abonnement abschliessen',
    },
    process: {
      title: 'Wie das Abonnement abläuft',
      intro: 'Keine Offerten, keine Verhandlung: Es gilt der Preis auf dieser Seite.',
      steps: [
        {
          step: '01',
          title: 'Abonnement wählen',
          detail: 'Monatlich oder jährlich. Wir bestätigen das Abonnement in einem kurzen Gespräch und starten.',
        },
        {
          step: '02',
          title: 'Anfragen senden',
          detail:
            'Design- und Motion-Anfragen kommen in eine gemeinsame Warteschlange und werden priorisiert eingeplant.',
        },
        {
          step: '03',
          title: 'Prüfen, dann weiterführen oder pausieren',
          detail:
            'Jede Lieferung enthält ihre Quelldateien. Pausieren oder kündigen Sie, sobald die Arbeit erledigt ist.',
        },
      ],
    },
    faqs: [
      {
        question: 'Ist Motion Design wirklich inbegriffen?',
        answer:
          'Ja. Motion Design und Erklärvideo sind Teil des Abonnements und keine zusätzliche Position auf der Rechnung.',
      },
      {
        question: 'Wie lange dauert ein Erklärvideo?',
        answer:
          'Eine bis drei Wochen, je nach Länge und ob 3D im Spiel ist. Skript und Storyboard werden freigegeben, bevor die Animation beginnt.',
      },
      {
        question: 'Können Sie für ein Produkt gestalten, das Sie nicht entwickelt haben?',
        answer:
          'Ja. Viele Kunden bringen uns ein bestehendes Produkt. Wir bitten zuerst um Zugang dazu: Wir gestalten und schreiben nichts über Software, die wir nicht benutzt haben.',
      },
      {
        question: 'Gehören uns die Design- und Animationsdateien?',
        answer:
          'Ja, einschliesslich der Projektquellen. Es gibt keine Lizenz zu erneuern, und nichts hindert ein anderes Studio daran, sie zu übernehmen.',
      },
      {
        question: 'Können wir pausieren oder kündigen?',
        answer: 'Ja, jederzeit. Bei einem Jahresvertrag erhalten Sie zwei Monate geschenkt.',
      },
    ],
  },

  scope: {
    title: 'Welchen operativen Prozess möchten Sie vereinfachen?',
    intro:
      'Beantworten Sie fünf kurze Fragen und wir erstellen direkt auf dieser Seite eine erste Projektklärung — Module, Meilensteine, Zeitplan und Preisrahmen — in etwa einer Minute. Kein Anruf nötig und ohne Kosten für die Erstabklärung.',
    aside: 'Möchten Sie lieber persönlich darüber sprechen? Über den Banner unten können Sie einen Termin buchen.',
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
    q1: { title: 'Welchen Prozess möchten Sie vereinfachen?', hint: 'Wählen Sie die treffendste Option.' },
    q2: { title: 'Welche Bestandteile brauchen Sie?', hint: 'Wählen Sie alles Zutreffende aus.' },
    q3: { title: 'Wie gross ist das Projekt?', hint: 'Grobe Schätzungen reichen aus.' },
    q4: { title: 'Wann soll das System live gehen?', hint: 'Und mit welchem ungefähren Budget planen Sie?' },
    q5: { title: 'Wohin dürfen wir die Offerte senden?' },
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


  cta: {
    title:
      'Unsicher, welcher Bereich zu Ihnen passt? Sprechen Sie 30 Minuten mit den Leuten, die die Arbeit machen, nicht mit dem Vertrieb.',
    button: '30-Minuten-Gespräch buchen',
  },

  footer: {
    title: 'Software, Entwicklung und Design, aus einem Studio.',
    group: 'Vectra ist Teil von {group}.',
    country: 'Schweiz',
    legal: { terms: 'AGB', privacy: 'Datenschutz', impressum: 'Impressum' },
    rights: herkunft.rights,
    team: 'Verteiltes Team, das zu Schweizer Bürozeiten arbeitet. Kundendaten in der Schweiz gehostet.',
    social: 'Social Media',
  },
};

export default de;
