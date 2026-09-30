/*
 * Copy for the Raqim product page and its homepage card, in three languages.
 *
 * Everything here comes from Raqim's own site (getraqim.app): the four
 * journeys (enrol, collect, organise, inform), the 15-day trial, unlimited
 * users, no installation, Excel import, data hosted in Europe (Paris). Features
 * that site lists as "bientôt" are left out. The Swiss price is a single value
 * below, so it appears everywhere at once when the owner provides it.
 */

/** CHF per year. `null` shows "on request" everywhere until the owner sets it. */
export const RAQIM_PRICE_CHF: number | null = null;

const fr = {
  meta: {
    title: 'Raqim · Logiciel de gestion pour écoles privées et jardins d’enfants | Vectra',
    description:
      'Raqim remplace le registre, le cahier de caisse, Excel et les groupes WhatsApp de votre école : inscriptions en ligne, frais et reçus, emplois du temps, présences et espace famille. Essai gratuit de 15 jours.',
  },
  hero: {
    kicker: 'Raqim · Écoles privées, jardins d’enfants, associations',
    line1: 'Inscrire. Encaisser. Organiser. Informer.',
    line2: 'Tout, au même endroit.',
    body: 'Raqim remplace le registre, le cahier de caisse, Excel et les groupes WhatsApp de votre établissement. Les familles remplissent une fois, en ligne, et voient ce qui les concerne.',
    cta: 'Demander une démo',
    note: 'Essai gratuit de 15 jours · Sans installation · Utilisateurs illimités',
  },
  demo: {
    title: 'Une inscription, du formulaire à la place confirmée.',
    intro: 'Cliquez sur une étape, ou laissez défiler.',
    office: 'Ce que voit le secrétariat',
    family: 'Ce que voit la famille',
    student: 'Yasmine B. · Demande d’inscription · 5e année',
    caption: 'Illustration · données fictives',
    steps: [
      { label: 'Formulaire rempli par la famille', status: 'Reçue', family: 'Votre demande pour Yasmine est bien reçue.' },
      { label: 'Pièces vérifiées par le secrétariat', status: 'En examen', family: 'Pièce à fournir : le bulletin 2025–2026.' },
      { label: 'Offre de place envoyée', status: 'Offre émise', family: 'Une place est proposée en 5e A. Acceptez-la en ligne.' },
      { label: 'Place confirmée', status: 'Inscrite', family: 'Yasmine est inscrite en 5e A pour 2026–2027.' },
    ],
  },
  features: {
    title: 'Quatre parcours, une seule source de vérité.',
    items: [
      { title: 'Inscrire, sans rien recopier', text: 'La famille remplit une fois en ligne. L’école examine, demande, décide. Capacité par niveau, liste d’attente et réinscription d’une année à l’autre.' },
      { title: 'Encaisser, et savoir où est chaque franc', text: 'Tarifs par niveau, solde de chaque élève connu à tout moment, reçu numéroté pour chaque paiement, clôture de caisse contrôlée.' },
      { title: 'Organiser les classes et les horaires', text: 'L’emploi du temps se construit en glissant les cours. Raqim refuse un créneau qui met un enseignant à deux endroits.' },
      { title: 'Le personnel et la paie', text: 'Pointage du personnel par QR code, retards revus et justifiés, paie préparée à partir des présences réellement pointées.' },
      { title: 'Informer les familles', text: 'L’enseignant fait l’appel sur son téléphone. Le parent voit la présence, l’emploi du temps et son solde dans son espace.' },
      { title: 'Démarrer sans matériel', text: 'Rien à installer. Vos fichiers Excel sont repris, la configuration se fait à distance, et chaque rôle a sa formation vidéo.' },
    ],
  },
  security: {
    title: 'Des données d’enfants et d’argent. Protégées comme il se doit.',
    body: 'Les droits de chaque rôle sont vérifiés par la base de données elle-même, et l’historique ne s’efface pas.',
    points: ['Reçus, corrections et paies gardent leur auteur, leur date et leur motif', 'Données hébergées en Europe, à Paris, avec sauvegardes quotidiennes', 'Export complet de vos données à tout moment'],
  },
  price: {
    title: 'Un prix fixe par an.',
    intro: 'Toutes les fonctions incluses. Utilisateurs illimités.',
    onRequest: 'Sur demande',
    perYear: 'par an',
    note: 'Selon la taille de votre établissement. Nous vous envoyons le prix par écrit après la démonstration.',
    terms: ['Essai gratuit de 15 jours, sans engagement', 'Direction, équipes, enseignants et parents inclus', 'Import de vos fichiers Excel et formation vidéo compris'],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Peut-on essayer Raqim avant de s’engager ?', a: 'Oui. L’essai gratuit dure 15 jours, dans un espace préparé avec vos niveaux et vos classes.' },
      { q: 'Faut-il acheter du matériel ?', a: 'Non. Raqim fonctionne sur ordinateur et sur téléphone, dans le navigateur. Une connexion 3G ou 4G suffit si l’ADSL tombe.' },
      { q: 'Où sont hébergées les données ?', a: 'En Europe : la base de données est à Paris, la connexion est chiffrée et les sauvegardes sont quotidiennes.' },
      { q: 'Pouvez-vous reprendre nos fichiers Excel ?', a: 'Oui. Élèves, familles et personnel sont repris depuis vos fichiers, et la configuration se fait à distance.' },
      { q: 'Nos données nous appartiennent-elles ?', a: 'Oui. Vous pouvez tout exporter à tout moment, et à la fin du contrat.' },
    ],
  },
  closing: { title: 'Voyons Raqim avec vos niveaux et vos classes.', body: 'Laissez vos coordonnées. Nous vous répondons par e-mail pour fixer une démonstration.', back: 'Retour à l’accueil' },
  more: 'Découvrir Raqim',
  card: {
    tab: 'École ou jardin d’enfants',
    tag: 'Écoles privées, crèches, associations',
    line: 'Inscrire, encaisser, organiser, informer.',
    points: ['Inscriptions en ligne, sans rien recopier', 'Frais de scolarité, reçus et caisse', 'Emplois du temps, présences et paie'],
    priceNote: 'prix fixe par an, selon la taille de l’école',
    cta: 'Demander une démo',
    ctaNote: 'Essai gratuit de 15 jours',
    screen: [
      ['7B', 'Présences du matin', 'Saisies'],
      ['Caisse', 'Reçu n° 128 · Tranche 1', 'Encaissé'],
      ['5A', 'Emploi du temps · Lundi', 'À jour'],
      ['RH', 'Paie de septembre', 'Prête'],
    ],
  },
};

export type RaqimCopy = typeof fr;

const en: RaqimCopy = {
  meta: {
    title: 'Raqim · Management software for private schools and nurseries | Vectra',
    description:
      'Raqim replaces your school’s register, cash book, Excel and WhatsApp groups: online enrolment, fees and receipts, timetables, attendance and a family space. Free 15-day trial.',
  },
  hero: {
    kicker: 'Raqim · Private schools, nurseries, associations',
    line1: 'Enrol. Collect. Organise. Inform.',
    line2: 'All in one place.',
    body: 'Raqim replaces your school’s register, cash book, Excel and WhatsApp groups. Families fill in once, online, and see what concerns them.',
    cta: 'Request a demo',
    note: 'Free 15-day trial · No installation · Unlimited users',
  },
  demo: {
    title: 'One enrolment, from the form to the confirmed place.',
    intro: 'Click a step, or let it play.',
    office: 'What the office sees',
    family: 'What the family sees',
    student: 'Yasmine B. · Enrolment request · Year 5',
    caption: 'Illustration · sample data',
    steps: [
      { label: 'Form filled in by the family', status: 'Received', family: 'Your request for Yasmine has been received.' },
      { label: 'Documents checked by the office', status: 'Under review', family: 'Document needed: the 2025–2026 report.' },
      { label: 'Place offered', status: 'Offer sent', family: 'A place is offered in 5A. Accept it online.' },
      { label: 'Place confirmed', status: 'Enrolled', family: 'Yasmine is enrolled in 5A for 2026–2027.' },
    ],
  },
  features: {
    title: 'Four journeys, one source of truth.',
    items: [
      { title: 'Enrol, without retyping', text: 'The family fills in once, online. The school reviews, asks, decides. Capacity per level, waiting list and re-enrolment from one year to the next.' },
      { title: 'Collect, and know where every franc is', text: 'Fees per level, each pupil’s balance known at all times, a numbered receipt for every payment, a controlled cash close.' },
      { title: 'Organise classes and timetables', text: 'The timetable is built by dragging lessons. Raqim refuses a slot that puts a teacher in two places.' },
      { title: 'Staff and payroll', text: 'Staff clock in by QR code, lateness is reviewed and justified, payroll is prepared from the attendance actually recorded.' },
      { title: 'Inform families', text: 'The teacher takes the register on a phone. The parent sees attendance, the timetable and their balance in their own space.' },
      { title: 'Start without equipment', text: 'Nothing to install. Your Excel files are imported, setup is done remotely, and each role has its video training.' },
    ],
  },
  security: {
    title: 'Children’s data and money. Protected as they should be.',
    body: 'The rights of each role are checked by the database itself, and the history cannot be erased.',
    points: ['Receipts, corrections and payroll keep their author, date and reason', 'Data hosted in Europe, in Paris, with daily backups', 'Full export of your data at any time'],
  },
  price: {
    title: 'One fixed price per year.',
    intro: 'All features included. Unlimited users.',
    onRequest: 'On request',
    perYear: 'per year',
    note: 'Depending on the size of your school. We send you the price in writing after the demo.',
    terms: ['Free 15-day trial, no commitment', 'Management, staff, teachers and parents included', 'Excel import and video training included'],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'Can we try Raqim before committing?', a: 'Yes. The free trial lasts 15 days, in a space prepared with your levels and classes.' },
      { q: 'Do we need to buy equipment?', a: 'No. Raqim works on computers and phones, in the browser. A 3G or 4G connection is enough if the landline fails.' },
      { q: 'Where is the data hosted?', a: 'In Europe: the database is in Paris, the connection is encrypted and backups are daily.' },
      { q: 'Can you import our Excel files?', a: 'Yes. Pupils, families and staff are imported from your files, and setup is done remotely.' },
      { q: 'Does our data belong to us?', a: 'Yes. You can export everything at any time, and at the end of the contract.' },
    ],
  },
  closing: { title: 'Let’s look at Raqim with your levels and classes.', body: 'Leave your details. We reply by email to arrange a demo.', back: 'Back to home' },
  more: 'Discover Raqim',
  card: {
    tab: 'School or nursery',
    tag: 'Private schools, nurseries, associations',
    line: 'Enrol, collect, organise, inform.',
    points: ['Online enrolment, without retyping', 'School fees, receipts and cash', 'Timetables, attendance and payroll'],
    priceNote: 'fixed price per year, by school size',
    cta: 'Request a demo',
    ctaNote: 'Free 15-day trial',
    screen: [
      ['7B', 'Morning register', 'Taken'],
      ['Cash', 'Receipt no. 128 · Instalment 1', 'Collected'],
      ['5A', 'Timetable · Monday', 'Up to date'],
      ['HR', 'September payroll', 'Ready'],
    ],
  },
};

/** Swiss High German (no ß). A first draft: have a native speaker review it. */
const de: RaqimCopy = {
  meta: {
    title: 'Raqim · Verwaltungssoftware für Privatschulen und Kitas | Vectra',
    description:
      'Raqim ersetzt Register, Kassenbuch, Excel und WhatsApp-Gruppen Ihrer Schule: Online-Anmeldung, Gebühren und Quittungen, Stundenpläne, Anwesenheit und Familienbereich. 15 Tage kostenlos testen.',
  },
  hero: {
    kicker: 'Raqim · Privatschulen, Kitas, Vereine',
    line1: 'Anmelden. Einnehmen. Organisieren. Informieren.',
    line2: 'Alles an einem Ort.',
    body: 'Raqim ersetzt Register, Kassenbuch, Excel und WhatsApp-Gruppen Ihrer Einrichtung. Familien füllen einmal online aus und sehen, was sie betrifft.',
    cta: 'Demo anfragen',
    note: '15 Tage kostenlos testen · Keine Installation · Unbegrenzte Benutzer',
  },
  demo: {
    title: 'Eine Anmeldung, vom Formular bis zum bestätigten Platz.',
    intro: 'Klicken Sie auf einen Schritt oder lassen Sie es laufen.',
    office: 'Was das Sekretariat sieht',
    family: 'Was die Familie sieht',
    student: 'Yasmine B. · Anmeldung · 5. Klasse',
    caption: 'Illustration · Beispieldaten',
    steps: [
      { label: 'Formular von der Familie ausgefüllt', status: 'Eingegangen', family: 'Ihre Anmeldung für Yasmine ist eingegangen.' },
      { label: 'Unterlagen vom Sekretariat geprüft', status: 'In Prüfung', family: 'Noch einzureichen: das Zeugnis 2025–2026.' },
      { label: 'Platz angeboten', status: 'Angebot gesendet', family: 'Ein Platz in der 5A wird angeboten. Nehmen Sie ihn online an.' },
      { label: 'Platz bestätigt', status: 'Angemeldet', family: 'Yasmine ist für 2026–2027 in der 5A angemeldet.' },
    ],
  },
  features: {
    title: 'Vier Abläufe, eine einzige Quelle der Wahrheit.',
    items: [
      { title: 'Anmelden, ohne abzutippen', text: 'Die Familie füllt einmal online aus. Die Schule prüft, fragt nach, entscheidet. Kapazität pro Stufe, Warteliste und Wiederanmeldung von Jahr zu Jahr.' },
      { title: 'Einnehmen und wissen, wo jeder Franken ist', text: 'Gebühren pro Stufe, Saldo jedes Kindes jederzeit bekannt, nummerierte Quittung für jede Zahlung, kontrollierter Kassenabschluss.' },
      { title: 'Klassen und Stundenpläne organisieren', text: 'Der Stundenplan entsteht durch Ziehen der Lektionen. Raqim lehnt einen Termin ab, der eine Lehrperson an zwei Orte setzt.' },
      { title: 'Personal und Lohn', text: 'Zeiterfassung des Personals per QR-Code, Verspätungen geprüft und begründet, Lohn aus den tatsächlich erfassten Anwesenheiten vorbereitet.' },
      { title: 'Familien informieren', text: 'Die Lehrperson macht die Anwesenheitskontrolle am Handy. Eltern sehen Anwesenheit, Stundenplan und Saldo in ihrem Bereich.' },
      { title: 'Ohne Geräte starten', text: 'Nichts zu installieren. Ihre Excel-Dateien werden übernommen, die Einrichtung erfolgt aus der Ferne, und jede Rolle hat ihr Video-Training.' },
    ],
  },
  security: {
    title: 'Daten von Kindern und Geld. Geschützt, wie es sein muss.',
    body: 'Die Rechte jeder Rolle werden von der Datenbank selbst geprüft, und der Verlauf lässt sich nicht löschen.',
    points: ['Quittungen, Korrekturen und Löhne behalten Urheber, Datum und Grund', 'Daten in Europa gehostet, in Paris, mit täglichen Sicherungen', 'Vollständiger Export Ihrer Daten jederzeit'],
  },
  price: {
    title: 'Ein Fixpreis pro Jahr.',
    intro: 'Alle Funktionen enthalten. Unbegrenzte Benutzer.',
    onRequest: 'Auf Anfrage',
    perYear: 'pro Jahr',
    note: 'Je nach Grösse Ihrer Einrichtung. Wir senden Ihnen den Preis nach der Demo schriftlich.',
    terms: ['15 Tage kostenlos testen, unverbindlich', 'Leitung, Teams, Lehrpersonen und Eltern inbegriffen', 'Excel-Import und Video-Training inbegriffen'],
  },
  faq: {
    title: 'Häufige Fragen',
    items: [
      { q: 'Können wir Raqim vor einer Verpflichtung testen?', a: 'Ja. Der kostenlose Test dauert 15 Tage, in einem Bereich mit Ihren Stufen und Klassen.' },
      { q: 'Müssen wir Geräte kaufen?', a: 'Nein. Raqim läuft auf Computer und Handy, im Browser. Eine 3G- oder 4G-Verbindung reicht, wenn das Festnetz ausfällt.' },
      { q: 'Wo werden die Daten gehostet?', a: 'In Europa: Die Datenbank steht in Paris, die Verbindung ist verschlüsselt und die Sicherungen sind täglich.' },
      { q: 'Können Sie unsere Excel-Dateien übernehmen?', a: 'Ja. Kinder, Familien und Personal werden aus Ihren Dateien übernommen, die Einrichtung erfolgt aus der Ferne.' },
      { q: 'Gehören uns unsere Daten?', a: 'Ja. Sie können jederzeit alles exportieren, auch am Ende des Vertrags.' },
    ],
  },
  closing: { title: 'Schauen wir Raqim mit Ihren Stufen und Klassen an.', body: 'Hinterlassen Sie Ihre Angaben. Wir antworten per E-Mail, um eine Demo zu vereinbaren.', back: 'Zurück zur Startseite' },
  more: 'Raqim entdecken',
  card: {
    tab: 'Schule oder Kita',
    tag: 'Privatschulen, Kitas, Vereine',
    line: 'Anmelden, einnehmen, organisieren, informieren.',
    points: ['Online-Anmeldung, ohne Abtippen', 'Schulgebühren, Quittungen und Kasse', 'Stundenpläne, Anwesenheit und Lohn'],
    priceNote: 'Fixpreis pro Jahr, je nach Schulgrösse',
    cta: 'Demo anfragen',
    ctaNote: '15 Tage kostenlos testen',
    screen: [
      ['7B', 'Anwesenheit am Morgen', 'Erfasst'],
      ['Kasse', 'Quittung Nr. 128 · Rate 1', 'Eingenommen'],
      ['5A', 'Stundenplan · Montag', 'Aktuell'],
      ['HR', 'Lohn September', 'Bereit'],
    ],
  },
};

const COPIES: Record<string, RaqimCopy> = { fr, en, de };

export function getRaqimCopy(locale: string): RaqimCopy {
  return COPIES[locale] ?? fr;
}

/** "CHF 4'500" once the price is set, otherwise the locale's "on request". */
export function raqimPrice(locale: string): string {
  if (RAQIM_PRICE_CHF === null) return getRaqimCopy(locale).price.onRequest;
  return `CHF ${String(RAQIM_PRICE_CHF).replace(/\B(?=(\d{3})+(?!\d))/g, '’')}`;
}
