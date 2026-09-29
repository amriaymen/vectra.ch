/*
 * Copy for the Spotbase product page, in three languages.
 *
 * Features come from Spotbase's own product overview and from the screens that
 * exist in its code (calendar, public booking, broadcast generator, sessions,
 * tournaments, referee, TV, finance). Two things are deliberately NOT claimed:
 *  - online payment: Spotbase records payments as collected or unpaid, and its
 *    code contains no payment provider;
 *  - a price: none is published for Switzerland.
 */

const fr = {
  meta: {
    title: 'Spotbase · Logiciel de réservation pour centres sportifs et clubs | Vectra',
    description:
      'Spotbase réunit les réservations de tous vos terrains dans un seul calendrier, sans double réservation. Portail de réservation pour vos joueurs, tournois avec scores en direct, suivi des paiements. Démonstration sur demande.',
  },
  hero: {
    kicker: 'Spotbase · Centres sportifs et clubs',
    line1: 'Tous vos terrains.',
    line2: 'Un seul calendrier.',
    body: 'Padel, tennis, football, basket : Spotbase réunit vos réservations, vos cours et vos tournois au même endroit. Vos joueurs réservent depuis leur téléphone.',
    cta: 'Demander une démo',
    note: 'Réponse par e-mail · Prix sur demande',
  },
  demo: {
    title: 'Essayez : réservez un créneau.',
    intro: 'Cliquez sur un créneau libre. Le message pour vos joueurs se met à jour tout seul.',
    calendar: 'Votre calendrier',
    message: 'Le message prêt à partager',
    free: 'Libre',
    taken: 'Réservé',
    yours: 'Votre réservation',
    blocked: 'Ce créneau est déjà pris. Spotbase refuse la double réservation.',
    hint: 'Cliquez sur un créneau libre pour le réserver.',
    greeting: 'Créneaux disponibles ce soir :',
    full: 'complet',
    closing: 'Réservez en ligne.',
    caption: 'Illustration · données fictives',
    courts: ['Padel 1', 'Padel 2', 'Tennis'],
  },
  features: {
    title: 'Ce que Spotbase fait pour vous.',
    items: [
      { title: 'Zéro double réservation', text: 'Un calendrier pour tous vos terrains et tous vos sports. Spotbase détecte les conflits au moment où vous réservez.' },
      { title: 'Vos joueurs réservent seuls', text: 'Un portail de réservation à vos couleurs, pensé pour le téléphone, accessible par un lien ou un QR code.' },
      { title: 'Des créneaux libres vite remplis', text: 'Spotbase repère vos créneaux libres et rédige le message à partager dans vos groupes WhatsApp.' },
      { title: 'Des tournois comme les pros', text: 'Poules, élimination directe, Americano, Mexicano. L’arbitre saisit les scores sur son téléphone et le classement suit en direct.' },
      { title: 'Un écran pour votre club-house', text: 'Matchs en cours, programme et annonces du club, affichés sur la télévision de votre espace d’accueil.' },
      { title: 'Savoir ce qui est encaissé', text: 'Chaque réservation est marquée encaissée ou impayée. Les réservations récurrentes se renouvellent sans ressaisie.' },
    ],
  },
  people: {
    title: 'Un outil, trois publics.',
    items: [
      { who: 'Pour vous', text: 'Des terrains mieux remplis et une vue claire de ce qui est encaissé.' },
      { who: 'Pour votre équipe', text: 'Moins de téléphone, moins de ressaisie, des tournois sans erreur.' },
      { who: 'Pour vos joueurs', text: 'Réserver à toute heure et suivre les scores en direct.' },
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Combien coûte Spotbase ?', a: 'Le prix est donné sur demande, après une démonstration. Nous vous l’envoyons par écrit.' },
      { q: 'Quels sports Spotbase gère-t-il ?', a: 'Padel, tennis, football à 5, 7 ou 11, basket, et d’autres sports sur terrain.' },
      { q: 'Mes joueurs doivent-ils installer une application ?', a: 'Non. Le portail de réservation s’ouvre dans le navigateur du téléphone, par un lien ou un QR code.' },
      { q: 'Peut-on payer en ligne ?', a: 'Spotbase suit vos paiements : chaque réservation est marquée encaissée ou impayée. Le paiement en ligne n’est pas inclus aujourd’hui.' },
      { q: 'En quelles langues Spotbase existe-t-il ?', a: 'En français et en anglais.' },
    ],
  },
  closing: { title: 'Voyons Spotbase avec vos terrains.', body: 'Laissez vos coordonnées. Nous vous répondons par e-mail pour fixer une démonstration.', back: 'Retour à l’accueil' },
  more: 'Découvrir Spotbase',
};

export type SpotbaseCopy = typeof fr;

const en: SpotbaseCopy = {
  meta: {
    title: 'Spotbase · Booking software for sports centres and clubs | Vectra',
    description:
      'Spotbase brings the bookings of all your courts into one calendar, with no double booking. Booking portal for your players, tournaments with live scores, payment tracking. Demo on request.',
  },
  hero: {
    kicker: 'Spotbase · Sports centres and clubs',
    line1: 'All your courts.',
    line2: 'One calendar.',
    body: 'Padel, tennis, football, basketball: Spotbase brings your bookings, classes and tournaments into one place. Your players book from their phone.',
    cta: 'Request a demo',
    note: 'We reply by email · Price on request',
  },
  demo: {
    title: 'Try it: book a slot.',
    intro: 'Click a free slot. The message for your players updates by itself.',
    calendar: 'Your calendar',
    message: 'The message, ready to share',
    free: 'Free',
    taken: 'Booked',
    yours: 'Your booking',
    blocked: 'This slot is already taken. Spotbase refuses double bookings.',
    hint: 'Click a free slot to book it.',
    greeting: 'Slots available tonight:',
    full: 'full',
    closing: 'Book online.',
    caption: 'Illustration · sample data',
    courts: ['Padel 1', 'Padel 2', 'Tennis'],
  },
  features: {
    title: 'What Spotbase does for you.',
    items: [
      { title: 'No double booking', text: 'One calendar for all your courts and all your sports. Spotbase detects conflicts at the moment you book.' },
      { title: 'Your players book by themselves', text: 'A booking portal in your colours, made for the phone, reached by a link or a QR code.' },
      { title: 'Free slots filled fast', text: 'Spotbase finds your free slots and writes the message to share in your WhatsApp groups.' },
      { title: 'Tournaments like the pros', text: 'Groups, knockout, Americano, Mexicano. The referee enters scores on a phone and the standings follow live.' },
      { title: 'A screen for your clubhouse', text: 'Matches in progress, schedule and club announcements, shown on the television in your lounge.' },
      { title: 'Know what has been collected', text: 'Every booking is marked collected or unpaid. Recurring bookings renew without retyping.' },
    ],
  },
  people: {
    title: 'One tool, three audiences.',
    items: [
      { who: 'For you', text: 'Fuller courts and a clear view of what has been collected.' },
      { who: 'For your team', text: 'Less phone, less retyping, tournaments without mistakes.' },
      { who: 'For your players', text: 'Book at any hour and follow scores live.' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'How much does Spotbase cost?', a: 'The price is given on request, after a demo. We send it to you in writing.' },
      { q: 'Which sports does Spotbase handle?', a: 'Padel, tennis, 5, 7 or 11-a-side football, basketball, and other court and pitch sports.' },
      { q: 'Do my players need to install an app?', a: 'No. The booking portal opens in the phone’s browser, through a link or a QR code.' },
      { q: 'Can players pay online?', a: 'Spotbase tracks your payments: every booking is marked collected or unpaid. Online payment is not included today.' },
      { q: 'Which languages is Spotbase available in?', a: 'French and English.' },
    ],
  },
  closing: { title: 'Let’s look at Spotbase with your courts.', body: 'Leave your details. We reply by email to arrange a demo.', back: 'Back to home' },
  more: 'Discover Spotbase',
};

/** Swiss High German (no ß). A first draft: have a native speaker review it. */
const de: SpotbaseCopy = {
  meta: {
    title: 'Spotbase · Buchungssoftware für Sportzentren und Clubs | Vectra',
    description:
      'Spotbase vereint die Buchungen all Ihrer Plätze in einem Kalender, ohne Doppelbuchung. Buchungsportal für Ihre Spieler, Turniere mit Live-Resultaten, Zahlungsübersicht. Demo auf Anfrage.',
  },
  hero: {
    kicker: 'Spotbase · Sportzentren und Clubs',
    line1: 'Alle Ihre Plätze.',
    line2: 'Ein einziger Kalender.',
    body: 'Padel, Tennis, Fussball, Basketball: Spotbase vereint Buchungen, Kurse und Turniere an einem Ort. Ihre Spieler buchen vom Handy aus.',
    cta: 'Demo anfragen',
    note: 'Antwort per E-Mail · Preis auf Anfrage',
  },
  demo: {
    title: 'Probieren Sie es: Buchen Sie einen Platz.',
    intro: 'Klicken Sie auf eine freie Zeit. Die Nachricht für Ihre Spieler passt sich von selbst an.',
    calendar: 'Ihr Kalender',
    message: 'Die Nachricht, bereit zum Teilen',
    free: 'Frei',
    taken: 'Gebucht',
    yours: 'Ihre Buchung',
    blocked: 'Diese Zeit ist bereits vergeben. Spotbase lässt keine Doppelbuchung zu.',
    hint: 'Klicken Sie auf eine freie Zeit, um sie zu buchen.',
    greeting: 'Heute Abend noch frei:',
    full: 'ausgebucht',
    closing: 'Online buchen.',
    caption: 'Illustration · Beispieldaten',
    courts: ['Padel 1', 'Padel 2', 'Tennis'],
  },
  features: {
    title: 'Was Spotbase für Sie tut.',
    items: [
      { title: 'Keine Doppelbuchung', text: 'Ein Kalender für alle Plätze und alle Sportarten. Spotbase erkennt Konflikte im Moment der Buchung.' },
      { title: 'Ihre Spieler buchen selbst', text: 'Ein Buchungsportal in Ihren Farben, fürs Handy gemacht, erreichbar über einen Link oder QR-Code.' },
      { title: 'Freie Zeiten schnell gefüllt', text: 'Spotbase findet Ihre freien Zeiten und schreibt die Nachricht für Ihre WhatsApp-Gruppen.' },
      { title: 'Turniere wie bei den Profis', text: 'Gruppen, K.-o.-System, Americano, Mexicano. Der Schiedsrichter erfasst die Resultate am Handy, die Rangliste folgt live.' },
      { title: 'Ein Bildschirm fürs Clubhaus', text: 'Laufende Spiele, Programm und Mitteilungen des Clubs, auf dem Fernseher in Ihrem Empfangsbereich.' },
      { title: 'Wissen, was bezahlt ist', text: 'Jede Buchung ist als bezahlt oder offen markiert. Wiederkehrende Buchungen erneuern sich ohne erneute Eingabe.' },
    ],
  },
  people: {
    title: 'Ein Werkzeug, drei Zielgruppen.',
    items: [
      { who: 'Für Sie', text: 'Besser ausgelastete Plätze und ein klarer Blick auf das, was bezahlt ist.' },
      { who: 'Für Ihr Team', text: 'Weniger Telefon, weniger Abtippen, Turniere ohne Fehler.' },
      { who: 'Für Ihre Spieler', text: 'Jederzeit buchen und Resultate live verfolgen.' },
    ],
  },
  faq: {
    title: 'Häufige Fragen',
    items: [
      { q: 'Was kostet Spotbase?', a: 'Den Preis erhalten Sie auf Anfrage, nach einer Demo. Wir senden ihn Ihnen schriftlich.' },
      { q: 'Welche Sportarten deckt Spotbase ab?', a: 'Padel, Tennis, Fussball zu 5, 7 oder 11, Basketball und weitere Platzsportarten.' },
      { q: 'Müssen meine Spieler eine App installieren?', a: 'Nein. Das Buchungsportal öffnet sich im Browser des Handys, über einen Link oder QR-Code.' },
      { q: 'Kann man online bezahlen?', a: 'Spotbase führt Ihre Zahlungen nach: Jede Buchung ist als bezahlt oder offen markiert. Online-Zahlung ist heute nicht enthalten.' },
      { q: 'In welchen Sprachen gibt es Spotbase?', a: 'Auf Französisch und Englisch.' },
    ],
  },
  closing: { title: 'Schauen wir Spotbase mit Ihren Plätzen an.', body: 'Hinterlassen Sie Ihre Angaben. Wir antworten per E-Mail, um eine Demo zu vereinbaren.', back: 'Zurück zur Startseite' },
  more: 'Spotbase entdecken',
};

const COPIES: Record<string, SpotbaseCopy> = { fr, en, de };

export function getSpotbaseCopy(locale: string): SpotbaseCopy {
  return COPIES[locale] ?? fr;
}
