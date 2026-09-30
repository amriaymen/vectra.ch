/*
 * Copy for the Regioo product page, in three languages.
 *
 * Every feature and term below is taken from Regioo's own landing page
 * (regioo-app/src/app/page.tsx): photo proof, SMS under the company's name,
 * position on request only, PDF report, rescheduling with history, CHF 45 per
 * technician per month excluding VAT, 14-day trial without a card, no minimum
 * term, data export after leaving. Do not add a claim that page does not make.
 */

const fr = {
  meta: {
    title: 'Regioo · Logiciel de gestion des interventions terrain | Vectra',
    description:
      'Regioo suit vos interventions du départ du technicien jusqu’à la preuve photo, et prévient vos clients par SMS au nom de votre entreprise. CHF 45 par technicien et par mois. Essai de 14 jours sans carte bancaire.',
  },
  hero: {
    kicker: 'Regioo · Gestion des interventions terrain',
    line1: 'Sachez ce qui s’est passé chez le client.',
    line2: 'Sans téléphoner.',
    body: 'Regioo suit chaque intervention, du départ du technicien jusqu’à la preuve photo. Vos clients sont prévenus par SMS, au nom de votre entreprise.',
    cta: 'Commencer l’essai gratuit',
    note: '14 jours, sans carte bancaire · CHF 45 par technicien et par mois',
  },
  demo: {
    title: 'Une intervention, du départ à la preuve.',
    intro: 'Cliquez sur une étape, ou laissez défiler.',
    office: 'Ce que voit votre bureau',
    customer: 'Ce que reçoit votre client',
    sender: 'Votre entreprise',
    none: 'Aucun message à cette étape.',
    caption: 'Illustration · données fictives',
    steps: [
      { time: 'La veille', label: 'Rappel envoyé', status: 'Planifiée', sms: 'Rappel : notre technicien passe demain à 08:00.' },
      { time: '07:42', label: 'Départ du technicien', status: 'En route', sms: 'Votre technicien est en route.' },
      { time: '08:03', label: 'Début du travail', status: 'Sur place', sms: '' },
      { time: '08:51', label: 'Photo de preuve', status: 'Preuve reçue', sms: '' },
      { time: '08:54', label: 'Intervention validée', status: 'Terminée', sms: 'Intervention terminée. Merci de votre confiance.' },
    ],
  },
  features: {
    title: 'Ce que Regioo fait pour vous.',
    items: [
      { title: 'Des preuves, pas des promesses', text: 'Photos horodatées et géolocalisées, prises sur place. Une intervention ne peut pas être validée tant que la preuve exigée manque.' },
      { title: 'Vos clients prévenus, sous votre nom', text: 'Rappel la veille, départ du technicien, résultat. Le SMS s’affiche au nom de votre entreprise, et vous voyez lesquels sont arrivés.' },
      { title: 'Un tableau de bord qui dit quoi faire', text: 'Les trajets partis sans arrivée, les refus sans nouvelle date, les dossiers sans technicien. Chaque chiffre ouvre la liste correspondante.' },
      { title: 'Un rapport PDF en un geste', text: 'Le dossier, le déroulement, les positions relevées et les photos. À transmettre ou à remettre au client, depuis le téléphone du technicien.' },
      { title: 'Replanifier sans perdre l’historique', text: 'Le même dossier, avec tout ce qui s’est passé. Vous pouvez montrer combien de fois vous vous êtes déplacés.' },
      { title: 'Sur le téléphone, sans rien installer', text: 'Vos techniciens ouvrent Regioo dans le navigateur et l’ajoutent à leur écran d’accueil.' },
    ],
  },
  privacy: {
    title: 'Un outil de conduite, pas de surveillance.',
    body: 'Regioo relève la position du technicien à trois moments seulement : au départ, au début du travail et à la fin.',
    points: ['Rien n’est relevé hors intervention', 'Aucun trajet n’est conservé', 'Chaque entreprise ne voit que ses propres données'],
  },
  price: {
    title: 'Un prix. Par technicien.',
    intro: 'Hors TVA. Sans engagement de durée.',
    terms: ['Essai de 14 jours, sans carte bancaire', 'Résiliable pour la fin d’un mois', 'Si vous partez, l’export de vos données reste ouvert'],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Combien coûte Regioo ?', a: 'CHF 45 par technicien et par mois, hors TVA. Il n’y a pas d’engagement de durée : l’abonnement est résiliable pour la fin d’un mois.' },
      { q: 'Peut-on essayer Regioo gratuitement ?', a: 'Oui. L’essai dure 14 jours et ne demande pas de carte bancaire.' },
      { q: 'Regioo suit-il mes techniciens en continu ?', a: 'Non. La position est relevée à trois moments seulement : au départ, au début du travail et à la fin. Rien n’est relevé hors intervention et aucun trajet n’est conservé.' },
      { q: 'Faut-il installer une application ?', a: 'Non. Regioo s’ouvre dans le navigateur du téléphone et s’ajoute à l’écran d’accueil.' },
      { q: 'Que deviennent mes données si j’arrête ?', a: 'La consultation et l’export de vos données restent ouverts. C’est votre travail.' },
      { q: 'À quels métiers Regioo s’adresse-t-il ?', a: 'Aux entreprises d’installation et d’intervention : fibre optique, électricité, plomberie, chauffage, maintenance.' },
    ],
  },
  closing: { title: 'Essayez Regioo avec votre équipe.', back: 'Retour à l’accueil' },
  more: 'Découvrir Regioo',
};

export type RegiooCopy = typeof fr;

const en: RegiooCopy = {
  meta: {
    title: 'Regioo · Field service management software | Vectra',
    description:
      'Regioo follows every job from the technician’s departure to photo proof, and notifies your customers by SMS under your company’s name. CHF 45 per technician per month. 14-day trial, no credit card.',
  },
  hero: {
    kicker: 'Regioo · Field service management',
    line1: 'Know what happened at the customer’s.',
    line2: 'Without calling.',
    body: 'Regioo follows every job, from the technician’s departure to photo proof. Your customers are notified by SMS, under your company’s name.',
    cta: 'Start the free trial',
    note: '14 days, no credit card · CHF 45 per technician per month',
  },
  demo: {
    title: 'One job, from departure to proof.',
    intro: 'Click a step, or let it play.',
    office: 'What your office sees',
    customer: 'What your customer receives',
    sender: 'Your company',
    none: 'No message at this step.',
    caption: 'Illustration · sample data',
    steps: [
      { time: 'Day before', label: 'Reminder sent', status: 'Planned', sms: 'Reminder: our technician comes tomorrow at 08:00.' },
      { time: '07:42', label: 'Technician leaves', status: 'On the way', sms: 'Your technician is on the way.' },
      { time: '08:03', label: 'Work starts', status: 'On site', sms: '' },
      { time: '08:51', label: 'Photo proof', status: 'Proof received', sms: '' },
      { time: '08:54', label: 'Job validated', status: 'Done', sms: 'Job completed. Thank you for your trust.' },
    ],
  },
  features: {
    title: 'What Regioo does for you.',
    items: [
      { title: 'Proof, not promises', text: 'Timestamped, geolocated photos taken on site. A job cannot be validated while the required proof is missing.' },
      { title: 'Customers notified, under your name', text: 'Reminder the day before, technician’s departure, result. The SMS shows your company’s name, and you see which ones arrived.' },
      { title: 'A dashboard that says what to do', text: 'Trips started without arrival, refusals without a new date, jobs without a technician. Every number opens the matching list.' },
      { title: 'A PDF report in one tap', text: 'The job, how it went, the recorded positions and the photos. To forward or hand to the customer, from the technician’s phone.' },
      { title: 'Reschedule without losing history', text: 'The same job, with everything that happened. You can show how many times you went.' },
      { title: 'On the phone, nothing to install', text: 'Your technicians open Regioo in the browser and add it to their home screen.' },
    ],
  },
  privacy: {
    title: 'A tool to run the work, not to watch people.',
    body: 'Regioo records the technician’s position at three moments only: at departure, when work starts and when it ends.',
    points: ['Nothing is recorded outside a job', 'No route is kept', 'Each company sees only its own data'],
  },
  price: {
    title: 'One price. Per technician.',
    intro: 'Excluding VAT. No minimum term.',
    terms: ['14-day trial, no credit card', 'Cancel for the end of any month', 'If you leave, exporting your data stays open'],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'How much does Regioo cost?', a: 'CHF 45 per technician per month, excluding VAT. There is no minimum term: you can cancel for the end of any month.' },
      { q: 'Can I try Regioo for free?', a: 'Yes. The trial lasts 14 days and needs no credit card.' },
      { q: 'Does Regioo track my technicians continuously?', a: 'No. The position is recorded at three moments only: at departure, when work starts and when it ends. Nothing is recorded outside a job and no route is kept.' },
      { q: 'Do we need to install an app?', a: 'No. Regioo opens in the phone’s browser and is added to the home screen.' },
      { q: 'What happens to my data if I stop?', a: 'Viewing and exporting your data stay open. It is your work.' },
      { q: 'Which trades is Regioo for?', a: 'Installation and field-service companies: fibre optics, electrical, plumbing, heating, maintenance.' },
    ],
  },
  closing: { title: 'Try Regioo with your team.', back: 'Back to home' },
  more: 'Discover Regioo',
};

/** Swiss High German (no ß). A first draft: have a native speaker review it. */
const de: RegiooCopy = {
  meta: {
    title: 'Regioo · Software für die Einsatzverwaltung | Vectra',
    description:
      'Regioo begleitet jeden Einsatz von der Abfahrt des Technikers bis zum Fotobeweis und informiert Ihre Kunden per SMS im Namen Ihres Unternehmens. CHF 45 pro Techniker und Monat. 14 Tage testen, ohne Kreditkarte.',
  },
  hero: {
    kicker: 'Regioo · Einsatzverwaltung',
    line1: 'Wissen, was beim Kunden passiert ist.',
    line2: 'Ohne anzurufen.',
    body: 'Regioo begleitet jeden Einsatz, von der Abfahrt des Technikers bis zum Fotobeweis. Ihre Kunden werden per SMS informiert, im Namen Ihres Unternehmens.',
    cta: 'Kostenlos testen',
    note: '14 Tage, ohne Kreditkarte · CHF 45 pro Techniker und Monat',
  },
  demo: {
    title: 'Ein Einsatz, von der Abfahrt bis zum Beweis.',
    intro: 'Klicken Sie auf einen Schritt oder lassen Sie es laufen.',
    office: 'Was Ihr Büro sieht',
    customer: 'Was Ihr Kunde erhält',
    sender: 'Ihr Unternehmen',
    none: 'Keine Nachricht bei diesem Schritt.',
    caption: 'Illustration · Beispieldaten',
    steps: [
      { time: 'Am Vortag', label: 'Erinnerung gesendet', status: 'Geplant', sms: 'Erinnerung: Unser Techniker kommt morgen um 08:00.' },
      { time: '07:42', label: 'Abfahrt des Technikers', status: 'Unterwegs', sms: 'Ihr Techniker ist unterwegs.' },
      { time: '08:03', label: 'Arbeitsbeginn', status: 'Vor Ort', sms: '' },
      { time: '08:51', label: 'Fotobeweis', status: 'Beweis erhalten', sms: '' },
      { time: '08:54', label: 'Einsatz bestätigt', status: 'Erledigt', sms: 'Einsatz abgeschlossen. Danke für Ihr Vertrauen.' },
    ],
  },
  features: {
    title: 'Was Regioo für Sie tut.',
    items: [
      { title: 'Beweise statt Versprechen', text: 'Fotos mit Zeitstempel und Standort, vor Ort aufgenommen. Ein Einsatz lässt sich nicht bestätigen, solange der verlangte Beweis fehlt.' },
      { title: 'Kunden informiert, in Ihrem Namen', text: 'Erinnerung am Vortag, Abfahrt des Technikers, Ergebnis. Die SMS zeigt den Namen Ihres Unternehmens, und Sie sehen, welche angekommen sind.' },
      { title: 'Ein Dashboard, das sagt, was zu tun ist', text: 'Fahrten ohne Ankunft, Absagen ohne neuen Termin, Einsätze ohne Techniker. Jede Zahl öffnet die passende Liste.' },
      { title: 'Ein PDF-Bericht mit einem Tipp', text: 'Der Einsatz, der Ablauf, die erfassten Standorte und die Fotos. Zum Weiterleiten oder für den Kunden, vom Handy des Technikers.' },
      { title: 'Neu planen, ohne den Verlauf zu verlieren', text: 'Derselbe Einsatz, mit allem, was passiert ist. Sie können zeigen, wie oft Sie vor Ort waren.' },
      { title: 'Auf dem Handy, ohne Installation', text: 'Ihre Techniker öffnen Regioo im Browser und fügen es dem Startbildschirm hinzu.' },
    ],
  },
  privacy: {
    title: 'Ein Werkzeug zur Führung, nicht zur Überwachung.',
    body: 'Regioo erfasst den Standort des Technikers nur zu drei Zeitpunkten: bei der Abfahrt, beim Arbeitsbeginn und am Ende.',
    points: ['Ausserhalb eines Einsatzes wird nichts erfasst', 'Es wird keine Route gespeichert', 'Jedes Unternehmen sieht nur die eigenen Daten'],
  },
  price: {
    title: 'Ein Preis. Pro Techniker.',
    intro: 'Exkl. MwSt. Ohne Mindestlaufzeit.',
    terms: ['14 Tage testen, ohne Kreditkarte', 'Kündbar auf Ende jedes Monats', 'Wenn Sie gehen, bleibt der Export Ihrer Daten offen'],
  },
  faq: {
    title: 'Häufige Fragen',
    items: [
      { q: 'Was kostet Regioo?', a: 'CHF 45 pro Techniker und Monat, exkl. MwSt. Es gibt keine Mindestlaufzeit: Das Abonnement ist auf Ende jedes Monats kündbar.' },
      { q: 'Kann ich Regioo kostenlos testen?', a: 'Ja. Der Test dauert 14 Tage und verlangt keine Kreditkarte.' },
      { q: 'Verfolgt Regioo meine Techniker laufend?', a: 'Nein. Der Standort wird nur zu drei Zeitpunkten erfasst: bei der Abfahrt, beim Arbeitsbeginn und am Ende. Ausserhalb eines Einsatzes wird nichts erfasst und keine Route gespeichert.' },
      { q: 'Müssen wir eine App installieren?', a: 'Nein. Regioo öffnet sich im Browser des Handys und wird dem Startbildschirm hinzugefügt.' },
      { q: 'Was passiert mit meinen Daten, wenn ich aufhöre?', a: 'Einsicht und Export Ihrer Daten bleiben offen. Es ist Ihre Arbeit.' },
      { q: 'Für welche Branchen ist Regioo gedacht?', a: 'Für Installations- und Serviceunternehmen: Glasfaser, Elektro, Sanitär, Heizung, Wartung.' },
    ],
  },
  closing: { title: 'Testen Sie Regioo mit Ihrem Team.', back: 'Zurück zur Startseite' },
  more: 'Regioo entdecken',
};

const COPIES: Record<string, RegiooCopy> = { fr, en, de };

export function getRegiooCopy(locale: string): RegiooCopy {
  return COPIES[locale] ?? fr;
}
