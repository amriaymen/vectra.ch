/*
 * Regioo, presented trade by trade.
 *
 * What differs between trades is the situation described, never the product:
 * every capability named here is one of the Regioo features listed in
 * regioo.copy.ts. The example jobs and photo proofs are illustrations of how a
 * company in that trade would use those features. Intervention types and the
 * proofs they require are configured per company, which is why the pages say
 * "we set them up with you" and never claim a ready-made catalogue.
 */

export const TRADES = ['plumber', 'electrician', 'fibre', 'heating'] as const;
export type TradeKey = (typeof TRADES)[number];
type Lang = 'fr' | 'de' | 'en';

/** URL segment under /{locale}/regioo/, in the words people search with. */
export const TRADE_SLUGS: Record<Lang, Record<TradeKey, string>> = {
  fr: {
    plumber: 'logiciel-plombier',
    electrician: 'logiciel-electricien',
    fibre: 'logiciel-installateur-fibre',
    heating: 'logiciel-chauffagiste',
  },
  de: {
    plumber: 'software-sanitaer',
    electrician: 'software-elektriker',
    fibre: 'software-glasfaser-installateur',
    heating: 'software-heizungsinstallateur',
  },
  en: {
    plumber: 'plumber-software',
    electrician: 'electrician-software',
    fibre: 'fibre-installer-software',
    heating: 'heating-engineer-software',
  },
};

export const tradePath = (locale: string, trade: TradeKey) =>
  `/regioo/${(TRADE_SLUGS[locale as Lang] ?? TRADE_SLUGS.fr)[trade]}`;

export function tradeFromSlug(locale: string, slug: string): TradeKey | undefined {
  const slugs = TRADE_SLUGS[locale as Lang] ?? TRADE_SLUGS.fr;
  return TRADES.find((trade) => slugs[trade] === slug);
}

interface Trade {
  /** Short name for links: "Plombiers". */
  name: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  line1: string;
  line2: string;
  body: string;
  pains: { title: string; text: string }[];
  /** The example job shown above the step-by-step demo. */
  job: string;
  proofs: string[];
  faq: { q: string; a: string }[];
}

interface Shared {
  painsTitle: string;
  demoTitle: string;
  demoIntro: string;
  proofsTitle: string;
  proofsBody: string;
  proofsNote: string;
  othersTitle: string;
  allRegioo: string;
  breadcrumbHome: string;
}

const fr: { shared: Shared; trades: Record<TradeKey, Trade> } = {
  shared: {
    painsTitle: 'Ce que vous vivez aujourd’hui.',
    demoTitle: 'La même intervention, avec Regioo.',
    demoIntro: 'Cliquez sur une étape, ou laissez défiler.',
    proofsTitle: 'La preuve, prise sur place.',
    proofsBody: 'Chaque type d’intervention a ses preuves obligatoires. Tant qu’elles manquent, l’intervention ne peut pas être validée.',
    proofsNote: 'Nous configurons vos types d’intervention et leurs preuves avec vous.',
    othersTitle: 'Regioo pour d’autres métiers',
    allRegioo: 'Tout savoir sur Regioo',
    breadcrumbHome: 'Accueil',
  },
  trades: {
    plumber: {
      name: 'Plombiers',
      metaTitle: 'Logiciel pour plombiers · Interventions, preuves photo, SMS client | Regioo',
      metaDescription:
        'Regioo suit les interventions de vos plombiers, du départ à la preuve photo, et prévient vos clients par SMS au nom de votre entreprise. CHF 45 par technicien et par mois, essai de 14 jours.',
      kicker: 'Regioo · Pour les entreprises de plomberie',
      line1: 'Le client demande : « Il arrive quand ? »',
      line2: 'Il le sait déjà.',
      body: 'Regioo prévient vos clients par SMS quand le plombier part, et garde la photo du travail terminé. Votre bureau suit la journée sans téléphoner.',
      pains: [
        { title: 'Le téléphone sonne toute la journée', text: 'Les clients appellent pour savoir quand le plombier arrive. Le bureau appelle le plombier pour le leur dire.' },
        { title: 'Un client conteste le travail', text: 'Sans photo datée, c’est votre parole contre la sienne.' },
        { title: 'Personne à la maison', text: 'Le déplacement est perdu, et il ne reste aucune trace que vous êtes venus.' },
      ],
      job: 'Remplacement d’un chauffe-eau · Bulle',
      proofs: ['Photo de l’installation avant travaux', 'Photo de l’installation terminée', 'Photo du raccordement'],
      faq: [
        { q: 'Mes plombiers doivent-ils installer une application ?', a: 'Non. Regioo s’ouvre dans le navigateur du téléphone et s’ajoute à l’écran d’accueil.' },
        { q: 'Que se passe-t-il si le client est absent ?', a: 'Le plombier enregistre le refus avec son motif. Vous replanifiez le même dossier, qui garde l’historique des passages.' },
      ],
    },
    electrician: {
      name: 'Électriciens',
      metaTitle: 'Logiciel pour électriciens · Suivi des interventions et preuves photo | Regioo',
      metaDescription:
        'Regioo suit les interventions de vos électriciens, exige la preuve photo avant validation et prévient vos clients par SMS. CHF 45 par technicien et par mois, essai de 14 jours.',
      kicker: 'Regioo · Pour les entreprises d’électricité',
      line1: 'Chaque intervention,',
      line2: 'avec sa preuve.',
      body: 'Regioo suit vos électriciens du départ à la fin du travail. Une intervention ne se valide pas sans la photo exigée, et le rapport PDF part depuis le téléphone.',
      pains: [
        { title: 'Des rapports remplis le soir', text: 'Ou pas du tout. Le lendemain, plus personne ne sait ce qui a été fait.' },
        { title: 'Des photos perdues dans WhatsApp', text: 'Elles existent, mais personne ne les retrouve le jour où on en a besoin.' },
        { title: 'Un planning refait à la main', text: 'Un chantier qui déborde, et toute la journée est à rappeler par téléphone.' },
      ],
      job: 'Contrôle d’un tableau électrique · Vevey',
      proofs: ['Photo du tableau avant intervention', 'Photo du tableau après intervention', 'Photo de l’appareil de mesure'],
      faq: [
        { q: 'Peut-on remettre un rapport au client sur place ?', a: 'Oui. Regioo produit un PDF avec le dossier, le déroulement et les photos, depuis le téléphone de l’électricien.' },
        { q: 'Qui décide des photos obligatoires ?', a: 'Vous. Chaque type d’intervention a ses preuves exigées, que nous configurons avec vous.' },
      ],
    },
    fibre: {
      name: 'Installateurs fibre',
      metaTitle: 'Logiciel pour installateurs fibre optique · Mandats et preuves | Regioo',
      metaDescription:
        'Regioo suit vos mandats fibre étape par étape, exige la preuve photo de chaque étape et garde l’historique de chaque passage. CHF 45 par technicien et par mois, essai de 14 jours.',
      kicker: 'Regioo · Pour les installateurs de fibre optique',
      line1: '« Nous y sommes allés trois fois. »',
      line2: 'Et vous pouvez le prouver.',
      body: 'Regioo suit chaque mandat fibre, étape par étape. Chaque passage est daté et localisé, chaque étape a sa photo, et le rapport PDF se transmet à l’opérateur.',
      pains: [
        { title: 'L’opérateur conteste un passage', text: 'Vous savez que vous y étiez. Il vous faut la date, le lieu et la photo.' },
        { title: 'Des étapes validées sans preuve', text: 'Le dossier est clos, mais la photo manque, et il faut y retourner.' },
        { title: 'Des refus sans suite', text: 'Le client était absent, et personne n’a fixé de nouvelle date.' },
      ],
      job: 'Raccordement fibre · Romont',
      proofs: ['Photo du tirage', 'Photo du boîtier', 'Photo de la prise et de la mesure'],
      faq: [
        { q: 'Regioo gère-t-il plusieurs étapes pour une même adresse ?', a: 'Oui. La fiche client regroupe les étapes d’une même adresse, et chaque étape a ses propres preuves obligatoires.' },
        { q: 'Peut-on transmettre le dossier à l’opérateur ?', a: 'Oui. Regioo produit un PDF avec le déroulement, les positions relevées et les photos.' },
      ],
    },
    heating: {
      name: 'Chauffagistes',
      metaTitle: 'Logiciel pour chauffagistes · Dépannages et entretiens suivis | Regioo',
      metaDescription:
        'Regioo suit les dépannages et les entretiens de vos chauffagistes, prévient vos clients par SMS et garde la preuve photo. CHF 45 par technicien et par mois, essai de 14 jours.',
      kicker: 'Regioo · Pour les entreprises de chauffage',
      line1: 'En plein hiver,',
      line2: 'tout le monde sait où on en est.',
      body: 'Regioo suit vos dépannages et vos entretiens. Le client reçoit un SMS quand le technicien part, et votre bureau voit ce qui bloque avant que le téléphone sonne.',
      pains: [
        { title: 'Les urgences bousculent tout', text: 'Une panne arrive, et le planning de la journée est à refaire par téléphone.' },
        { title: 'Le client attend sans nouvelles', text: 'Il a froid, il rappelle, et votre bureau ne sait pas où est le technicien.' },
        { title: 'Des entretiens sans trace', text: 'Un an plus tard, personne ne sait ce qui a été fait ni par qui.' },
      ],
      job: 'Dépannage d’une chaudière · Fribourg',
      proofs: ['Photo de l’installation à l’arrivée', 'Photo de la pièce remplacée', 'Photo de l’installation en service'],
      faq: [
        { q: 'Peut-on replanifier un dépannage sans perdre le dossier ?', a: 'Oui. Vous replanifiez le même dossier, qui garde tout l’historique des passages.' },
        { q: 'Le client est-il prévenu du passage ?', a: 'Oui. Il reçoit un rappel la veille et un SMS au départ du technicien, au nom de votre entreprise.' },
      ],
    },
  },
};

const en: typeof fr = {
  shared: {
    painsTitle: 'What you live with today.',
    demoTitle: 'The same job, with Regioo.',
    demoIntro: 'Click a step, or let it play.',
    proofsTitle: 'Proof, taken on site.',
    proofsBody: 'Each type of job has its required proofs. While they are missing, the job cannot be validated.',
    proofsNote: 'We set up your job types and their proofs with you.',
    othersTitle: 'Regioo for other trades',
    allRegioo: 'Everything about Regioo',
    breadcrumbHome: 'Home',
  },
  trades: {
    plumber: {
      name: 'Plumbers',
      metaTitle: 'Software for plumbers · Jobs, photo proof, customer SMS | Regioo',
      metaDescription:
        'Regioo follows your plumbers’ jobs from departure to photo proof and notifies your customers by SMS under your company’s name. CHF 45 per technician per month, 14-day trial.',
      kicker: 'Regioo · For plumbing companies',
      line1: 'The customer asks: “When is he coming?”',
      line2: 'They already know.',
      body: 'Regioo notifies your customers by SMS when the plumber leaves, and keeps the photo of the finished work. Your office follows the day without calling.',
      pains: [
        { title: 'The phone rings all day', text: 'Customers call to ask when the plumber arrives. The office calls the plumber to tell them.' },
        { title: 'A customer disputes the work', text: 'Without a dated photo, it is your word against theirs.' },
        { title: 'Nobody home', text: 'The trip is lost, and nothing shows that you came.' },
      ],
      job: 'Water heater replacement · Bulle',
      proofs: ['Photo of the installation before work', 'Photo of the finished installation', 'Photo of the connection'],
      faq: [
        { q: 'Do my plumbers need to install an app?', a: 'No. Regioo opens in the phone’s browser and is added to the home screen.' },
        { q: 'What happens if the customer is absent?', a: 'The plumber records the refusal with its reason. You reschedule the same job, which keeps the history of visits.' },
      ],
    },
    electrician: {
      name: 'Electricians',
      metaTitle: 'Software for electricians · Job tracking and photo proof | Regioo',
      metaDescription:
        'Regioo follows your electricians’ jobs, requires photo proof before validation and notifies your customers by SMS. CHF 45 per technician per month, 14-day trial.',
      kicker: 'Regioo · For electrical companies',
      line1: 'Every job,',
      line2: 'with its proof.',
      body: 'Regioo follows your electricians from departure to the end of the work. A job cannot be validated without the required photo, and the PDF report is sent from the phone.',
      pains: [
        { title: 'Reports written in the evening', text: 'Or not at all. The next day, nobody knows what was done.' },
        { title: 'Photos lost in WhatsApp', text: 'They exist, but nobody finds them on the day they are needed.' },
        { title: 'A schedule redone by hand', text: 'One job overruns, and the whole day has to be rearranged by phone.' },
      ],
      job: 'Electrical panel check · Vevey',
      proofs: ['Photo of the panel before work', 'Photo of the panel after work', 'Photo of the measuring device'],
      faq: [
        { q: 'Can a report be handed to the customer on site?', a: 'Yes. Regioo produces a PDF with the job, how it went and the photos, from the electrician’s phone.' },
        { q: 'Who decides which photos are required?', a: 'You do. Each type of job has its required proofs, which we set up with you.' },
      ],
    },
    fibre: {
      name: 'Fibre installers',
      metaTitle: 'Software for fibre optic installers · Work orders and proof | Regioo',
      metaDescription:
        'Regioo follows your fibre work orders step by step, requires photo proof of each step and keeps the history of every visit. CHF 45 per technician per month, 14-day trial.',
      kicker: 'Regioo · For fibre optic installers',
      line1: '“We went there three times.”',
      line2: 'And you can prove it.',
      body: 'Regioo follows every fibre work order, step by step. Every visit is dated and located, every step has its photo, and the PDF report goes to the operator.',
      pains: [
        { title: 'The operator disputes a visit', text: 'You know you were there. You need the date, the place and the photo.' },
        { title: 'Steps validated without proof', text: 'The job is closed, but the photo is missing, and someone has to go back.' },
        { title: 'Refusals left hanging', text: 'The customer was absent, and nobody set a new date.' },
      ],
      job: 'Fibre connection · Romont',
      proofs: ['Photo of the cable pull', 'Photo of the junction box', 'Photo of the outlet and the measurement'],
      faq: [
        { q: 'Does Regioo handle several steps for one address?', a: 'Yes. The customer record groups the steps of one address, and each step has its own required proofs.' },
        { q: 'Can the file be sent to the operator?', a: 'Yes. Regioo produces a PDF with how the job went, the recorded positions and the photos.' },
      ],
    },
    heating: {
      name: 'Heating engineers',
      metaTitle: 'Software for heating engineers · Repairs and servicing tracked | Regioo',
      metaDescription:
        'Regioo follows your heating engineers’ repairs and servicing, notifies your customers by SMS and keeps the photo proof. CHF 45 per technician per month, 14-day trial.',
      kicker: 'Regioo · For heating companies',
      line1: 'In the middle of winter,',
      line2: 'everyone knows where things stand.',
      body: 'Regioo follows your repairs and servicing. The customer gets an SMS when the technician leaves, and your office sees what is stuck before the phone rings.',
      pains: [
        { title: 'Emergencies upset everything', text: 'A breakdown comes in, and the day’s schedule has to be redone by phone.' },
        { title: 'The customer waits without news', text: 'They are cold, they call again, and your office does not know where the technician is.' },
        { title: 'Servicing without a trace', text: 'A year later, nobody knows what was done or by whom.' },
      ],
      job: 'Boiler repair · Fribourg',
      proofs: ['Photo of the installation on arrival', 'Photo of the replaced part', 'Photo of the installation running'],
      faq: [
        { q: 'Can a repair be rescheduled without losing the file?', a: 'Yes. You reschedule the same job, which keeps the full history of visits.' },
        { q: 'Is the customer told about the visit?', a: 'Yes. They receive a reminder the day before and an SMS when the technician leaves, under your company’s name.' },
      ],
    },
  },
};

/** Swiss High German (no ß). A first draft: have a native speaker review it. */
const de: typeof fr = {
  shared: {
    painsTitle: 'Was Sie heute erleben.',
    demoTitle: 'Derselbe Einsatz, mit Regioo.',
    demoIntro: 'Klicken Sie auf einen Schritt oder lassen Sie es laufen.',
    proofsTitle: 'Der Beweis, vor Ort aufgenommen.',
    proofsBody: 'Jede Einsatzart hat ihre verlangten Beweise. Solange sie fehlen, lässt sich der Einsatz nicht bestätigen.',
    proofsNote: 'Wir richten Ihre Einsatzarten und deren Beweise mit Ihnen ein.',
    othersTitle: 'Regioo für andere Branchen',
    allRegioo: 'Alles über Regioo',
    breadcrumbHome: 'Startseite',
  },
  trades: {
    plumber: {
      name: 'Sanitärbetriebe',
      metaTitle: 'Software für Sanitärbetriebe · Einsätze, Fotobeweis, Kunden-SMS | Regioo',
      metaDescription:
        'Regioo begleitet die Einsätze Ihrer Sanitärinstallateure von der Abfahrt bis zum Fotobeweis und informiert Ihre Kunden per SMS im Namen Ihres Unternehmens. CHF 45 pro Techniker und Monat, 14 Tage testen.',
      kicker: 'Regioo · Für Sanitärbetriebe',
      line1: 'Der Kunde fragt: «Wann kommt er?»',
      line2: 'Er weiss es schon.',
      body: 'Regioo informiert Ihre Kunden per SMS, sobald der Installateur losfährt, und bewahrt das Foto der fertigen Arbeit auf. Ihr Büro verfolgt den Tag, ohne anzurufen.',
      pains: [
        { title: 'Das Telefon klingelt den ganzen Tag', text: 'Kunden fragen, wann der Installateur kommt. Das Büro ruft den Installateur an, um es ihnen zu sagen.' },
        { title: 'Ein Kunde beanstandet die Arbeit', text: 'Ohne datiertes Foto steht Aussage gegen Aussage.' },
        { title: 'Niemand zu Hause', text: 'Die Fahrt ist verloren, und nichts belegt, dass Sie da waren.' },
      ],
      job: 'Ersatz eines Boilers · Bulle',
      proofs: ['Foto der Anlage vor der Arbeit', 'Foto der fertigen Anlage', 'Foto des Anschlusses'],
      faq: [
        { q: 'Müssen meine Installateure eine App installieren?', a: 'Nein. Regioo öffnet sich im Browser des Handys und wird dem Startbildschirm hinzugefügt.' },
        { q: 'Was passiert, wenn der Kunde nicht da ist?', a: 'Der Installateur erfasst die Absage mit dem Grund. Sie planen denselben Einsatz neu, der Verlauf der Besuche bleibt erhalten.' },
      ],
    },
    electrician: {
      name: 'Elektriker',
      metaTitle: 'Software für Elektriker · Einsätze verfolgen, Fotobeweis | Regioo',
      metaDescription:
        'Regioo begleitet die Einsätze Ihrer Elektriker, verlangt den Fotobeweis vor der Bestätigung und informiert Ihre Kunden per SMS. CHF 45 pro Techniker und Monat, 14 Tage testen.',
      kicker: 'Regioo · Für Elektrounternehmen',
      line1: 'Jeder Einsatz,',
      line2: 'mit seinem Beweis.',
      body: 'Regioo begleitet Ihre Elektriker von der Abfahrt bis zum Ende der Arbeit. Ohne das verlangte Foto lässt sich ein Einsatz nicht bestätigen, und der PDF-Bericht geht vom Handy aus.',
      pains: [
        { title: 'Rapporte am Abend ausgefüllt', text: 'Oder gar nicht. Am nächsten Tag weiss niemand mehr, was gemacht wurde.' },
        { title: 'Fotos in WhatsApp verloren', text: 'Es gibt sie, aber niemand findet sie an dem Tag, an dem man sie braucht.' },
        { title: 'Die Planung von Hand neu gemacht', text: 'Ein Auftrag dauert länger, und der ganze Tag muss telefonisch umgeplant werden.' },
      ],
      job: 'Kontrolle einer Verteilung · Vevey',
      proofs: ['Foto der Verteilung vor dem Einsatz', 'Foto der Verteilung nach dem Einsatz', 'Foto des Messgeräts'],
      faq: [
        { q: 'Kann dem Kunden vor Ort ein Bericht übergeben werden?', a: 'Ja. Regioo erstellt ein PDF mit dem Einsatz, dem Ablauf und den Fotos, vom Handy des Elektrikers.' },
        { q: 'Wer bestimmt, welche Fotos verlangt werden?', a: 'Sie. Jede Einsatzart hat ihre verlangten Beweise, die wir mit Ihnen einrichten.' },
      ],
    },
    fibre: {
      name: 'Glasfaser-Installateure',
      metaTitle: 'Software für Glasfaser-Installateure · Aufträge und Beweise | Regioo',
      metaDescription:
        'Regioo begleitet Ihre Glasfaser-Aufträge Schritt für Schritt, verlangt den Fotobeweis jedes Schritts und bewahrt den Verlauf jedes Besuchs. CHF 45 pro Techniker und Monat, 14 Tage testen.',
      kicker: 'Regioo · Für Glasfaser-Installateure',
      line1: '«Wir waren dreimal dort.»',
      line2: 'Und Sie können es belegen.',
      body: 'Regioo begleitet jeden Glasfaser-Auftrag, Schritt für Schritt. Jeder Besuch hat Datum und Standort, jeder Schritt sein Foto, und der PDF-Bericht geht an den Betreiber.',
      pains: [
        { title: 'Der Betreiber bestreitet einen Besuch', text: 'Sie wissen, dass Sie dort waren. Sie brauchen Datum, Ort und Foto.' },
        { title: 'Schritte ohne Beweis bestätigt', text: 'Der Auftrag ist abgeschlossen, aber das Foto fehlt, und jemand muss noch einmal hin.' },
        { title: 'Absagen ohne Folge', text: 'Der Kunde war nicht da, und niemand hat einen neuen Termin gesetzt.' },
      ],
      job: 'Glasfaseranschluss · Romont',
      proofs: ['Foto des Kabeleinzugs', 'Foto der Anschlussdose', 'Foto der Steckdose und der Messung'],
      faq: [
        { q: 'Verwaltet Regioo mehrere Schritte für eine Adresse?', a: 'Ja. Das Kundenblatt fasst die Schritte einer Adresse zusammen, und jeder Schritt hat seine eigenen verlangten Beweise.' },
        { q: 'Kann das Dossier an den Betreiber übermittelt werden?', a: 'Ja. Regioo erstellt ein PDF mit dem Ablauf, den erfassten Standorten und den Fotos.' },
      ],
    },
    heating: {
      name: 'Heizungsbetriebe',
      metaTitle: 'Software für Heizungsinstallateure · Reparaturen und Wartung | Regioo',
      metaDescription:
        'Regioo begleitet Reparaturen und Wartungen Ihrer Heizungsinstallateure, informiert Ihre Kunden per SMS und bewahrt den Fotobeweis. CHF 45 pro Techniker und Monat, 14 Tage testen.',
      kicker: 'Regioo · Für Heizungsbetriebe',
      line1: 'Mitten im Winter',
      line2: 'wissen alle, woran sie sind.',
      body: 'Regioo begleitet Ihre Reparaturen und Wartungen. Der Kunde erhält eine SMS, sobald der Techniker losfährt, und Ihr Büro sieht, was blockiert, bevor das Telefon klingelt.',
      pains: [
        { title: 'Notfälle werfen alles um', text: 'Eine Störung kommt herein, und die Tagesplanung muss telefonisch neu gemacht werden.' },
        { title: 'Der Kunde wartet ohne Nachricht', text: 'Er friert, er ruft wieder an, und Ihr Büro weiss nicht, wo der Techniker ist.' },
        { title: 'Wartungen ohne Spur', text: 'Ein Jahr später weiss niemand, was gemacht wurde und von wem.' },
      ],
      job: 'Reparatur eines Heizkessels · Freiburg',
      proofs: ['Foto der Anlage bei Ankunft', 'Foto des ersetzten Teils', 'Foto der Anlage in Betrieb'],
      faq: [
        { q: 'Lässt sich eine Reparatur neu planen, ohne das Dossier zu verlieren?', a: 'Ja. Sie planen denselben Einsatz neu, der ganze Verlauf der Besuche bleibt erhalten.' },
        { q: 'Wird der Kunde über den Besuch informiert?', a: 'Ja. Er erhält am Vortag eine Erinnerung und bei der Abfahrt des Technikers eine SMS, im Namen Ihres Unternehmens.' },
      ],
    },
  },
};

const COPIES = { fr, en, de };

export function getTradesCopy(locale: string) {
  return COPIES[locale as Lang] ?? fr;
}
