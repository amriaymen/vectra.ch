import type { Copy, Kind } from './copy.fr';

/**
 * Swiss High German (no ß). Same facts and prices as copy.fr.ts.
 * A first draft: have a native speaker review it before promoting /de.
 */
const de: Copy = {
  meta: {
    title: 'Verwaltungssoftware für Unternehmen in der Westschweiz | Vectra',
    description:
      'Ersetzen Sie Excel, Papier und WhatsApp durch ein einziges System. Regioo für Teams im Ausseneinsatz (CHF 45 pro Techniker und Monat), Spotbase für Sportzentren oder Software nach Mass ab CHF 10’000.',
    regioo: 'Verwaltung von Einsätzen, Technikern, Kunden und Einsatzplänen für Unternehmen im Ausseneinsatz.',
    regiooOffer: 'Pro Techniker und Monat. 14 Tage testen, ohne Kreditkarte.',
    area: 'Westschweiz',
    navLabel: 'Navigation',
    language: 'Sprache',
  },

  nav: {
    links: [
      { href: '#metier', label: 'Software' },
      { href: '#sur-mesure', label: 'Nach Mass' },
      { href: '#design', label: 'Design' },
      { href: '#questions', label: 'Fragen' },
    ],
    cta: 'Meine Software finden',
  },

  hero: {
    kicker: 'Verwaltungssoftware · Schweiz',
    line1: 'Ihre ganze Arbeit.',
    line2: 'Ein einziges System.',
    body: 'Schluss mit Excel, Papier, WhatsApp und Telefonaten. Wählen Sie die Software für Ihre Branche und starten Sie heute.',
    primary: 'Meine Software finden',
    note: 'Eine Frage, eine Antwort, ein Preis.',
  },

  trades: [
    'Sanitärbetriebe',
    'Elektriker',
    'Glasfaser-Installateure',
    'Heizungsbetriebe',
    'Sportzentren',
    'Padel-Clubs',
    'Wartungsunternehmen',
  ],

  chaos: {
    before: 'Heute ist Ihre Arbeit überall.',
    after: 'Morgen ist sie an einem Ort.',
    hint: 'Scrollen',
    chips: [
      'planung_final_v3.xlsx',
      'WhatsApp · 47 ungelesen',
      'Einsatzrapport (Papier)',
      '3 verpasste Anrufe',
      'Post-it: Kunde zurückrufen',
      'Rechnung neu erstellen',
      'E-Mail ohne Antwort',
      'Wer hat die letzte Version?',
    ],
    windowTitle: 'Ihr System',
    rows: ['Wochenplanung', 'Einsätze von heute', 'Kunden und Verlauf', 'Rechnungen und Zahlungen'],
    done: 'Aktuell',
  },

  picker: {
    title: 'Was ist Ihre Branche?',
    intro: 'Wählen Sie. Wir zeigen Ihnen die Software, den Preis und wie Sie starten.',
    options: [
      {
        id: 'regioo',
        tab: 'Teams im Ausseneinsatz',
        tag: 'Sanitär, Elektro, Glasfaser, Heizung, Wartung',
        name: 'Regioo',
        line: 'Einsatzverwaltung, ganz einfach.',
        points: [
          'Einsätze geplant und nachverfolgt',
          'Eine App für Ihre Techniker, auf dem Handy',
          'Kunden und Einsatzpläne an einem Ort',
        ],
        price: 'CHF 45',
        priceNote: 'pro Techniker und Monat',
        cta: 'Kostenlos testen',
        ctaNote: '14 Tage, ohne Kreditkarte',
        kind: 'trial' as Kind,
        screen: [
          ['08:00', 'Glasfaseranschluss · Bulle', 'Unterwegs'],
          ['10:30', 'Heizungsreparatur · Freiburg', 'Geplant'],
          ['14:00', 'Elektrokontrolle · Vevey', 'Geplant'],
          ['16:15', 'Zählermontage · Romont', 'Erledigt'],
        ],
      },
      {
        id: 'spotbase',
        tab: 'Sportzentrum oder Club',
        tag: 'Padel, Tennis, Fussball, Basketball',
        name: 'Spotbase',
        line: 'Ihre Plätze, Ihre Buchungen, Ihre Turniere.',
        points: [
          'Ein Kalender für alle Ihre Plätze',
          'Ihre Spieler buchen vom Handy aus',
          'Turniere mit Live-Resultaten',
        ],
        price: 'Auf Anfrage',
        priceNote: 'je nach Anzahl Plätze',
        cta: 'Demo anfragen',
        ctaNote: 'Antwort per E-Mail',
        kind: 'demo' as Kind,
        screen: [
          ['17:00', 'Padel 1 · Buchung', 'Bezahlt'],
          ['18:00', 'Padel 2 · Gruppenkurs', '8 / 12'],
          ['19:00', 'Tennis · Clubturnier', 'Live'],
          ['20:00', 'Fussball 5 · Buchung', 'Offen'],
        ],
      },
      {
        id: 'custom',
        tab: 'Eine andere Branche',
        tag: 'Ihre Arbeitsweise ist einzigartig',
        name: 'Nach Mass',
        line: 'Wir entwickeln die Software, die Ihnen fehlt.',
        points: ['Fixpreis, vor dem Start bekannt', 'Schritt für Schritt geliefert', 'Der Code gehört Ihnen'],
        price: 'Ab CHF 10’000',
        priceNote: 'Fixpreis pro Etappe',
        cta: 'Mein Projekt schätzen',
        ctaNote: 'Fünf Fragen, etwa eine Minute',
        kind: 'estimate' as Kind,
        screen: [
          ['01', 'Umfang und Preis', 'Schriftlich'],
          ['02', 'Erstes Modul', 'Geliefert'],
          ['03', 'Inbetriebnahme', 'Geschult'],
          ['04', 'Der Code', 'Ihrer'],
        ],
      },
    ],
  },

  calc: {
    title: 'Was kostet Regioo?',
    intro: 'Ein Preis pro Techniker. Sonst nichts.',
    label: 'Anzahl Techniker',
    perMonth: 'pro Monat',
    detail: 'CHF 45 pro Techniker und Monat.',
    cta: 'Kostenlos testen',
    note: '14 Tage, ohne Kreditkarte.',
  },

  steps: {
    title: 'Drei Schritte. Keine Sitzung.',
    items: [
      { n: '1', title: 'Wählen', text: 'Die Software für Ihre Branche.' },
      { n: '2', title: 'Testen', text: 'Mit Ihrem Team und Ihren echten Fällen.' },
      { n: '3', title: 'Arbeiten', text: 'Alle am selben Ort.' },
    ],
  },

  custom: {
    kicker: 'Nach Mass',
    title: 'Für Ihre Branche gibt es noch keine Software?',
    body: 'Wir entwickeln sie. Sie kennen den Preis vor dem Start, erhalten die Arbeit Schritt für Schritt, und der Code gehört Ihnen.',
    price: 'Ab CHF 10’000',
    cta: 'Mein Projekt schätzen',
    note: 'Fünf Fragen, etwa eine Minute. Ohne Anruf.',
    facts: ['Fixpreis pro Etappe', 'Stopp zwischen zwei Etappen möglich', 'Code und Dateien gehören Ihnen'],
  },

  design: {
    kicker: 'Design im Abonnement',
    title: 'Ein Designer in Ihrem Team, ohne Anstellung.',
    body: 'Ein Preis pro Monat. Sie senden Ihre Anfragen, wir liefern. Pausieren oder beenden Sie, wann Sie wollen.',
    perMonth: '/Monat',
    recommended: 'Für die meisten am vollständigsten',
    cta: 'Dieses Abo wählen',
    plans: [
      {
        id: 'design',
        name: 'Design',
        price: 'CHF 1’500',
        points: ['Web- und Mobile-Oberflächen', 'Markenidentität', 'Eine Anfrage aufs Mal'],
      },
      {
        id: 'build',
        name: 'Build',
        price: 'CHF 1’800',
        points: ['Alles aus Design', 'Motion Design und Erklärvideo', 'Eine Anfrage aufs Mal'],
      },
      {
        id: 'scale',
        name: 'Scale',
        price: 'CHF 2’400',
        points: ['Alles aus Build', 'Umsetzung der Entwürfe in Ihrer Website', 'Zwei Anfragen parallel'],
      },
    ],
  },

  faq: {
    title: 'Häufige Fragen',
    items: [
      {
        q: 'Kann ich testen, bevor ich bezahle?',
        a: 'Ja. Regioo lässt sich 14 Tage testen, ohne Kreditkarte. Spotbase zeigen wir Ihnen in einer Demo.',
      },
      {
        q: 'Und wenn keine Software zu meiner Branche passt?',
        a: 'Dann entwickeln wir sie nach Mass, ab CHF 10’000. Sie erhalten Umfang und Preis schriftlich, bevor wir beginnen.',
      },
      {
        q: 'Wo werden unsere Daten gehostet?',
        a: 'Die Systeme, die wir für Sie entwickeln, werden in der Schweiz gehostet, bei Infomaniak in Genf. Diese Website selbst wird bei Vercel gehostet.',
      },
      {
        q: 'Wem gehört der Code eines Projekts nach Mass?',
        a: 'Ihnen. Sie erhalten den Quellcode, die Datenbankschemas und die Design-Dateien.',
      },
      {
        q: 'Kann ich das Design-Abonnement beenden?',
        a: 'Ja. Sie können es jederzeit pausieren oder kündigen.',
      },
    ],
  },

  contact: {
    title: 'Sagen Sie uns, was Sie bremst.',
    body: 'Wir antworten per E-Mail.',
    name: 'Ihr Name',
    email: 'Ihre E-Mail',
    company: 'Ihr Unternehmen',
    interest: 'Was Sie interessiert',
    interests: ['Regioo', 'Spotbase', 'Software nach Mass', 'Das Design-Abonnement', 'Ich weiss es noch nicht'],
    notes: 'Ihre Nachricht (freiwillig)',
    send: 'Senden',
    sending: 'Wird gesendet…',
    success: 'Danke. Ihre Nachricht ist unterwegs, wir antworten per E-Mail.',
    error: 'Das Senden hat nicht funktioniert. Versuchen Sie es erneut oder schreiben Sie uns direkt an',
    required: 'Bitte geben Sie Ihren Namen und Ihre E-Mail an.',
    disclosure: 'Ihre Nachricht wird per E-Mail über einen Anbieter ausserhalb der Schweiz versendet.',
    privacy: 'Datenschutzerklärung',
  },

  footer: {
    title: 'Ihre ganze Arbeit. Ein einziges System.',
    explore: 'Entdecken',
    contact: 'Kontakt',
    legal: 'Rechtliches',
    group: 'Vectra ist die Abteilung für Software und digitale Produkte der',
    terms: 'AGB',
    privacy: 'Datenschutz',
    impressum: 'Impressum',
    rights: 'Vectra — Schweizer Studio für Software und Design.',
    top: 'Nach oben',
    country: 'Schweiz',
  },
};

export default de;
