import type { Dictionary } from './content.en';
import { SWISS_ENTITY } from './config';

/** Voir content.en.ts — la mention d'origine suisse est conditionnée à l'entité. */
const origine = {
  descriptionOpener: SWISS_ENTITY
    ? 'Studio suisse de logiciel et de design.'
    : 'Studio de logiciel et de design pour les organisations suisses.',
  kicker: SWISS_ENTITY
    ? 'Studio logiciel et design · Suisse'
    : 'Studio logiciel et design · Pour la Suisse',
  rights: SWISS_ENTITY
    ? 'Vectra — studio suisse de logiciel et de design.'
    : 'Vectra — logiciel et design pour les organisations suisses.',
};

/**
 * Swiss French (fr-CH).
 *
 * ACTION REQUIRED — this is a careful first draft, not a reviewed translation.
 * Have a native reviewer pass over it before publishing.
 */
const fr: Dictionary = {
  meta: {
    title: 'Vectra | Produits SaaS, développement à la demande et abonnement design',
    description: `${origine.descriptionOpener} Trois départements : nos propres produits SaaS, le développement à la demande à prix fixe par jalon, et un abonnement design qui inclut le motion design.`,
    keywords: [
      'produits SaaS Suisse',
      'développement logiciel à la demande',
      'développement application web Suisse',
      'abonnement design',
      'abonnement motion design',
      'vidéo explicative',
      'Vectra',
    ],
    ogAlt: 'Vectra — produits SaaS, développement à la demande et abonnement design',
  },

  nav: {
    departments: { saas: 'Produits', development: 'Développement', design: 'Design' },
    cta: 'Réserver un appel',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menuTitle: 'Navigation du site',
    language: 'Langue',
    home: 'Vectra — accueil',
  },

  common: {
    onRequest: 'Sur demande',
    from: 'Dès',
    perMonth: '/mois',
    perYear: '/an',
    faqsTitle: 'Questions fréquentes',
  },

  hero: {
    kicker: origine.kicker,
    titleLine1: 'Logiciel, développement et design.',
    titleLine2: 'Un studio, trois départements.',
    body: 'Utilisez l’un de nos produits SaaS sous licence, faites développer un logiciel autour de votre fonctionnement, ou abonnez-vous à une équipe de design qui fait aussi du motion.',
    primaryCta: 'Réserver un appel de 30 min',
    secondaryCta: 'Voir les trois départements',
  },

  departments: {
    title: 'Trois façons de travailler avec nous',
    intro: 'Chaque département a sa page, son modèle de prix et sa porte d’entrée.',
    licenceOnRequest: 'Licence sur demande',
    items: {
      saas: {
        name: 'Produits SaaS',
        summary:
          'Des logiciels que nous avons développés et que nous exploitons nous-mêmes, pour les écoles, les installations sportives et les employeurs.',
        points: [
          'Spotbase — réservation d’installations et paiement',
          'Schoolze et Raqim — administration scolaire',
          'SB Pointage — pointage et paie',
        ],
        cta: 'Voir les produits',
      },
      development: {
        name: 'Développement à la demande',
        summary:
          'Applications web et systèmes de gestion sur mesure, cadrés par écrit et chiffrés par jalon avant le démarrage.',
        points: [
          'Applications web et systèmes de gestion',
          'Intégrations et reprise de données',
          'Le code vous appartient dès le premier jour',
        ],
        cta: 'Cadrer un projet',
      },
      design: {
        name: 'Abonnement design',
        summary:
          'Une équipe de design senior sur abonnement mensuel : design produit, identité de marque et motion design.',
        points: [
          'Design UI/UX et design produit',
          'Identité de marque et design systems',
          'Motion design et vidéo explicative',
        ],
        cta: 'Voir les formules',
      },
    },
  },

  work: {
    title: 'Des logiciels déjà en production',
    intro:
      'Quatre produits que nous avons développés et que nous exploitons nous-mêmes. Ils sont la preuve derrière les deux autres départements.',
  },

  products: {
    forWhoLabel: 'Conçu pour',
    modulesLabel: 'Ce qu’il fait',
    stackLabel: 'Technologies',
    statusAvailable: 'Disponible',
    statusRunning: 'En production',
    demoCta: 'Réserver une démo',
    adaptCta: 'Nous interroger sur ce système',
    domains: {
      education: 'Éducation',
      sports: 'Sport et loisirs',
      hr: 'RH et paie',
    },
    /*
     * Ce sont nos propres produits : chaque entrée décrit le LOGICIEL — à qui il
     * s'adresse et ce qu'il fait. Elle ne doit jamais décrire la situation d'un
     * client précis : un récit inventé constitue une preuve sociale fabriquée.
     */
    items: {
      spotbase: {
        tagline: 'Gestion et réservation d’installations sportives',
        forWho: 'Centres sportifs, clubs et communes gérant des installations réservables.',
        summary:
          'Calendriers de ressources, réservations en ligne, abonnements et paiement dans un seul système : la réservation et l’argent qui s’y rattache forment un seul enregistrement.',
        modules: ['Calendrier des ressources', 'Réservation en ligne', 'Abonnements', 'Paiements', 'Rapports d’utilisation'],
      },
      schoolze: {
        tagline: 'Portail de gestion scolaire',
        forWho: 'Écoles primaires et secondaires, et groupes scolaires répartis sur plusieurs sites.',
        summary:
          'Inscriptions, présences, notes, communication avec les parents et facturation dans un seul portail, avec des accès par rôle pour l’administration, le corps enseignant et les parents.',
        modules: ['Inscriptions et dossiers', 'Présences', 'Notes et bulletins', 'Portail parents', 'Facturation'],
      },
      'sb-pointage': {
        tagline: 'Pointage et paie',
        forWho: 'Employeurs avec du personnel en équipes ou à l’heure, dont les heures doivent arriver à la paie sans ressaisie.',
        summary:
          'Pointage des entrées et sorties, gestion des congés et des contrats, calcul des salaires et export vers la paie — une seule chaîne, de la pointeuse à la fiche de salaire.',
        modules: ['Pointage entrées / sorties', 'Gestion des congés', 'Calcul des salaires', 'Export paie', 'Dossiers du personnel'],
      },
      raqim: {
        tagline: 'Administration scolaire multi-sites',
        forWho: 'Groupes scolaires ayant besoin d’une vue consolidée sur plusieurs sites.',
        summary:
          'Dossiers académiques, gestion du personnel, planification et reporting sur plusieurs sites, avec des chiffres consolidés au niveau central plutôt qu’assemblés site par site.',
        modules: ['Administration multi-sites', 'Dossiers académiques', 'Gestion du personnel', 'Planification', 'Reporting consolidé'],
      },
    },
  },

  saas: {
    metaTitle: 'Produits SaaS pour écoles, installations sportives et employeurs | Vectra',
    metaDescription:
      'Spotbase, Schoolze, SB Pointage et Raqim : des logiciels développés et exploités par Vectra, hébergés en Suisse.',
    kicker: 'Département 01 · Produits SaaS',
    h1: 'Des logiciels que nous avons développés, et que nous exploitons nous-mêmes.',
    intro:
      'Quatre produits pour les écoles, les installations sportives et les employeurs. Spotbase est disponible sous licence dès aujourd’hui ; les autres sont en production et peuvent être adaptés à votre organisation.',
    licence: {
      title: 'Ce qu’une licence comprend',
      intro: 'Les licences sont chiffrées sur demande, par écrit, après une démonstration.',
      steps: [
        {
          step: '01',
          title: 'Un logiciel prêt à l’emploi',
          detail:
            'Le produit existe et fonctionne aujourd’hui. La mise en route relève du paramétrage, pas d’un projet de développement.',
        },
        {
          step: '02',
          title: 'Hébergement suisse inclus',
          detail:
            'Votre système tourne chez un prestataire suisse, sous juridiction suisse. Nous indiquons par écrit le prestataire et le centre de données.',
        },
        {
          step: '03',
          title: 'Mises à jour continues',
          detail:
            'Nous exploitons le produit nous-mêmes : les améliorations continuent d’être livrées après votre mise en service.',
        },
      ],
    },
    faqs: [
      {
        question: 'Quels produits peut-on utiliser sous licence aujourd’hui ?',
        answer:
          'Spotbase. Schoolze, SB Pointage et Raqim sont en production mais ne sont pas encore proposés sous licence : nous n’offrons donc ni démonstration ni prix pour ceux-ci pour l’instant. Si l’un d’eux correspond à votre besoin, écrivez-nous et nous vous dirons clairement ce qui est possible.',
      },
      {
        question: 'Un produit peut-il être adapté à notre organisation ?',
        answer:
          'Oui. C’est du développement à la demande : nous partons du produit et cadrons les adaptations en jalons à prix fixe, convenus par écrit avant le démarrage.',
      },
      {
        question: 'Où nos données sont-elles hébergées ?',
        answer:
          'En Suisse, chez un prestataire suisse, sous juridiction suisse — pas chez un géant américain du cloud. Nous indiquons par écrit le prestataire et le centre de données afin que votre préposé à la protection des données puisse le vérifier.',
      },
      {
        question: 'Notre système contiendrait des données d’élèves et de collaborateurs. Comment les traitez-vous ?',
        answer:
          'Les dossiers d’élèves, de personnel et de salaires sont des données personnelles sensibles : le contrôle d’accès relève donc de l’architecture et non d’une étape ultérieure — permissions par rôle, journalisation des accès, chiffrement au repos et minimisation des données par défaut. Les écoles et les communes relèvent de la loi cantonale sur la protection des données, et nous développons selon les exigences de votre canton. Pour les employeurs privés, c’est la LPD fédérale qui s’applique, et nous travaillons selon celle-ci.',
      },
    ],
  },

  development: {
    metaTitle: 'Développement logiciel à la demande, prix fixe par jalon | Vectra',
    metaDescription:
      'Applications web et systèmes de gestion sur mesure. Cadrage écrit, prix fixe par jalon, hébergement suisse, et le code vous appartient.',
    kicker: 'Département 02 · Développement à la demande',
    h1: 'Un logiciel sur mesure, cadré avant le démarrage.',
    intro:
      'Des applications web et des systèmes de gestion conçus autour du fonctionnement réel de votre organisation. Prix fixe par jalon, convenu par écrit, et le code vous appartient.',
    priceNote: 'Prix fixe par jalon. Le cadrage est gratuit.',
    cta: 'Cadrer mon projet',
    offers: {
      title: 'Ce que nous développons',
      items: [
        {
          title: 'Applications web',
          detail:
            'Des applications complètes sur Next.js, Node et PostgreSQL, pour les processus qu’aucun produit du marché ne couvre.',
        },
        {
          title: 'Systèmes de gestion',
          detail:
            'Administration scolaire, RH et paie, réservation et installations : le type de système opérationnel dont nos propres produits sont faits.',
        },
        {
          title: 'Intégrations et reprise de données',
          detail:
            'Connexions à la comptabilité, aux paiements et aux bases existantes, et reprise des données historiques, réconciliées avant la mise en service.',
        },
        {
          title: 'Maintenance et évolution',
          detail:
            'Maintenance après lancement, mises à jour de sécurité et nouvelles fonctionnalités, de mois en mois et seulement si vous le souhaitez.',
        },
      ],
    },
    process: {
      title: 'Comment se déroule un projet',
      intro: 'Trois étapes, chiffrées et planifiées avant tout démarrage.',
      steps: [
        {
          step: '01',
          title: 'Cadrage et architecture',
          detail:
            'Nous auditons le processus que vous voulez corriger et vous remettons un cadrage écrit avec les jalons, le calendrier et un prix fixe par jalon.',
        },
        {
          step: '02',
          title: 'Développement et revues',
          detail:
            'Vous travaillez directement avec les ingénieurs et les designers. Chaque jalon se termine par une revue sur une version fonctionnelle, pas par un rapport d’avancement.',
        },
        {
          step: '03',
          title: 'Reprise et montée en charge',
          detail:
            'Nous déployons, formons votre équipe et vous remettons le code et les fichiers. Le suivi continue de mois en mois seulement si vous le souhaitez.',
        },
      ],
    },
    faqs: [
      {
        question: 'Comment vos tarifs sont-ils structurés ?',
        answer:
          'Un prix fixe par jalon. Vous recevez le périmètre, le calendrier et le prix par écrit avant le démarrage d’un jalon, et vous pouvez vous arrêter entre deux jalons.',
      },
      {
        question: 'Quels sont les délais habituels ?',
        answer:
          'Un premier module ou un MVP prend environ 3 à 5 semaines. Une plateforme de gestion complète prend 6 à 10 semaines. Vous recevez une feuille de route datée avant le démarrage.',
      },
      {
        question: 'Sur quelles technologies développez-vous ?',
        answer:
          'Next.js, Node et PostgreSQL, hébergés en Suisse. Des choix volontairement courants : vous devez pouvoir engager quelqu’un d’autre qui les maîtrise.',
      },
      {
        question: 'Pouvez-vous vous intégrer aux systèmes que nous utilisons déjà ?',
        answer:
          'Oui. Nous développons des intégrations vers les logiciels comptables, les prestataires de paiement et les bases de données existantes, y compris des systèmes sur site qui n’exposent qu’une connexion à la base, et nous reprenons vos données historiques.',
      },
      {
        question: 'Le code source et les fichiers de design nous appartiennent-ils ?',
        answer:
          'Oui, entièrement. À la remise, vous recevez le code source, les schémas de base de données, les fichiers du design system et les médias. Il n’y a aucune licence à renouveler et rien ne vous empêche de confier la suite à une autre équipe.',
      },
      {
        question: 'Nous sommes une école ou une commune. Comment se passe la procédure de marché ?',
        answer:
          'En dessous du seuil cantonal de la procédure sur invitation, un mandat peut normalement être attribué sans appel d’offres ouvert — pour les services, cela se situe généralement sous CHF 150’000, mais les seuils varient selon les cantons et sont révisés tous les deux ans : vérifiez le montant en vigueur chez vous. Au-dessus, nous répondons aux publications sur SIMAP et fournissons le dossier habituel. Nos jalons à prix fixe sont structurés pour correspondre à la manière dont les budgets publics sont approuvés.',
      },
      {
        question: 'Où le formulaire de cadrage envoie-t-il ce que nous saisissons ?',
        answer:
          'Le formulaire de cadrage instantané transmet ce que vous saisissez à des services situés hors de Suisse, et notre politique de confidentialité les nomme. Si vous préférez qu’aucune donnée ne quitte la Suisse, écrivez-nous ou appelez-nous : le cadrage se fera sans passer par ces services.',
      },
    ],
  },

  design: {
    metaTitle: 'Abonnement design avec motion design | Vectra',
    metaDescription:
      'Design produit, identité de marque et motion design à prix mensuel fixe. Formules publiées, planification prioritaire, suspension ou résiliation à tout moment.',
    kicker: 'Département 03 · Abonnement design',
    h1: 'Une équipe de design sur abonnement, motion inclus.',
    intro:
      'Design produit, identité de marque et motion design à prix mensuel fixe. Planification prioritaire, et vous pouvez suspendre ou résilier à tout moment.',
    cta: 'Voir les formules',
    disciplines: {
      title: 'Ce que couvre l’abonnement',
      items: [
        {
          title: 'Design UI/UX et design produit',
          detail: 'Interfaces, parcours et prototypes pour des produits web et mobiles.',
        },
        {
          title: 'Identité de marque',
          detail:
            'Systèmes de logo, typographie, couleurs et bibliothèques de composants qui restent cohérents d’un produit à l’autre.',
        },
        {
          title: 'Motion design',
          detail:
            'Animation 2D et 3D dans votre système de marque, avec des formats adaptés au web, aux réseaux sociaux et aux présentations.',
        },
        {
          title: 'Vidéo explicative',
          detail:
            'Script, storyboard et animation qui rendent un produit complexe compréhensible en moins d’une minute.',
        },
      ],
    },
    plans: {
      title: 'Trois formules, des prix publiés',
      intro: 'Engagement annuel : deux mois offerts.',
      featuredLabel: 'Recommandée',
      names: { design: 'Design', build: 'Build', scale: 'Scale' },
      includesTitle: 'Chaque formule comprend',
      includes: [
        'Design UI/UX et design produit',
        'Identité de marque et design systems',
        'Motion design et vidéo explicative',
        'Planification prioritaire',
        'Fichiers sources à chaque livraison',
        'Suspension ou résiliation à tout moment',
      ],
      note: 'Vous hésitez entre deux formules ? Nous le décidons ensemble lors d’un appel de 30 minutes.',
      cta: 'Souscrire un abonnement',
    },
    process: {
      title: 'Comment fonctionne l’abonnement',
      intro: 'Ni devis ni négociation : le prix est celui affiché sur cette page.',
      steps: [
        {
          step: '01',
          title: 'Choisissez une formule',
          detail: 'Mensuelle ou annuelle. Nous confirmons la formule lors d’un court appel, puis nous démarrons.',
        },
        {
          step: '02',
          title: 'Envoyez vos demandes',
          detail:
            'Les demandes de design et de motion entrent dans une seule file et sont planifiées en priorité.',
        },
        {
          step: '03',
          title: 'Validez, puis continuez ou suspendez',
          detail:
            'Chaque livraison est accompagnée de ses fichiers sources. Suspendez ou résiliez dès que le travail est fait.',
        },
      ],
    },
    faqs: [
      {
        question: 'Le motion design est-il vraiment inclus ?',
        answer:
          'Oui. Le motion design et la vidéo explicative font partie de l’abonnement, ce n’est pas une ligne supplémentaire sur la facture.',
      },
      {
        question: 'Combien de temps faut-il pour une vidéo explicative ?',
        answer:
          'Une à trois semaines selon la durée et la présence de 3D. Le script et le storyboard sont validés avant le début de l’animation.',
      },
      {
        question: 'Pouvez-vous travailler sur un produit que vous n’avez pas développé ?',
        answer:
          'Oui. De nombreux clients nous confient un produit existant. Nous demandons d’abord à y avoir accès : nous ne concevons rien et n’écrivons rien sur un logiciel que nous n’avons pas utilisé.',
      },
      {
        question: 'Les fichiers de design et d’animation nous appartiennent-ils ?',
        answer:
          'Oui, y compris les sources des projets. Il n’y a aucune licence à renouveler et rien n’empêche un autre studio de les reprendre.',
      },
      {
        question: 'Peut-on suspendre ou résilier ?',
        answer: 'Oui, à tout moment. Un engagement annuel donne droit à deux mois offerts.',
      },
    ],
  },

  scope: {
    title: 'Parlez-nous du processus à simplifier.',
    intro:
      'Répondez à cinq questions courtes et nous préparons un premier cadrage — modules, jalons, calendrier et fourchette de prix — directement sur cette page, en une minute environ. Sans appel préalable, et sans frais de cadrage.',
    aside: 'Vous préférez en parler ? Vous pouvez réserver un appel depuis la bannière ci-dessous.',
    stepOf: 'Étape {current} sur {total}',
    stepNames: ['Votre besoin', 'Modules', 'Échelle', 'Calendrier', 'Vos coordonnées'],
    next: 'Suivant',
    back: 'Retour',
    submit: 'Rédiger mon cadrage',
    submitting: 'Rédaction…',
    progress: {
      reading: 'Lecture de vos besoins',
      drafting: 'Rédaction des phases et des livrables',
      estimating: 'Estimation du calendrier et de la fourchette',
    },
    q1: { title: 'Quel processus souhaitez-vous simplifier ?', hint: 'Choisissez l’option la plus proche.' },
    q2: { title: 'De quelles parties avez-vous besoin ?', hint: 'Sélectionnez tout ce qui s’applique.' },
    q3: { title: 'Quelle est son échelle ?', hint: 'Des ordres de grandeur suffisent.' },
    q4: { title: 'Pour quand le voulez-vous en production ?', hint: 'Et avec quel budget approximatif ?' },
    q5: { title: 'Où devons-nous l’envoyer ?' },
    fields: {
      users: 'Combien de personnes l’utiliseront environ ?',
      sites: 'Combien de sites ou de lieux ?',
      existing: 'Avec quels systèmes doit-il fonctionner ?',
      existingPlaceholder: 'p. ex. notre logiciel comptable, une base élèves existante, Stripe',
      name: 'Nom',
      email: 'E-mail professionnel',
      company: 'Organisation',
      notes: 'Autre chose à nous signaler ?',
      notesPlaceholder: 'p. ex. nous avons trois sites et les présences sont rapprochées à la main chaque semaine',
    },
    domains: {
      education: 'École ou établissement de formation',
      sports: 'Installation sportive ou de loisirs',
      hr: 'RH, pointage ou paie',
      other: 'Autre chose',
    },
    timelines: {
      urgent: { label: 'Dès que possible', detail: 'Un premier module, 3 à 5 semaines' },
      standard: { label: 'Le trimestre prochain', detail: 'Système complet, 6 à 10 semaines' },
      ongoing: { label: 'Capacité continue', detail: 'Abonnement, de mois en mois' },
    },
    budgets: {
      unsure: 'Pas encore défini',
      small: 'Moins de CHF 15’000',
      medium: 'CHF 15’000 – 60’000',
      large: 'Plus de CHF 60’000',
    },
    result: {
      title: 'Votre projet de cadrage',
      disclaimer:
        'Il s’agit d’une estimation indicative générée à partir de vos réponses, et non d’une offre. Nous confirmons le périmètre et le prix par écrit avant tout démarrage.',
      deliverables: 'Livrables',
      timeline: 'Calendrier estimé',
      weeks: 'semaines',
      range: 'Fourchette indicative',
      assumptions: 'Hypothèses retenues',
      risks: 'Ce qui pourrait modifier l’estimation',
      outOfScope: 'Non inclus',
      emailed:
        'Nous vous en avons envoyé une copie, ainsi qu’à notre équipe. Vous recevrez un cadrage écrit sous un jour ouvré.',
      restart: 'Recommencer',
      book: 'Réserver un appel pour l’affiner',
    },
    errors: {
      generic: 'Une erreur est survenue.',
      notSent: 'Vos informations n’ont pas été envoyées — veuillez réessayer ou nous écrire directement.',
      degraded:
        'Nous avons bien reçu votre demande et notre équipe en dispose. La rédaction instantanée est momentanément indisponible ; nous vous enverrons donc votre cadrage par e-mail.',
    },
  },


  cta: {
    title:
      'Vous ne savez pas quel département vous concerne ? Prenez 30 minutes avec celles et ceux qui font le travail, pas avec un commercial.',
    button: 'Réserver un appel de 30 min',
  },

  footer: {
    title: 'Logiciel, développement et design, dans un seul studio.',
    group: 'Vectra fait partie de {group}.',
    country: 'Suisse',
    legal: { terms: 'Conditions', privacy: 'Confidentialité', impressum: 'Mentions légales' },
    rights: origine.rights,
    team: 'Équipe distribuée, aux horaires suisses. Données clients hébergées en Suisse.',
    social: 'Réseaux sociaux',
  },
};

export default fr;
