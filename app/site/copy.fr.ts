/*
 * All visible French copy for the new homepage, in one place so it can move to
 * the three dictionaries later. Every price and term here is taken from a
 * source: Regioo's own landing page (CHF 45 per technician, 14-day trial, no
 * card), app/data/config.ts (project floor, subscription prices) and the plan
 * definitions the owner approved on 2026-09-29.
 */

/** Confirmed by the owner on 2026-09-29. */
export type Kind = 'trial' | 'demo' | 'estimate';

export const REGIOO_SIGNUP_URL = 'https://regioo.vercel.app/inscription';
export const REGIOO_PRICE_PER_TECHNICIAN = 45;

const fr = {
  meta: {
    title: 'Logiciels de gestion pour entreprises en Suisse romande | Vectra',
    description:
      'Remplacez Excel, le papier et WhatsApp par un seul système. Regioo pour les équipes de terrain (CHF 45 par technicien et par mois), Spotbase pour les centres sportifs, Raqim pour les écoles, ou un logiciel sur mesure dès CHF 10’000.',
    regioo: 'Gestion des interventions, des techniciens, des clients et des plannings pour les entreprises de terrain.',
    regiooOffer: 'Par technicien et par mois. Essai de 14 jours, sans carte bancaire.',
    area: 'Suisse romande',
    navLabel: 'Navigation',
    language: 'Langue',
  },

  nav: {
    links: [
      { href: '#metier', label: 'Logiciels' },
      { href: '#sur-mesure', label: 'Sur mesure' },
      { href: '#design', label: 'Design' },
      { href: '#questions', label: 'Questions' },
    ],
    cta: 'Trouver mon logiciel',
  },

  hero: {
    kicker: 'Logiciels de gestion · Suisse romande',
    line1: 'Tout votre travail.',
    line2: 'Un seul système.',
    body: 'Fini Excel, le papier, WhatsApp et les appels. Choisissez le logiciel fait pour votre métier et commencez aujourd’hui.',
    primary: 'Trouver mon logiciel',
    note: 'Une question, une réponse, un prix.',
  },

  trades: [
    'Plombiers',
    'Électriciens',
    'Installateurs fibre',
    'Chauffagistes',
    'Centres sportifs',
    'Clubs de padel',
    'Écoles',
    'Entreprises de maintenance',
  ],

  chaos: {
    before: 'Aujourd’hui, votre travail est partout.',
    after: 'Demain, il est au même endroit.',
    hint: 'Faites défiler',
    chips: [
      'planning_final_v3.xlsx',
      'WhatsApp · 47 non lus',
      'Bon d’intervention (papier)',
      '3 appels manqués',
      'Post-it : rappeler le client',
      'Facture à refaire',
      'E-mail sans réponse',
      'Qui a la dernière version ?',
    ],
    windowTitle: 'Votre système',
    rows: ['Planning de la semaine', 'Interventions du jour', 'Clients et historique', 'Factures et paiements'],
    done: 'À jour',
  },

  picker: {
    title: 'Quel est votre métier ?',
    intro: 'Choisissez. Nous vous montrons le logiciel, le prix et comment commencer.',
    options: [
      {
        id: 'regioo',
        tab: 'Équipes sur le terrain',
        tag: 'Plomberie, électricité, fibre, chauffage, maintenance',
        name: 'Regioo',
        line: 'La gestion terrain, simplement.',
        points: [
          'Interventions planifiées et suivies',
          'Une application pour vos techniciens, sur leur téléphone',
          'Clients et plannings au même endroit',
        ],
        price: 'CHF 45',
        priceNote: 'par technicien et par mois',
        cta: 'Commencer l’essai gratuit',
        ctaNote: '14 jours, sans carte bancaire',
        kind: 'trial' as Kind,
        screen: [
          ['08:00', 'Raccordement fibre · Bulle', 'En route'],
          ['10:30', 'Dépannage chauffage · Fribourg', 'Planifié'],
          ['14:00', 'Contrôle électrique · Vevey', 'Planifié'],
          ['16:15', 'Pose compteur · Romont', 'Terminé'],
        ],
      },
      {
        id: 'spotbase',
        tab: 'Centre sportif ou club',
        tag: 'Padel, tennis, football, basket',
        name: 'Spotbase',
        line: 'Vos terrains, vos réservations, vos tournois.',
        points: [
          'Un calendrier pour tous vos terrains',
          'Vos joueurs réservent depuis leur téléphone',
          'Tournois avec scores en direct',
        ],
        price: 'Sur demande',
        priceNote: 'selon le nombre de terrains',
        cta: 'Demander une démo',
        ctaNote: 'Réponse par e-mail',
        kind: 'demo' as Kind,
        screen: [
          ['17:00', 'Padel 1 · Réservation', 'Encaissé'],
          ['18:00', 'Padel 2 · Cours collectif', '8 / 12'],
          ['19:00', 'Tennis · Tournoi du club', 'En direct'],
          ['20:00', 'Football 5 · Réservation', 'Impayé'],
        ],
      },
      {
        id: 'raqim',
        tab: 'École ou jardin d’enfants',
        tag: 'Écoles privées, crèches, associations',
        name: 'Raqim',
        line: 'Inscrire, encaisser, organiser, informer.',
        points: ['Inscriptions en ligne, sans rien recopier', 'Frais de scolarité, reçus et caisse', 'Emplois du temps, présences et paie'],
        // Rendered from raqimPrice(): "Sur demande" until the Swiss price is set.
        price: '',
        priceNote: 'prix fixe par an, selon la taille de l’école',
        cta: 'Demander une démo',
        ctaNote: 'Essai gratuit de 15 jours',
        kind: 'demo' as Kind,
        screen: [
          ['7B', 'Présences du matin', 'Saisies'],
          ['Caisse', 'Reçu n° 128 · Tranche 1', 'Encaissé'],
          ['5A', 'Emploi du temps · Lundi', 'À jour'],
          ['RH', 'Paie de septembre', 'Prête'],
        ],
      },
      {
        id: 'custom',
        tab: 'Un autre métier',
        tag: 'Votre façon de travailler est unique',
        name: 'Sur mesure',
        line: 'Nous développons le logiciel qui vous manque.',
        points: [
          'Prix fixe, connu avant de commencer',
          'Livré étape par étape',
          'Le code vous appartient',
        ],
        price: 'Dès CHF 10’000',
        priceNote: 'prix fixe par étape',
        cta: 'Estimer mon projet',
        ctaNote: 'Cinq questions, une minute environ',
        kind: 'estimate' as Kind,
        screen: [
          ['01', 'Cadrage et prix', 'Écrit'],
          ['02', 'Premier module', 'Livré'],
          ['03', 'Mise en service', 'Formé'],
          ['04', 'Le code', 'À vous'],
        ],
      },
    ],
  },

  calc: {
    title: 'Combien coûte Regioo ?',
    intro: 'Un prix par technicien. Rien d’autre.',
    label: 'Nombre de techniciens',
    perMonth: 'par mois',
    detail: 'CHF 45 par technicien et par mois.',
    cta: 'Commencer l’essai gratuit',
    note: '14 jours, sans carte bancaire.',
  },

  steps: {
    title: 'Trois étapes. Pas de réunion.',
    items: [
      { n: '1', title: 'Choisissez', text: 'Le logiciel fait pour votre métier.' },
      { n: '2', title: 'Essayez', text: 'Avec votre équipe et vos vrais cas.' },
      { n: '3', title: 'Travaillez', text: 'Tout le monde au même endroit.' },
    ],
  },

  custom: {
    kicker: 'Sur mesure',
    title: 'Votre métier n’a pas encore son logiciel ?',
    body: 'Nous le développons. Vous connaissez le prix avant de commencer, vous recevez le travail étape par étape, et le code est à vous.',
    price: 'Dès CHF 10’000',
    cta: 'Estimer mon projet',
    note: 'Cinq questions, une minute environ. Sans appel.',
    facts: ['Prix fixe par étape', 'Arrêt possible entre deux étapes', 'Code et fichiers à vous'],
  },

  design: {
    kicker: 'Design sur abonnement',
    title: 'Un designer dans votre équipe, sans l’embaucher.',
    body: 'Un prix par mois. Vous envoyez vos demandes, nous livrons. Vous suspendez ou arrêtez quand vous voulez.',
    perMonth: '/mois',
    recommended: 'Le plus complet pour la plupart',
    cta: 'Choisir cette formule',
    plans: [
      {
        id: 'design',
        name: 'Design',
        price: 'CHF 1’500',
        points: ['Interfaces web et mobile', 'Identité de marque', 'Une demande à la fois'],
      },
      {
        id: 'build',
        name: 'Build',
        price: 'CHF 1’800',
        points: ['Tout ce qui est dans Design', 'Motion design et vidéo explicative', 'Une demande à la fois'],
      },
      {
        id: 'scale',
        name: 'Scale',
        price: 'CHF 2’400',
        points: ['Tout ce qui est dans Build', 'Intégration des maquettes dans votre site', 'Deux demandes en parallèle'],
      },
    ],
  },

  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Puis-je essayer avant de payer ?',
        a: 'Oui. Regioo s’essaie 14 jours sans carte bancaire, Raqim 15 jours. Pour Spotbase, nous vous montrons le logiciel en démonstration.',
      },
      {
        q: 'Et si aucun logiciel ne correspond à mon métier ?',
        a: 'Nous le développons sur mesure, dès CHF 10’000. Vous recevez le périmètre et le prix par écrit avant de commencer.',
      },
      {
        q: 'Où sont hébergées nos données ?',
        a: 'Les systèmes que nous développons pour vous sont hébergés en Suisse, chez Infomaniak à Genève. Ce site web, lui, est hébergé chez Vercel.',
      },
      {
        q: 'À qui appartient le code d’un projet sur mesure ?',
        a: 'À vous. Vous recevez le code source, les schémas de base de données et les fichiers de design.',
      },
      {
        q: 'Puis-je arrêter l’abonnement design ?',
        a: 'Oui. Vous pouvez le suspendre ou le résilier à tout moment.',
      },
    ],
  },

  contact: {
    title: 'Dites-nous ce qui vous ralentit.',
    body: 'Nous vous répondons par e-mail.',
    name: 'Votre nom',
    email: 'Votre e-mail',
    company: 'Votre entreprise',
    interest: 'Ce qui vous intéresse',
    interests: ['Regioo', 'Spotbase', 'Raqim', 'Un logiciel sur mesure', 'Le design sur abonnement', 'Je ne sais pas encore'],
    notes: 'Votre message (facultatif)',
    send: 'Envoyer',
    sending: 'Envoi…',
    success: 'Merci. Votre message est bien parti, nous vous répondons par e-mail.',
    error: 'L’envoi n’a pas fonctionné. Réessayez, ou écrivez-nous directement à',
    required: 'Indiquez votre nom et votre e-mail.',
    disclosure: 'Votre message est envoyé par e-mail via un prestataire situé hors de Suisse.',
    privacy: 'Politique de confidentialité',
  },

  footer: {
    title: 'Tout votre travail. Un seul système.',
    explore: 'Explorer',
    contact: 'Contact',
    legal: 'Informations légales',
    group: 'Vectra est le département logiciels et produits numériques de',
    terms: 'Conditions',
    privacy: 'Confidentialité',
    impressum: 'Mentions légales',
    rights: 'Vectra — studio suisse de logiciel et de design.',
    top: 'Retour en haut',
    country: 'Suisse',
  },
};

export type Copy = typeof fr;
export default fr;
